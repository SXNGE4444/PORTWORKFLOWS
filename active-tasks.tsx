import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus } from "lucide-react";
import type { Task } from "@shared/schema";

export default function ActiveTasks() {
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const activeTasks = tasks.filter((task: Task) => 
    task.status === "pending" || task.status === "in_progress"
  ).slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "critical": return "bg-destructive/10 text-destructive";
      case "high": return "bg-accent/10 text-accent";
      case "medium": return "bg-blue-100 text-blue-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-emerald-100 text-emerald-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUserInitials = (role: string) => {
    const words = role?.split("_") || ["U"];
    return words.map(word => word.charAt(0).toUpperCase()).join("").substring(0, 2);
  };

  const formatRole = (role: string) => {
    return role?.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Unassigned";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Tasks</CardTitle>
            <div className="w-24 h-9 bg-muted rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-muted rounded mb-4 w-1/2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/5"></div>
                </div>
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
          <CardTitle>Active Tasks</CardTitle>
          <Button className="bg-primary text-primary-foreground" data-testid="button-new-task-dashboard">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No active tasks at the moment</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.map((task: Task) => (
              <div 
                key={task.id} 
                className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                data-testid={`active-task-${task.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority || "medium")}>
                        {task.priority || "medium"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description || "No description provided"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-foreground">
                          {getUserInitials(task.roleRequired || "U")}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatRole(task.roleRequired || "Unassigned")}
                      </span>
                    </div>
                    {task.dueDate && (
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status || "pending")}>
                      {task.status?.replace("_", " ") || "pending"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
