import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Users, Shield, Mail, Calendar, ChevronRight } from "lucide-react";
import type { User } from "@shared/schema";

export default function UserManagement() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: isAuthenticated,
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ id, role, roleLevel }: { id: string; role: string; roleLevel: number }) => {
      return await apiRequest("PATCH", `/api/users/${id}/role`, { role, roleLevel });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User role updated successfully",
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
        description: "Failed to update user role",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "harbour_master": return "bg-purple-100 text-purple-700";
      case "safety_manager": return "bg-red-100 text-red-700";
      case "cargo_clerk": return "bg-blue-100 text-blue-700";
      case "equipment_operator": return "bg-green-100 text-green-700";
      case "security_officer": return "bg-orange-100 text-orange-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUserInitials = (user: User) => {
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";
  };

  const getUserDisplayName = (user: User) => {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "User";
  };

  const formatRole = (role: string) => {
    return role?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "General Labour";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>PortOps</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">User Management</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search-users"
                  />
                </div>
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[200px]" data-testid="select-role-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="harbour_master">Harbour Master</SelectItem>
                  <SelectItem value="safety_manager">Safety Manager</SelectItem>
                  <SelectItem value="cargo_clerk">Cargo Clerk</SelectItem>
                  <SelectItem value="equipment_operator">Equipment Operator</SelectItem>
                  <SelectItem value="security_officer">Security Officer</SelectItem>
                  <SelectItem value="general_labour">General Labour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        {usersLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2 w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-muted rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {users.length === 0 
                  ? "No users have been registered yet."
                  : "No users match your current filters. Try adjusting your search criteria."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user: User) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow" data-testid={`card-user-${user.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.profileImageUrl || ""} alt={getUserDisplayName(user)} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{getUserDisplayName(user)}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </div>
                          {user.createdAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge className={getRoleColor(user.role || "general_labour")}>
                          {formatRole(user.role || "general_labour")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Level {user.roleLevel || 1}
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={updateUserRoleMutation.isPending}
                        data-testid={`button-edit-role-${user.id}`}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Edit Role
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
