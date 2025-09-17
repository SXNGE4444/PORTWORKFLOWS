import React, { useState } from 'react';
import { SAMPLE_USERS, ACCESS_SYSTEMS, User, Role } from '../types/roles';
import { 
  Clock, Package, Settings, Ship, Shield, BarChart3, 
  DollarSign, AlertTriangle, CheckCircle, XCircle, User as UserIcon 
} from 'lucide-react';

const iconMap = {
  Clock, Package, Settings, Ship, Shield, BarChart3, DollarSign, AlertTriangle
};

const RBACSimulator: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>(SAMPLE_USERS[0]);
  
  const getAccessStatus = (systemRequiredLevel: number, userLevel: number) => {
    return userLevel >= systemRequiredLevel;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Role-Based Access Control (RBAC) Simulator</h2>
        <p className="text-sm text-gray-600 mt-1">Select a user to see their system access permissions</p>
      </div>
      
      <div className="p-6">
        {/* User Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select User:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SAMPLE_USERS.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 rounded-lg border text-left transition-colors duration-200 ${
                  selectedUser.id === user.id
                    ? 'bg-navy-50 border-navy-300 ring-2 ring-navy-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  <UserIcon className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium text-sm text-gray-900">{user.name}</span>
                </div>
                <div className="text-xs text-gray-600">
                  {user.role.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Level {user.accessLevel} • {user.department}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected User Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {selectedUser.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Role:</span>
              <p className="text-gray-600">{selectedUser.role.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Access Level:</span>
              <p className="text-gray-600">Level {selectedUser.accessLevel}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Department:</span>
              <p className="text-gray-600">{selectedUser.department}</p>
            </div>
          </div>
          <div className="mt-3">
            <span className="font-medium text-gray-700">Description:</span>
            <p className="text-gray-600 text-sm">{selectedUser.role.description}</p>
          </div>
        </div>

        {/* System Access Grid */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">System Access Permissions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCESS_SYSTEMS.map(system => {
              const hasAccess = getAccessStatus(system.requiredLevel, selectedUser.accessLevel);
              const IconComponent = iconMap[system.icon as keyof typeof iconMap];
              
              return (
                <div
                  key={system.id}
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    hasAccess
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className={`h-6 w-6 ${
                      hasAccess ? 'text-green-600' : 'text-red-600'
                    }`} />
                    {hasAccess ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  <h5 className={`font-medium mb-2 ${
                    hasAccess ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {system.name}
                  </h5>
                  
                  <p className={`text-sm mb-2 ${
                    hasAccess ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {system.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={hasAccess ? 'text-green-600' : 'text-red-600'}>
                      Required: Level {system.requiredLevel}
                    </span>
                    <span className={`font-medium ${
                      hasAccess ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {hasAccess ? 'GRANTED' : 'DENIED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permissions Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">User Permissions Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Specific Permissions:</h5>
              <ul className="space-y-1">
                {selectedUser.role.permissions.map(permission => (
                  <li key={permission.id} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {permission.name} ({permission.level})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Access Statistics:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Systems Accessible:</span>
                  <span className="font-medium">
                    {ACCESS_SYSTEMS.filter(sys => getAccessStatus(sys.requiredLevel, selectedUser.accessLevel)).length} / {ACCESS_SYSTEMS.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Permission Level:</span>
                  <span className="font-medium">{selectedUser.role.permissions[selectedUser.role.permissions.length - 1]?.level || 'read'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role Category:</span>
                  <span className="font-medium capitalize">{selectedUser.role.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RBACSimulator;