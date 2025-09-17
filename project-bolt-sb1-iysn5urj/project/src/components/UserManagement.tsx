import React, { useState } from 'react';
import { SAMPLE_USERS, ROLES, User, Role } from '../types/roles';
import { 
  UserPlus, Edit3, Trash2, Search, Filter, 
  CheckCircle, XCircle, User as UserIcon 
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>(SAMPLE_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role.category === filterRole;
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.isActive) ||
                         (filterStatus === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleCategories = Array.from(new Set(ROLES.map(role => role.category)));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage port personnel and their access permissions</p>
          </div>
          <button className="bg-navy-600 hover:bg-navy-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-200 focus:border-navy-400 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy-200 focus:border-navy-400 outline-none"
              >
                <option value="all">All Roles</option>
                {roleCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy-200 focus:border-navy-400 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Access Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="bg-navy-100 p-2 rounded-full mr-3">
                        <UserIcon className="h-4 w-4 text-navy-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{user.role.title}</div>
                      <div className="text-xs text-gray-500 capitalize">{user.role.category}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{user.department}</td>
                  <td className="py-4 px-4">
                    <span className="bg-navy-100 text-navy-800 px-2 py-1 rounded text-xs font-medium">
                      Level {user.accessLevel}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center text-sm ${
                      user.isActive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {user.isActive ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;