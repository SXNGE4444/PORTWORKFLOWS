import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function OperationsTimeline() {
  const recentOperations = [
    {
      id: "1",
      vessel: "MV Atlantic Express",
      berth: "Berth 12",
      operation: "Cargo discharge completed",
      details: "1,247 TEU",
      time: "14:30",
      status: "completed"
    },
    {
      id: "2",
      vessel: "MSC Navigator",
      berth: "Berth 8",
      operation: "Loading operations in progress",
      details: "Container vessel",
      time: "13:45",
      status: "in_progress"
    },
    {
      id: "3",
      vessel: "CMA CGM Explorer",
      berth: "Anchorage",
      operation: "Awaiting berth allocation",
      details: "ETA: 16:00",
      time: "12:20",
      status: "waiting"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "in_progress": return "bg-accent";
      case "waiting": return "bg-blue-500";
      default: return "bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Operations</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="chart-container rounded-lg p-4 mb-4">
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="text-sm">Operational efficiency chart</p>
              <p className="text-xs">Daily operations timeline with vessel movements</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {recentOperations.map((operation) => (
            <div 
              key={operation.id} 
              className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
              data-testid={`operation-${operation.id}`}
            >
              <div className={`w-2 h-2 ${getStatusColor(operation.status)} rounded-full`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {operation.vessel} - {operation.berth}
                </p>
                <p className="text-xs text-muted-foreground">
                  {operation.operation} - {operation.details}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{operation.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
