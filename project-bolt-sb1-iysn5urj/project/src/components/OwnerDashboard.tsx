import React, { useState } from 'react';
import { 
  Users, DollarSign, TrendingUp, Activity, 
  Shield, Settings, Bell, BarChart3,
  UserCheck, CreditCard, Globe, Zap
} from 'lucide-react';

interface OwnerDashboardProps {
  ownerEmail: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ ownerEmail }) => {
  const [activeSubscriptions] = useState(247);
  const [monthlyRevenue] = useState(24700); // $100 per subscription
  const [totalUsers] = useState(1456);
  const [verifiedUsers] = useState(1398);

  const revenueData = [
    { month: 'Jan', revenue: 18500, users: 185 },
    { month: 'Feb', revenue: 21200, users: 212 },
    { month: 'Mar', revenue: 23800, users: 238 },
    { month: 'Apr', revenue: 24700, users: 247 }
  ];

  const userAnalytics = {
    totalLogins: 8934,
    activeToday: 156,
    newRegistrations: 23,
    idVerificationPending: 58
  };

  return (
    <div className="space-y-6">
      {/* Owner Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>
            <p className="text-navy-200 mt-1">Welcome back, {ownerEmail}</p>
          </div>
          <div className="bg-navy-800 px-4 py-2 rounded-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Premium Account</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${monthlyRevenue.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Monthly Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">+8.7%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{activeSubscriptions}</h3>
          <p className="text-sm text-gray-600">Active Subscriptions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">+15.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm text-orange-600 font-medium">96%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{verifiedUsers.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">ID Verified Users</p>
        </div>
      </div>

      {/* Revenue Chart and User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 25000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">${data.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{data.users} subs</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Analytics</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Active Today</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{userAnalytics.activeToday}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">New Registrations</span>
              </div>
              <span className="text-lg font-bold text-green-600">{userAnalytics.newRegistrations}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Bell className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">ID Verification Pending</span>
              </div>
              <span className="text-lg font-bold text-yellow-600">{userAnalytics.idVerificationPending}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Total Logins</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{userAnalytics.totalLogins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status and Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm font-medium">API Services</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm font-medium">Security Systems</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Secure</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Optimal</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Settings className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3 mt-0.5">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New employer subscription</p>
                <p className="text-xs text-gray-500">Port of Durban - Premium Plan - 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full mr-3 mt-0.5">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">ID verification completed</p>
                <p className="text-xs text-gray-500">15 users verified in the last hour</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mr-3 mt-0.5">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payment processed</p>
                <p className="text-xs text-gray-500">$2,300 in subscription renewals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;