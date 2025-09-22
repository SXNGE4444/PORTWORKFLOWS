import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug, Settings, Database, Package, Cpu, Truck, AlertCircle, CheckCircle, Clock, ChevronRight } from "lucide-react";
import type { Integration } from "@shared/schema";

export default function IntegrationHub() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: integrations = [], isLoading: integrationsLoading } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
    enabled: isAuthenticated,
  });

  const updateIntegrationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Integration> }) => {
      return await apiRequest("PATCH", `/api/integrations/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      toast({
        title: "Success",
        description: "Integration updated successfully",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update integration",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-emerald-100 text-emerald-700";
      case "syncing": return "bg-amber-100 text-amber-700";
      case "disconnected": return "bg-red-100 text-red-700";
      case "error": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return <CheckCircle className="w-4 h-4" />;
      case "syncing": return <Clock className="w-4 h-4" />;
      case "disconnected": case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "warehouse": case "wms": return <Package className="w-6 h-6" />;
      case "automation": case "scada": return <Cpu className="w-6 h-6" />;
      case "dispatch": case "logistics": return <Truck className="w-6 h-6" />;
      case "database": case "legacy": return <Database className="w-6 h-6" />;
      default: return <Plug className="w-6 h-6" />;
    }
  };

  const handleToggleConnection = (integration: Integration) => {
    const newStatus = integration.status === "connected" ? "disconnected" : "connected";
    updateIntegrationMutation.mutate({
      id: integration.id,
      data: { status: newStatus }
    });
  };

  // Sample integration data for demo if none exists
  const sampleIntegrations: Integration[] = [
    {
      id: "1",
      name: "Emydex WMS",
      type: "warehouse",
      status: "connected",
      lastSync: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      config: {}
    },
    {
      id: "2", 
      name: "SCADA500",
      type: "automation",
      status: "connected",
      lastSync: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      config: {}
    },
    {
      id: "3",
      name: "Dispatch System",
      type: "logistics", 
      status: "syncing",
      lastSync: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      config: {}
    },
    {
      id: "4",
      name: "Legacy System",
      type: "database",
      status: "disconnected",
      lastSync: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      config: {}
    }
  ];

  const displayIntegrations = integrations.length ? integrations : sampleIntegrations;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>PortOps</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Integration Hub</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">Integration Hub</h1>
          </div>
          
          <Button className="bg-primary text-primary-foreground" data-testid="button-add-integration">
            <Plug className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {displayIntegrations.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Integrations</p>
                </div>
                <Plug className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-600">
                    {displayIntegrations.filter(i => i.status === "connected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-600">
                    {displayIntegrations.filter(i => i.status === "syncing").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Syncing</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-destructive">
                    {displayIntegrations.filter(i => i.status === "disconnected" || i.status === "error").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Issues</p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations List */}
        <Card>
          <CardHeader>
            <CardTitle>System Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            {integrationsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-muted rounded mb-2 w-32"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-muted rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : displayIntegrations.length === 0 ? (
              <div className="text-center py-12">
                <Plug className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No integrations configured</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your warehouse management systems and other tools to streamline operations.
                </p>
                <Button>
                  <Plug className="w-4 h-4 mr-2" />
                  Add Your First Integration
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayIntegrations.map((integration: Integration) => (
                  <div 
                    key={integration.id} 
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    data-testid={`card-integration-${integration.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        integration.status === "connected" ? "bg-emerald-100 text-emerald-600" :
                        integration.status === "syncing" ? "bg-amber-100 text-amber-600" :
                        "bg-red-100 text-red-600"
                      }`}>
                        {getIntegrationIcon(integration.type)}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-foreground">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {integration.type.replace("_", " ")}
                          {integration.lastSync && (
                            <span className="ml-2">
                              • Last sync: {new Date(integration.lastSync).toLocaleString()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={`flex items-center gap-2 ${getStatusColor(integration.status || "disconnected")}`}>
                        {getStatusIcon(integration.status || "disconnected")}
                        {(integration.status || "disconnected").charAt(0).toUpperCase() + (integration.status || "disconnected").slice(1)}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleConnection(integration)}
                          disabled={updateIntegrationMutation.isPending}
                          data-testid={`button-toggle-${integration.id}`}
                        >
                          {(integration.status || "disconnected") === "connected" ? "Disconnect" : "Connect"}
                        </Button>
                        
                        <Button variant="outline" size="sm" data-testid={`button-configure-${integration.id}`}>
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Integration Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure Global Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Database className="w-4 h-4 mr-2" />
                View Integration Logs
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                Troubleshoot Issues
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Response Time</span>
                  <span className="text-sm font-medium text-emerald-600">~150ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Sync Frequency</span>
                  <span className="text-sm font-medium text-foreground">Every 5 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last System Check</span>
                  <span className="text-sm font-medium text-foreground">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Health</span>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Excellent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
