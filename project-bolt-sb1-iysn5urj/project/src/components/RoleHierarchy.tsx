import React from 'react';
import { ROLES } from '../types/roles';
import { Users, Crown, Settings, Ship, Package, BarChart3 } from 'lucide-react';

const categoryColors = {
  general: 'bg-blue-100 text-blue-800 border-blue-200',
  equipment: 'bg-orange-100 text-orange-800 border-orange-200',
  supervision: 'bg-green-100 text-green-800 border-green-200',
  marine: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  management: 'bg-purple-100 text-purple-800 border-purple-200',
  executive: 'bg-red-100 text-red-800 border-red-200',
  transnet: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  warehouse: 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

const categoryIcons = {
  general: Users,
  equipment: Settings,
  supervision: BarChart3,
  marine: Ship,
  management: Crown,
  executive: Crown,
  transnet: Crown,
  warehouse: Package
};

const RoleHierarchy: React.FC = () => {
  const groupedRoles = ROLES.reduce((acc, role) => {
    const level = role.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(role);
    return acc;
  }, {} as Record<number, typeof ROLES>);

  const sortedLevels = Object.keys(groupedRoles).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Harbor & Port Operations Role Hierarchy</h2>
        <p className="text-sm text-gray-600 mt-1">Organizational structure from general workers to executives</p>
      </div>
      
      <div className="p-6 space-y-6">
        {sortedLevels.map(level => {
          const roles = groupedRoles[parseInt(level)];
          return (
            <div key={level} className="relative">
              {/* Level indicator */}
              <div className="flex items-center mb-4">
                <div className="bg-navy-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Level {level}
                </div>
                <div className="flex-1 ml-3 border-t border-gray-200"></div>
              </div>
              
              {/* Roles at this level */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                {roles.map(role => {
                  const IconComponent = categoryIcons[role.category];
                  return (
                    <div
                      key={role.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 text-gray-600 mr-2" />
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${categoryColors[role.category]}`}>
                            {role.category.charAt(0).toUpperCase() + role.category.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                        {role.title}
                      </h3>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                        {role.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {role.permissions.length} permissions
                        </span>
                        <span className="text-gray-500">
                          {role.accessSystems.length} systems
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleHierarchy;