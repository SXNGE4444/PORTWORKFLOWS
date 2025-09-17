import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, Users, CheckCircle, 
  XCircle, AlertTriangle, Calendar, Building
} from 'lucide-react';

interface Subscription {
  id: string;
  companyName: string;
  contactEmail: string;
  plan: 'premium';
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: Date;
  nextBilling: Date;
  userCount: number;
  monthlyFee: number;
  totalPaid: number;
}

const SubscriptionManagement: React.FC = () => {
  const [subscriptions] = useState<Subscription[]>([
    {
      id: 'sub_001',
      companyName: 'Port of Durban',
      contactEmail: 'admin@durbanport.co.za',
      plan: 'premium',
      status: 'active',
      startDate: new Date('2024-01-01'),
      nextBilling: new Date('2024-02-01'),
      userCount: 156,
      monthlyFee: 100,
      totalPaid: 400
    },
    {
      id: 'sub_002',
      companyName: 'Cape Town Container Terminal',
      contactEmail: 'it@ctct.co.za',
      plan: 'premium',
      status: 'active',
      startDate: new Date('2023-11-15'),
      nextBilling: new Date('2024-02-15'),
      userCount: 89,
      monthlyFee: 100,
      totalPaid: 300
    },
    {
      id: 'sub_003',
      companyName: 'Richards Bay Port',
      contactEmail: 'systems@rbport.co.za',
      plan: 'premium',
      status: 'pending',
      startDate: new Date('2024-01-20'),
      nextBilling: new Date('2024-02-20'),
      userCount: 45,
      monthlyFee: 100,
      totalPaid: 0
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'expired': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-gray-500" />;
      default: return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.totalPaid, 0);
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const totalUsers = subscriptions.reduce((sum, sub) => sum + sub.userCount, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Subscription Management</h2>
            <p className="text-sm text-gray-600 mt-1">Premium employer subscriptions at $100/month</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Owner: lsmptylastsaymatters@gmail.com</p>
            <p className="text-xs text-gray-500">Premium Service Provider</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Active Subscriptions</p>
                <p className="text-2xl font-bold text-blue-900">{activeSubscriptions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Total Users</p>
                <p className="text-2xl font-bold text-purple-900">{totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Monthly Rate</p>
                <p className="text-2xl font-bold text-orange-900">$100</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Subscription List */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Users</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Next Billing</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Paid</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(subscription => (
                <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="bg-navy-100 p-2 rounded-full mr-3">
                        <Building className="h-4 w-4 text-navy-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{subscription.companyName}</div>
                        <div className="text-sm text-gray-500">{subscription.contactEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(subscription.status)}
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                        {subscription.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-navy-100 text-navy-800 px-2 py-1 rounded text-xs font-medium">
                      {subscription.userCount} users
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {subscription.startDate.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {subscription.nextBilling.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-green-600">
                      ${subscription.totalPaid.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                        Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Information */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Service Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Included Features</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Role-based access control for all users
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Daily task management and SOPs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ID verification system
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Integration with warehouse systems
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time notifications and alerts
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Performance analytics and reporting
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Service Terms</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Monthly subscription: $100 per employer</li>
                <li>• Unlimited users per subscription</li>
                <li>• 24/7 technical support</li>
                <li>• Regular system updates and maintenance</li>
                <li>• Data backup and security</li>
                <li>• Custom integration support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;