import React, { useState } from 'react';
import { DAILY_TASKS, SOPS, Task, ChecklistItem } from '../types/roles';
import { 
  CheckCircle, Clock, AlertTriangle, FileText, 
  Calendar, Users, Filter, Search, Plus
} from 'lucide-react';

const TaskManagement: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = DAILY_TASKS.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || task.roleIds.includes(filterRole);
    
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesRole && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily': return <Calendar className="h-4 w-4" />;
      case 'weekly': return <Calendar className="h-4 w-4" />;
      case 'monthly': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Management & SOPs</h2>
            <p className="text-sm text-gray-600 mt-1">Daily tasks, checklists, and standard operating procedures</p>
          </div>
          <button className="bg-navy-600 hover:bg-navy-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
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
              placeholder="Search tasks..."
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
                <option value="general_labour">General Labour</option>
                <option value="equipment_operator">Equipment Operator</option>
                <option value="checker">Checker</option>
                <option value="foreman">Foreman</option>
                <option value="marine_pilot">Marine Pilot</option>
              </select>
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy-200 focus:border-navy-400 outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Tasks</h3>
            {filteredTasks.map(task => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedTask?.id === task.id ? 'border-navy-300 bg-navy-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getFrequencyIcon(task.frequency)}
                    <span className="ml-2 text-sm text-gray-600 capitalize">{task.frequency}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{task.roleIds.length} roles</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{task.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>{task.checklist.length} items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Task Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            {selectedTask ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Task Details</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority.toUpperCase()}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{selectedTask.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{selectedTask.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Frequency</span>
                    <p className="text-sm text-gray-900 capitalize">{selectedTask.frequency}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estimated Time</span>
                    <p className="text-sm text-gray-900">{selectedTask.estimatedTime} minutes</p>
                  </div>
                </div>

                {selectedTask.sopReference && (
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">SOP Reference</span>
                    </div>
                    <p className="text-sm text-navy-600 font-mono">{selectedTask.sopReference}</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Task Checklist</h5>
                  <div className="space-y-2">
                    {selectedTask.checklist.map((item, index) => (
                      <div key={item.id} className="flex items-center p-2 bg-white rounded border">
                        <input
                          type="checkbox"
                          id={item.id}
                          className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                          defaultChecked={item.completed}
                        />
                        <label htmlFor={item.id} className="ml-3 text-sm text-gray-700 flex-1">
                          {item.description}
                        </label>
                        {item.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Applicable Roles</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.roleIds.map(roleId => (
                      <span key={roleId} className="px-2 py-1 bg-navy-100 text-navy-800 text-xs rounded-full">
                        {roleId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Task</h3>
                <p className="text-gray-600">Choose a task from the list to view details and checklist</p>
              </div>
            )}
          </div>
        </div>

        {/* SOPs Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Operating Procedures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOPS.map(sop => (
              <div key={sop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-navy-600 mr-2" />
                    <span className="font-mono text-sm text-gray-600">{sop.id}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Updated: {sop.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{sop.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{sop.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{sop.steps.length} steps</span>
                  <span>{sop.safetyRequirements.length} safety requirements</span>
                  <span>{sop.roleIds.length} applicable roles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;