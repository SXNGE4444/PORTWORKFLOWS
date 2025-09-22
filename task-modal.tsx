import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, User, Calendar, CheckCircle, Save } from "lucide-react";
import type { Task } from "@shared/schema";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (taskId: string, data: Partial<Task>) => void;
  isLoading: boolean;
}

export default function TaskModal({ task, onClose, onUpdate, isLoading }: TaskModalProps) {
  const [checklistItems, setChecklistItems] = useState([
    { id: "1", text: "Verify crane operational status", description: "Check crane 7 and 8 for mechanical issues", priority: "Critical", completed: true },
    { id: "2", text: "Inspect berth lighting systems", description: "All navigation and work lights operational", priority: "Critical", completed: true },
    { id: "3", text: "Check fire safety equipment", description: "Extinguishers, hoses, and alarm systems", priority: "Critical", completed: false },
    { id: "4", text: "Verify emergency protocols", description: "Emergency contacts and evacuation procedures", priority: "High", completed: false },
    { id: "5", text: "Document inspection results", description: "Upload photos and complete report", priority: "Medium", completed: false },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "critical": return "bg-destructive/10 text-destructive";
      case "high": return "bg-accent/10 text-accent";
      case "medium": return "bg-blue-100 text-blue-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleChecklistToggle = (itemId: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSaveProgress = () => {
    const completedCount = checklistItems.filter(item => item.completed).length;
    const progress = Math.round((completedCount / checklistItems.length) * 100);
    
    onUpdate(task.id, {
      status: completedCount === checklistItems.length ? "completed" : "in_progress",
      completedAt: completedCount === checklistItems.length ? new Date() : null
    });
  };

  const handleCompleteTask = () => {
    // Mark all items as completed
    setChecklistItems(prev => prev.map(item => ({ ...item, completed: true })));
    
    onUpdate(task.id, {
      status: "completed",
      completedAt: new Date()
    });
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{task.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {task.roleRequired} - {(task.priority || "medium").charAt(0).toUpperCase() + (task.priority || "medium").slice(1)} Priority
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            
            {/* Task Details */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Task Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Assigned to
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {task.roleRequired || "Unassigned"}
                    </span>
                  </div>
                  
                  {task.dueDate && (
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Due Date
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(task.dueDate).toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  {task.estimatedDuration && (
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Estimated Time
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {task.estimatedDuration} minutes
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {completedCount} of {totalCount} items complete
                    </span>
                  </div>
                </div>
              </div>
              
              {/* SOP Reference */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Standard Operating Procedure</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">SOP-SAF-001: Pre-Arrival Safety Inspection</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {task.description || "Comprehensive safety inspection protocol for vessel arrival preparation including equipment checks, hazard identification, and personnel safety verification."}
                  </p>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-medium p-0">
                    View Full SOP Document
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Checklist */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Safety Checklist</h3>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start gap-3 p-3 border border-border rounded-lg"
                      data-testid={`checklist-item-${item.id}`}
                    >
                      <Checkbox 
                        checked={item.completed}
                        onCheckedChange={() => handleChecklistToggle(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {item.text}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleSaveProgress}
                  disabled={isLoading}
                  className="flex-1"
                  data-testid="button-save-progress"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Progress
                </Button>
                <Button 
                  onClick={handleCompleteTask}
                  disabled={isLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  data-testid="button-complete-task"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
