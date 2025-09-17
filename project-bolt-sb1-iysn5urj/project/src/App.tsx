import React, { useState } from 'react';
import { 
  Ship, Users, Shield, BarChart3, Settings, 
  Menu, X, Home, UserCheck, Layers, CheckSquare,
  Zap, Crown, CreditCard
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import RoleHierarchy from './components/RoleHierarchy';
import RBACSimulator from './components/RBACSimulator';
import UserManagement from './components/UserManagement';
import OwnerDashboard from './components/OwnerDashboard';
import TaskManagement from './components/TaskManagement';
import IntegrationHub from './components/IntegrationHub';
import SubscriptionManagement from './components/SubscriptionManagement';

type ViewType = 'dashboard' | 'hierarchy' | 'rbac' | 'users' | 'owner' | 'tasks' | 'integrations' | 'subscriptions';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const currentUser = {
    name: 'System Owner',
    role: 'owner',
    email: 'lsmptylastsaymatters@gmail.com'
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'owner', name: 'Owner Dashboard', icon: Crown },
    { id: 'hierarchy', name: 'Role Hierarchy', icon: Layers },
    { id: 'rbac', name: 'RBAC Simulator', icon: Shield },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'tasks', name: 'Task Management', icon: CheckSquare },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.role} userName={currentUser.name} />;
      case 'owner':
        return <OwnerDashboard ownerEmail={currentUser.email} />;
      case 'hierarchy':
        return <RoleHierarchy />;
      case 'rbac':
        return <RBACSimulator />;
      case 'users':
        return <UserManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'integrations':
        return <IntegrationHub />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      default:
        return <Dashboard userRole={currentUser.role} userName={currentUser.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-navy-800">
          <div className="flex items-center">
            <Ship className="h-8 w-8 text-white mr-3" />
            <div>
              <h1 className="text-white font-bold text-lg">PortOps</h1>
              <p className="text-navy-300 text-xs">Harbor Management</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-navy-700 p-1 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as ViewType);
                    setSidebarOpen(false);
                  }}
                  className={`${
                    currentView === item.id
                      ? 'bg-navy-700 text-white border-r-2 border-orange-400'
                      : 'text-navy-300 hover:text-white hover:bg-navy-800'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 w-full`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-navy-800">
          <div className="flex items-center">
            <div className="bg-navy-700 p-2 rounded-full mr-3">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{currentUser.name}</p>
              <p className="text-navy-300 text-xs">System Owner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <Ship className="h-6 w-6 text-navy-600 mr-2" />
              <span className="font-semibold text-gray-900">Harbor & Port Operations</span>
            </div>
            <div></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center">
                <Ship className="h-8 w-8 text-navy-600 mr-3" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Harbor & Port Operations Management</h1>
                  <p className="text-gray-600 mt-1">Role-Based Access Control System for Maritime Operations</p>
                </div>
              </div>
            </div>

            {/* Current View */}
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;