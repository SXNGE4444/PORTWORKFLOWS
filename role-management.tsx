import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Lock, Eye, Edit, Trash2, Plus, ChevronRight } from "lucide-react";

export default function RoleManagement() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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

  if (isLoading || !isAuthenticated) {
    return null;
  }

  // Role hierarchy and permissions data
  const roles = [
    {
      id: "harbour_master",
      name: "Harbour Master",
      level: 8,
      userCount: 3,
      description: "Full authority over port operations and safety protocols",
      permissions: [
        "Vessel traffic management",
        "Emergency response coordination", 
        "Port security oversight",
        "Regulatory compliance",
        "Staff management",
        "System administration"
      ],
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "safety_manager",
      name: "Safety Manager", 
      level: 6,
      userCount: 8,
      description: "Responsible for safety inspections and compliance",
      permissions: [
        "Safety inspections",
        "Incident reporting",
        "Safety training coordination",
        "Compliance monitoring",
        "Emergency procedures"
      ],
      color: "bg-red-100 text-red-700"
    },
    {
      id: "cargo_clerk",
      name: "Cargo Clerk",
      level: 4,
      userCount: 23,
      description: "Manages cargo documentation and tracking",
      permissions: [
        "Cargo documentation",
        "Container tracking",
        "Manifest management",
        "Customer communication",
        "Billing coordination"
      ],
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "equipment_operator",
      name: "Equipment Operator",
      level: 3,
      userCount: 45,
      description: "Operates port equipment and machinery",
      permissions: [
        "Equipment operation",
        "Maintenance logging",
        "Safety checks",
        "Load planning",
        "Equipment status updates"
      ],
      color: "bg-green-100 text-green-700"
    },
    {
      id: "security_officer",
      name: "Security Officer",
      level: 4,
      userCount: 12,
      description: "Handles port security and access control",
      permissions: [
        "Access control",
        "Security monitoring",
        "Incident response",
        "Vehicle inspections",
        "Security reporting"
      ],
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: "general_labour",
      name: "General Labour",
      level: 1,
      userCount: 156,
      description: "Basic operational tasks and support functions",
      permissions: [
        "Basic task execution",
        "Equipment assistance",
        "Safety compliance",
        "Time tracking",
        "Status reporting"
      ],
      color: "bg-muted text-muted-foreground"
    }
  ];

  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>PortOps</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Role Management</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">Role Management</h1>
          </div>
          
          <Button className="bg-primary text-primary-foreground" data-testid="button-create-role">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
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
                  <p className="text-2xl font-bold text-foreground">{roles.length}</p>
                  <p className="text-sm text-muted-foreground">Total Roles</p>
                </div>
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Max Level</p>
                </div>
                <Lock className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Basic Users</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Hierarchy */}
        <Card>
          <CardHeader>
            <CardTitle>Role Hierarchy</CardTitle>
            <p className="text-sm text-muted-foreground">
              Roles are organized by authority level, with higher levels having broader access
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.sort((a, b) => b.level - a.level).map((role) => (
                <Card 
                  key={role.id} 
                  className="hover:shadow-md transition-shadow"
                  data-testid={`card-role-${role.id}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={role.color}>
                              {role.name}
                            </Badge>
                            <Badge variant="outline">
                              Level {role.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {role.userCount} users
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          {role.description}
                        </p>
                        
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Permissions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`button-view-${role.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`button-edit-${role.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        {role.userCount === 0 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-${role.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Detailed Permission Matrix
              </h3>
              <p className="text-muted-foreground mb-4">
                View and manage detailed permissions for each role and user level
              </p>
              <Button>
                <Eye className="w-4 h-4 mr-2" />
                View Permission Matrix
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Custom Role
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Bulk Role Assignment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Export Role Configuration
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Role inheritance</span>
                <Badge className="bg-emerald-100 text-emerald-700">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Permission validation</span>
                <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Audit logging</span>
                <Badge className="bg-emerald-100 text-emerald-700">Enabled</Badge>
              </div>
              <Button className="w-full" variant="outline">
                <Lock className="w-4 h-4 mr-2" />
                Security Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
