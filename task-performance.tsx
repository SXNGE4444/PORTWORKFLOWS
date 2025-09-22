import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock } from "lucide-react";

export default function TaskPerformance() {
  const performanceMetrics = [
    {
      id: "safety",
      name: "Safety Inspections",
      percentage: 98.5,
      color: "bg-emerald-500"
    },
    {
      id: "cargo",
      name: "Cargo Operations",
      percentage: 94.2,
      color: "bg-blue-500"
    },
    {
      id: "maintenance",
      name: "Equipment Maintenance",
      percentage: 91.8,
      color: "bg-accent"
    },
    {
      id: "documentation",
      name: "Documentation",
      percentage: 96.7,
      color: "bg-purple-500"
    }
  ];

  const alerts = [
    {
      id: "1",
      type: "critical",
      title: "Critical: Crane 7 Maintenance Overdue",
      description: "Scheduled maintenance was due 2 days ago",
      icon: AlertTriangle,
      color: "bg-destructive/10 border-destructive/20 text-destructive"
    },
    {
      id: "2", 
      type: "pending",
      title: "Pending: Safety Drill - Terminal B",
      description: "Scheduled for tomorrow 09:00",
      icon: Clock,
      color: "bg-accent/10 border-accent/20 text-accent"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Task Performance</CardTitle>
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Performance metrics */}
        <div className="space-y-4 mb-6">
          {performanceMetrics.map((metric) => (
            <div key={metric.id} data-testid={`performance-metric-${metric.id}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{metric.name}</span>
                <span className="text-sm font-semibold" style={{ color: `hsl(var(--chart-${performanceMetrics.indexOf(metric) + 1}))` }}>
                  {metric.percentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`${metric.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Task alerts */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <div 
                key={alert.id} 
                className={`flex items-center gap-3 p-3 border rounded-lg ${alert.color}`}
                data-testid={`alert-${alert.id}`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs opacity-80">{alert.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
