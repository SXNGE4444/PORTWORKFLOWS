import { Card, CardContent } from "@/components/ui/card";
import { Users, Ship, CheckCircle, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardsProps {
  stats?: {
    totalVessels: number;
    vesselsInPort: number;
    containersInYard: number;
    pendingTasks: number;
    gateTransactionsToday: number;
    yardOccupancy: number;
  };
  isLoading: boolean;
}

export default function KpiCards({ stats, isLoading }: KpiCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="w-16 h-6 bg-muted rounded-full"></div>
              </div>
              <div className="h-8 bg-muted rounded mb-1 w-20"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpiData = [
    {
      id: "users",
      title: "Active Users",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      iconColor: "text-primary",
      iconBg: "bg-primary/10"
    },
    {
      id: "vessels",
      title: "Vessels in Port",
      value: stats?.vesselsInPort.toString() || "0",
      change: "+8%",
      trend: "up",
      icon: Ship,
      iconColor: "text-accent",
      iconBg: "bg-accent/10"
    },
    {
      id: "tasks",
      title: "Tasks Completed",
      value: stats?.pendingTasks ? (500 - stats.pendingTasks).toString() : "456",
      change: "98.5%",
      trend: "up",
      icon: CheckCircle,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100"
    },
    {
      id: "revenue",
      title: "Monthly Revenue",
      value: "$124.7K",
      change: "+24%",
      trend: "up",
      icon: DollarSign,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => {
        const IconComponent = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = kpi.trend === "up" ? "text-emerald-600" : "text-red-600";
        const trendBg = kpi.trend === "up" ? "bg-emerald-100" : "bg-red-100";
        
        return (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow" data-testid={`kpi-card-${kpi.id}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.iconBg} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${trendBg} ${trendColor}`}>
                  <TrendIcon className="w-3 h-3" />
                  {kpi.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1" data-testid={`kpi-value-${kpi.id}`}>
                  {kpi.value}
                </h3>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
