import React from 'react';
import { 
  Ship, Users, Package, BarChart3, Shield, Clock,
  TrendingUp, TrendingDown, Activity, AlertCircle
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
  // Mock data based on user role
  const getDashboardData = (role: string) => {
    switch (role) {
      case 'executive':
        return {
          title: 'Executive Dashboard',
          stats: [
            { label: 'Total Revenue', value: 'R 145.2M', change: '+12.3%', trend: 'up' },
            { label: 'Vessel Operations', value: '1,247', change: '+5.7%', trend: 'up' },
            { label: 'Container Throughput', value: '89,456 TEU', change: '+8.1%', trend: 'up' },
            { label: 'Operational Efficiency', value: '94.2%', change: '+2.1%', trend: 'up' }
          ]
        };
      case 'management':
        return {
          title: 'Management Dashboard',
          stats: [
            { label: 'Active Personnel', value: '1,456', change: '+3.2%', trend: 'up' },
            { label: 'Terminal Utilization', value: '87.3%', change: '+4.5%', trend: 'up' },
            { label: 'Safety Incidents', value: '2', change: '-50%', trend: 'down' },
            { label: 'Equipment Uptime', value: '96.8%', change: '+1.2%', trend: 'up' }
          ]
        };
      case 'marine':
        return {
          title: 'Marine Operations Dashboard',
          stats: [
            { label: 'Vessels in Port', value: '23', change: '+2', trend: 'up' },
            { label: 'Pilotage Operations', value: '47', change: '+8', trend: 'up' },
            { label: 'Berth Occupancy', value: '78.5%', change: '+5.3%', trend: 'up' },
            { label: 'Average Turnaround', value: '18.4hrs', change: '-2.1hrs', trend: 'down' }
          ]
        };
      default:
        return {
          title: 'Operations Dashboard',
          stats: [
            { label: 'Active Tasks', value: '127', change: '+15', trend: 'up' },
            { label: 'Equipment Status', value: '98.2%', change: '+0.5%', trend: 'up' },
            { label: 'Team Members', value: '89', change: '+2', trend: 'up' },
            { label: 'Shift Progress', value: '67%', change: '+12%', trend: 'up' }
          ]
        };
    }
  };

  const dashboardData = getDashboardData(userRole);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{dashboardData.title}</h2>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 p-2 rounded-lg">
                  {index === 0 && <BarChart3 className="h-6 w-6 text-navy-600" />}
                  {index === 1 && <Ship className="h-6 w-6 text-navy-600" />}
                  {index === 2 && <Package className="h-6 w-6 text-navy-600" />}
                  {index === 3 && <Activity className="h-6 w-6 text-navy-600" />}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity / Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white rounded-lg">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Ship className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Vessel MSC Aurora completed loading</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Shift change completed - Evening crew on duty</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white rounded-lg">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Container yard reorganization initiated</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
              <AlertCircle className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="bg-yellow-100 p-2 rounded-full mr-3 mt-0.5">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">Weather Alert: Strong winds expected</p>
                  <p className="text-xs text-yellow-600">Crane operations may be affected after 14:00</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-0.5">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Security Update: All systems operational</p>
                  <p className="text-xs text-green-600">No security incidents reported in last 24h</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-0.5">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Performance Target Achieved</p>
                  <p className="text-xs text-blue-600">Container throughput exceeded monthly target</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;