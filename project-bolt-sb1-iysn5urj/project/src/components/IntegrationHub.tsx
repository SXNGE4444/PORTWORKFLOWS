import React, { useState } from 'react';
import { INTEGRATIONS, Integration } from '../types/roles';
import { 
  Zap, Settings, CheckCircle, XCircle, AlertTriangle,
  RefreshCw, Plus, ExternalLink, Database, Workflow
} from 'lucide-react';

const IntegrationHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'disconnected': return 'bg-red-100 text-red-800 border-red-200';
      case 'error': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warehouse': return <Database className="h-6 w-6" />;
      case 'workflow': return <Workflow className="h-6 w-6" />;
      case 'scada': return <Settings className="h-6 w-6" />;
      case 'dispatch': return <Zap className="h-6 w-6" />;
      default: return <Settings className="h-6 w-6" />;
    }
  };

  const handleSync = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: new Date() }
        : integration
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Integration Hub</h2>
            <p className="text-sm text-gray-600 mt-1">Connect with warehouse management and workflow systems</p>
          </div>
          <button className="bg-navy-600 hover:bg-navy-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Integration Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Connected</p>
                <p className="text-2xl font-bold text-green-900">
                  {integrations.filter(i => i.status === 'connected').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Disconnected</p>
                <p className="text-2xl font-bold text-red-900">
                  {integrations.filter(i => i.status === 'disconnected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Errors</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {integrations.filter(i => i.status === 'error').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total</p>
                <p className="text-2xl font-bold text-blue-900">{integrations.length}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map(integration => (
            <div
              key={integration.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedIntegration(integration)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 p-3 rounded-lg">
                  {getTypeIcon(integration.type)}
                </div>
                <div className="flex items-center">
                  {getStatusIcon(integration.status)}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(integration.status)}`}>
                  {integration.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 capitalize">{integration.type}</span>
              </div>
              
              {integration.lastSync && (
                <div className="text-xs text-gray-500 mb-4">
                  Last sync: {integration.lastSync.toLocaleString()}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSync(integration.id);
                  }}
                  className="text-navy-600 hover:text-navy-800 p-1 rounded hover:bg-navy-50 transition-colors duration-150"
                  title="Sync Now"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle configuration
                  }}
                  className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50 transition-colors duration-150"
                  title="Configure"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle external link
                  }}
                  className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50 transition-colors duration-150"
                  title="Open External"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Details Modal */}
        {selectedIntegration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{selectedIntegration.name}</h3>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedIntegration.status)}`}>
                      {selectedIntegration.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <span className="text-sm text-gray-900 capitalize">{selectedIntegration.type}</span>
                  </div>
                </div>
                
                {selectedIntegration.lastSync && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Synchronization</label>
                    <span className="text-sm text-gray-900">{selectedIntegration.lastSync.toLocaleString()}</span>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Features</label>
                  <div className="space-y-2">
                    {selectedIntegration.type === 'warehouse' && (
                      <>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Pre-picking list generation
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Inventory synchronization
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Dispatch request handling
                        </div>
                      </>
                    )}
                    {selectedIntegration.type === 'workflow' && (
                      <>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Task assignment automation
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Notification routing
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Progress tracking
                        </div>
                      </>
                    )}
                    {selectedIntegration.type === 'scada' && (
                      <>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Real-time equipment monitoring
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Alarm management
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Performance analytics
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleSync(selectedIntegration.id)}
                    className="bg-navy-600 hover:bg-navy-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </button>
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Integrations */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <Database className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">Emydex WMS</h4>
              <p className="text-sm text-gray-600 mb-4">Warehouse Management System integration for inventory and dispatch</p>
              <button className="text-navy-600 hover:text-navy-800 text-sm font-medium">
                Connect Now
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <Settings className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">SCADA500</h4>
              <p className="text-sm text-gray-600 mb-4">Industrial automation and control system integration</p>
              <button className="text-navy-600 hover:text-navy-800 text-sm font-medium">
                Connect Now
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
              <Workflow className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">Custom API</h4>
              <p className="text-sm text-gray-600 mb-4">Connect your custom workflow or management system</p>
              <button className="text-navy-600 hover:text-navy-800 text-sm font-medium">
                Setup API
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationHub;