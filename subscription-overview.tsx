import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, UserCheck, CheckCircle } from "lucide-react";

export default function SubscriptionOverview() {
  const subscriptionData = {
    plan: "Premium Plan",
    pricePerEmployer: 100,
    activeEmployers: 47,
    totalUsers: 1247,
    monthlyRevenue: 4700,
    status: "active"
  };

  const recentActivity = [
    {
      id: "1",
      type: "new_employer",
      title: "New Employer: Maritime Logistics Ltd",
      description: "45 users added • Premium subscription activated",
      timestamp: "2 hours ago",
      icon: Plus,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Processed: Port Authority SA",
      description: "$100.00 • Next billing: Feb 15, 2024",
      timestamp: "1 day ago",
      icon: CreditCard,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "3",
      type: "verification",
      title: "ID Verification Completed",
      description: "23 new users verified across 3 employers",
      timestamp: "2 days ago",
      icon: UserCheck,
      color: "bg-accent/20 text-accent"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Subscription Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              {subscriptionData.plan} - ${subscriptionData.pricePerEmployer}/month per employer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Active
            </Badge>
            <Button className="bg-primary text-primary-foreground" data-testid="button-manage-billing-dashboard">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">{subscriptionData.activeEmployers}</div>
            <div className="text-sm text-muted-foreground">Active Employers</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">{subscriptionData.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">${subscriptionData.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Monthly Revenue</div>
          </div>
        </div>
        
        {/* Recent subscription activity */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                  data-testid={`subscription-activity-${activity.id}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
