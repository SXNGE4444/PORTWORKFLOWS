import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Users, DollarSign, Plus, Calendar, CheckCircle, AlertCircle, UserCheck, ChevronRight } from "lucide-react";

export default function Subscriptions() {
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

  // Sample subscription data
  const subscriptionData = {
    plan: "Premium Plan",
    pricePerEmployer: 100,
    activeEmployers: 47,
    totalUsers: 1247,
    monthlyRevenue: 4700,
    status: "active",
    nextBillingDate: "2024-02-15",
    billingHistory: [
      {
        id: "1",
        date: "2024-01-15",
        amount: 4700,
        employers: 47,
        status: "paid"
      },
      {
        id: "2",
        date: "2023-12-15",
        amount: 4500,
        employers: 45,
        status: "paid"
      },
      {
        id: "3",
        date: "2023-11-15",
        amount: 4300,
        employers: 43,
        status: "paid"
      }
    ],
    recentActivity: [
      {
        id: "1",
        type: "new_employer",
        title: "New Employer: Maritime Logistics Ltd",
        description: "45 users added • Premium subscription activated",
        timestamp: "2 hours ago",
        icon: Plus
      },
      {
        id: "2",
        type: "payment",
        title: "Payment Processed: Port Authority SA",
        description: "$100.00 • Next billing: Feb 15, 2024",
        timestamp: "1 day ago",
        icon: CreditCard
      },
      {
        id: "3",
        type: "verification",
        title: "ID Verification Completed",
        description: "23 new users verified across 3 employers",
        timestamp: "2 days ago",
        icon: UserCheck
      }
    ]
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
              <span className="text-foreground">Subscriptions</span>
            </nav>
            <h1 className="text-2xl font-bold text-foreground">Subscription Management</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1 font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
            </Badge>
            <Button className="bg-primary text-primary-foreground" data-testid="button-manage-billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Subscription Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              {subscriptionData.plan} - ${subscriptionData.pricePerEmployer}/month per employer
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {subscriptionData.activeEmployers}
                </div>
                <div className="text-sm text-muted-foreground">Active Employers</div>
              </div>
              
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {subscriptionData.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
              
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  ${subscriptionData.monthlyRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <span className="text-sm font-medium text-foreground">{subscriptionData.plan}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Price per Employer</span>
                <span className="text-sm font-medium text-foreground">
                  ${subscriptionData.pricePerEmployer}/month
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Active Employers</span>
                <span className="text-sm font-medium text-foreground">
                  {subscriptionData.activeEmployers}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Next Billing Date</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(subscriptionData.nextBillingDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Monthly Total</span>
                <span className="text-lg font-bold text-foreground">
                  ${subscriptionData.monthlyRevenue.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subscriptionData.billingHistory.map((billing) => (
                  <div 
                    key={billing.id} 
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    data-testid={`billing-history-${billing.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          ${billing.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {billing.employers} employers • {new Date(billing.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" data-testid="button-view-all-history">
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionData.recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                const getActivityColor = (type: string) => {
                  switch (type) {
                    case "new_employer": return "bg-emerald-100 text-emerald-600";
                    case "payment": return "bg-blue-100 text-blue-600";
                    case "verification": return "bg-accent/20 text-accent";
                    default: return "bg-muted text-muted-foreground";
                  }
                };

                return (
                  <div 
                    key={activity.id} 
                    className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
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
          </CardContent>
        </Card>

        {/* Subscription Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Update Payment Method
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add New Employer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Change Billing Cycle
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                Contact Billing Support
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="w-4 h-4 mr-2" />
                View Pricing Details
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Billing FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
