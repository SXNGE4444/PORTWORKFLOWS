import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Package, Cpu, Truck, Database, CheckCircle, AlertCircle, Clock } from "lucide-react";
import type { Integration } from "@shared/schema";

export default function IntegrationStatus() {
  const { data: integrations = [], isLoading } = useQuery<Integration[]>({
    queryKey: ["/api/integrations"],
  });

  // Sample integration data if none exists
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-emerald-100 text-emerald-700";
      case "syncing": return "bg-amber-100 text-amber-700";
      case "disconnected": case "error": return "bg-red-100 text-red-700";
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
      case "warehouse": case "wms": return <Package className="w-5 h-5" />;
      case "automation": case "scada": return <Cpu className="w-5 h-5" />;
      case "dispatch": case "logistics": return <Truck className="w-5 h-5" />;
      case "database": case "legacy": return <Database className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getIntegrationColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-emerald-100 text-emerald-600";
      case "syncing": return "bg-amber-100 text-amber-600";
      case "disconnected": case "error": return "bg-red-100 text-red-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Integrations</CardTitle>
            <div className="w-6 h-6 bg-muted rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-muted rounded mb-1 w-24"></div>
                    <div className="h-3 bg-muted rounded w-20"></div>
                  </div>
                </div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>System Integrations</CardTitle>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          {displayIntegrations.slice(0, 4).map((integration: Integration) => (
            <div 
              key={integration.id} 
              className="flex items-center justify-between p-3 border border-border rounded-lg"
              data-testid={`integration-status-${integration.id}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIntegrationColor(integration.status || "disconnected")}`}>
                  {getIntegrationIcon(integration.type || "warehouse")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{integration.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {(integration.type || "warehouse").replace("_", " ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`flex items-center gap-1 ${getStatusColor(integration.status || "disconnected")}`}>
                  {getStatusIcon(integration.status || "disconnected")}
                  <span className="capitalize">{integration.status || "disconnected"}</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {/* Integration actions */}
        <div className="space-y-3">
          <Button className="w-full bg-primary text-primary-foreground" data-testid="button-configure-integrations">
            Configure Integrations
          </Button>
          <Button variant="outline" className="w-full">
            View Integration Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
