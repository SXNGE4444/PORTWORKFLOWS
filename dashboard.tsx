import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import KpiCards from "@/components/dashboard/kpi-cards";
import OperationsTimeline from "@/components/dashboard/operations-timeline";
import TaskPerformance from "@/components/dashboard/task-performance";
import ActiveTasks from "@/components/dashboard/active-tasks";
import IntegrationStatus from "@/components/dashboard/integration-status";
import SubscriptionOverview from "@/components/dashboard/subscription-overview";
import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

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

  const { data: dashboardStats, isLoading: statsLoading } = useQuery<{
    totalVessels: number;
    vesselsInPort: number;
    containersInYard: number;
    pendingTasks: number;
    gateTransactionsToday: number;
    yardOccupancy: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const getUserInitials = (user: any) => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || "U";
  };

  const getUserDisplayName = (user: any) => {
    if (!user) return "User";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "User";
  };

  const getRoleDisplay = (user: any) => {
    if (!user) return "General Labour (Level 1)";
    const role = user.role?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "General Labour";
    return `${role} (Level ${user.roleLevel || 1})`;
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
              <span className="text-foreground">Dashboard</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            {/* User menu */}
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-foreground">
                  {getUserInitials(user)}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <KpiCards stats={dashboardStats} isLoading={statsLoading} />
        
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OperationsTimeline />
          <TaskPerformance />
        </div>
        
        {/* Active Tasks and Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveTasks />
          </div>
          <IntegrationStatus />
        </div>
        
        {/* Subscription Management */}
        <SubscriptionOverview />
      </div>
    </div>
  );
}
