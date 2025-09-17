// Role definitions and RBAC types
export interface Role {
  id: string;
  title: string;
  category: 'general' | 'equipment' | 'supervision' | 'marine' | 'management' | 'executive' | 'transnet' | 'warehouse';
  level: number;
  description: string;
  permissions: Permission[];
  accessSystems: string[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  level: 'read' | 'write' | 'admin' | 'full';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  accessLevel: number;
  isActive: boolean;
  employmentContract: string;
  idVerified: boolean;
  lastLogin?: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  roleIds: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: number; // in minutes
  checklist: ChecklistItem[];
  sopReference?: string;
}

export interface ChecklistItem {
  id: string;
  description: string;
  required: boolean;
  completed?: boolean;
}

export interface SOP {
  id: string;
  title: string;
  description: string;
  roleIds: string[];
  steps: string[];
  safetyRequirements: string[];
  lastUpdated: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'warehouse' | 'workflow' | 'scada' | 'dispatch';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
}

export interface AccessSystem {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  icon: string;
}

// Permission definitions
export const PERMISSIONS: Permission[] = [
  { id: 'time_clock', name: 'Time Clock Access', description: 'Basic time tracking system', level: 'read' },
  { id: 'task_assignment', name: 'Task Assignments', description: 'View assigned tasks', level: 'read' },
  { id: 'cargo_manifest', name: 'Cargo Manifest System', description: 'Access to cargo documentation', level: 'write' },
  { id: 'equipment_control', name: 'Equipment Control', description: 'Operate port machinery', level: 'write' },
  { id: 'workforce_mgmt', name: 'Workforce Management', description: 'Manage team assignments', level: 'admin' },
  { id: 'performance_dash', name: 'Performance Dashboard', description: 'View operational metrics', level: 'admin' },
  { id: 'security_systems', name: 'Security Systems', description: 'Port security and surveillance', level: 'full' },
  { id: 'vts_access', name: 'Vessel Traffic System', description: 'Monitor and control vessel movements', level: 'full' },
  { id: 'financial_reports', name: 'Financial Reports', description: 'Access to financial data', level: 'full' },
  { id: 'emergency_mgmt', name: 'Emergency Management', description: 'Emergency response protocols', level: 'full' }
];

// Access systems available in the port
export const ACCESS_SYSTEMS: AccessSystem[] = [
  { id: 'time_system', name: 'Time & Attendance', description: 'Employee time tracking', requiredLevel: 1, icon: 'Clock' },
  { id: 'cargo_system', name: 'Cargo Management', description: 'Cargo tracking and documentation', requiredLevel: 3, icon: 'Package' },
  { id: 'equipment_system', name: 'Equipment Control', description: 'Crane and machinery operation', requiredLevel: 2, icon: 'Settings' },
  { id: 'vessel_system', name: 'Vessel Traffic System', description: 'Ship movement monitoring', requiredLevel: 7, icon: 'Ship' },
  { id: 'security_system', name: 'Security & Surveillance', description: 'Port security management', requiredLevel: 6, icon: 'Shield' },
  { id: 'performance_system', name: 'Performance Analytics', description: 'Operational dashboards', requiredLevel: 5, icon: 'BarChart3' },
  { id: 'financial_system', name: 'Financial Management', description: 'Budget and revenue tracking', requiredLevel: 8, icon: 'DollarSign' },
  { id: 'emergency_system', name: 'Emergency Response', description: 'Crisis management protocols', requiredLevel: 9, icon: 'AlertTriangle' }
];

// Role definitions based on your provided structure
export const ROLES: Role[] = [
  // General Labour & Operations
  {
    id: 'general_labour',
    title: 'General Labour / Stevedore',
    category: 'general',
    level: 1,
    description: 'Handles manual tasks like lashing, unlashing, and basic cargo movement',
    permissions: [PERMISSIONS[0], PERMISSIONS[1]], // time_clock, task_assignment
    accessSystems: ['time_system']
  },
  {
    id: 'docker',
    title: 'Docker / Longshoreman',
    category: 'general',
    level: 1,
    description: 'General term for workers who load and unload ship cargo',
    permissions: [PERMISSIONS[0], PERMISSIONS[1]], // time_clock, task_assignment
    accessSystems: ['time_system']
  },
  
  // Equipment Operations
  {
    id: 'equipment_operator',
    title: 'Equipment Operator',
    category: 'equipment',
    level: 2,
    description: 'Operates machinery like cranes, reach stackers, or forklifts',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[3]], // time_clock, task_assignment, equipment_control
    accessSystems: ['time_system', 'equipment_system']
  },
  {
    id: 'crane_operator',
    title: 'Crane Operator (TPT)',
    category: 'transnet',
    level: 2,
    description: 'Operates Ship-to-Shore or Rubber-Tired Gantry cranes',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[3]], // time_clock, task_assignment, equipment_control
    accessSystems: ['time_system', 'equipment_system']
  },
  
  // Clerks and Checkers
  {
    id: 'checker',
    title: 'Checker / Clerk',
    category: 'general',
    level: 3,
    description: 'Records and verifies cargo being loaded/unloaded from vessels',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[2]], // time_clock, task_assignment, cargo_manifest
    accessSystems: ['time_system', 'cargo_system']
  },
  
  // Supervision
  {
    id: 'foreman',
    title: 'Foreman / Supervisor',
    category: 'supervision',
    level: 4,
    description: 'Oversees teams of dockworkers and equipment operators',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[2], PERMISSIONS[4]], // + workforce_mgmt
    accessSystems: ['time_system', 'cargo_system', 'equipment_system']
  },
  {
    id: 'warehouse_supervisor',
    title: 'Warehouse Supervisor',
    category: 'warehouse',
    level: 4,
    description: 'Oversees daily warehouse activities and staff',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[2], PERMISSIONS[4]], // + workforce_mgmt
    accessSystems: ['time_system', 'cargo_system', 'equipment_system']
  },
  
  // Marine Operations
  {
    id: 'marine_pilot',
    title: 'Marine Pilot',
    category: 'marine',
    level: 6,
    description: 'Expert navigator who guides ships safely into and out of harbour',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[5], PERMISSIONS[7]], // + performance_dash, vts_access
    accessSystems: ['time_system', 'vessel_system', 'performance_system']
  },
  {
    id: 'tugboat_captain',
    title: 'Tugboat Captain / Crew',
    category: 'marine',
    level: 5,
    description: 'Operates tugboats to assist large ships in maneuvering',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[5]], // + performance_dash
    accessSystems: ['time_system', 'vessel_system', 'performance_system']
  },
  
  // Management
  {
    id: 'terminal_manager',
    title: 'Terminal Manager',
    category: 'management',
    level: 7,
    description: 'Manages entire operations of a specific terminal',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[2], PERMISSIONS[4], PERMISSIONS[5], PERMISSIONS[6]], // + security_systems
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'performance_system', 'security_system']
  },
  {
    id: 'warehouse_manager',
    title: 'Warehouse / Distribution Centre Manager',
    category: 'warehouse',
    level: 7,
    description: 'Responsible for entire warehouse operation, safety, efficiency, and budgeting',
    permissions: [PERMISSIONS[0], PERMISSIONS[1], PERMISSIONS[2], PERMISSIONS[4], PERMISSIONS[5], PERMISSIONS[8]], // + financial_reports
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'performance_system', 'financial_system']
  },
  
  // Senior Management
  {
    id: 'harbour_master',
    title: 'Harbour Master / Deputy Harbour Master',
    category: 'executive',
    level: 8,
    description: 'Senior official responsible for port safety, security, and vessel movement',
    permissions: PERMISSIONS, // All permissions
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'vessel_system', 'security_system', 'performance_system', 'financial_system', 'emergency_system']
  },
  {
    id: 'port_manager',
    title: 'Port Manager / Port Director',
    category: 'executive',
    level: 9,
    description: 'Overall responsibility for commercial and operational performance of the entire port',
    permissions: PERMISSIONS, // All permissions
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'vessel_system', 'security_system', 'performance_system', 'financial_system', 'emergency_system']
  },
  
  // Transnet Executives
  {
    id: 'ce_tpt',
    title: 'Chief Executive: Transnet Port Terminals',
    category: 'transnet',
    level: 10,
    description: 'Highest executive position for the terminal operating division',
    permissions: PERMISSIONS, // All permissions
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'vessel_system', 'security_system', 'performance_system', 'financial_system', 'emergency_system']
  },
  {
    id: 'ce_tnpa',
    title: 'Chief Executive: Transnet National Ports Authority',
    category: 'transnet',
    level: 10,
    description: 'Highest executive position for the port authority division',
    permissions: PERMISSIONS, // All permissions
    accessSystems: ['time_system', 'cargo_system', 'equipment_system', 'vessel_system', 'security_system', 'performance_system', 'financial_system', 'emergency_system']
  }
];

// Sample users for demonstration
export const SAMPLE_USERS: User[] = [
  {
    id: 'user_001',
    name: 'John Smith',
    email: 'john.smith@portops.com',
    role: ROLES.find(r => r.id === 'general_labour')!,
    department: 'Container Terminal A',
    accessLevel: 1,
    isActive: true,
    employmentContract: 'FULL_TIME_STEVEDORE',
    idVerified: true,
    lastLogin: new Date('2024-01-15T08:30:00')
  },
  {
    id: 'user_002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@portops.com',
    role: ROLES.find(r => r.id === 'crane_operator')!,
    department: 'Equipment Operations',
    accessLevel: 2,
    isActive: true,
    employmentContract: 'FULL_TIME_CRANE_OPERATOR',
    idVerified: true,
    lastLogin: new Date('2024-01-15T07:45:00')
  },
  {
    id: 'user_003',
    name: 'Michael Chen',
    email: 'michael.chen@portops.com',
    role: ROLES.find(r => r.id === 'foreman')!,
    department: 'Operations Supervision',
    accessLevel: 4,
    isActive: true,
    employmentContract: 'FULL_TIME_SUPERVISOR',
    idVerified: true,
    lastLogin: new Date('2024-01-15T06:00:00')
  },
  {
    id: 'user_004',
    name: 'Captain David Wilson',
    email: 'david.wilson@portops.com',
    role: ROLES.find(r => r.id === 'marine_pilot')!,
    department: 'Marine Services',
    accessLevel: 6,
    isActive: true,
    employmentContract: 'CONTRACT_MARINE_PILOT',
    idVerified: true,
    lastLogin: new Date('2024-01-15T05:30:00')
  },
  {
    id: 'user_005',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@portops.com',
    role: ROLES.find(r => r.id === 'terminal_manager')!,
    department: 'Terminal Management',
    accessLevel: 7,
    isActive: true,
    employmentContract: 'FULL_TIME_MANAGER',
    idVerified: true,
    lastLogin: new Date('2024-01-15T06:30:00')
  },
  {
    id: 'user_006',
    name: 'Robert Thompson',
    email: 'robert.thompson@portops.com',
    role: ROLES.find(r => r.id === 'harbour_master')!,
    department: 'Port Authority',
    accessLevel: 8,
    isActive: true,
    employmentContract: 'EXECUTIVE_HARBOUR_MASTER',
    idVerified: true,
    lastLogin: new Date('2024-01-15T06:00:00')
  }
];

// Daily tasks for each role
export const DAILY_TASKS: Task[] = [
  {
    id: 'task_001',
    title: 'Pre-Shift Safety Check',
    description: 'Complete mandatory safety inspection before starting work',
    roleIds: ['general_labour', 'docker', 'equipment_operator', 'crane_operator'],
    frequency: 'daily',
    priority: 'critical',
    estimatedTime: 15,
    checklist: [
      { id: 'safety_001', description: 'Check PPE equipment', required: true },
      { id: 'safety_002', description: 'Verify safety harness', required: true },
      { id: 'safety_003', description: 'Inspect work area for hazards', required: true },
      { id: 'safety_004', description: 'Report any safety concerns', required: true }
    ],
    sopReference: 'SOP-SAFETY-001'
  },
  {
    id: 'task_002',
    title: 'Equipment Pre-Operation Inspection',
    description: 'Inspect and test equipment before operation',
    roleIds: ['equipment_operator', 'crane_operator'],
    frequency: 'daily',
    priority: 'critical',
    estimatedTime: 30,
    checklist: [
      { id: 'equip_001', description: 'Check hydraulic fluid levels', required: true },
      { id: 'equip_002', description: 'Test all safety systems', required: true },
      { id: 'equip_003', description: 'Verify load capacity indicators', required: true },
      { id: 'equip_004', description: 'Test emergency stop functions', required: true },
      { id: 'equip_005', description: 'Check tire pressure and condition', required: false }
    ],
    sopReference: 'SOP-EQUIPMENT-001'
  },
  {
    id: 'task_003',
    title: 'Cargo Manifest Verification',
    description: 'Verify and update cargo documentation',
    roleIds: ['checker'],
    frequency: 'daily',
    priority: 'high',
    estimatedTime: 45,
    checklist: [
      { id: 'cargo_001', description: 'Match container numbers with manifest', required: true },
      { id: 'cargo_002', description: 'Verify cargo weights and descriptions', required: true },
      { id: 'cargo_003', description: 'Update system with actual counts', required: true },
      { id: 'cargo_004', description: 'Report discrepancies immediately', required: true }
    ],
    sopReference: 'SOP-CARGO-001'
  },
  {
    id: 'task_004',
    title: 'Team Briefing and Assignment',
    description: 'Conduct daily team briefing and assign tasks',
    roleIds: ['foreman', 'warehouse_supervisor'],
    frequency: 'daily',
    priority: 'high',
    estimatedTime: 20,
    checklist: [
      { id: 'brief_001', description: 'Review daily operations plan', required: true },
      { id: 'brief_002', description: 'Assign team members to specific tasks', required: true },
      { id: 'brief_003', description: 'Communicate safety priorities', required: true },
      { id: 'brief_004', description: 'Set performance targets', required: true }
    ],
    sopReference: 'SOP-SUPERVISION-001'
  },
  {
    id: 'task_005',
    title: 'Vessel Traffic Monitoring',
    description: 'Monitor and coordinate vessel movements',
    roleIds: ['marine_pilot', 'harbour_master'],
    frequency: 'daily',
    priority: 'critical',
    estimatedTime: 480, // 8 hours continuous
    checklist: [
      { id: 'vessel_001', description: 'Review incoming vessel schedule', required: true },
      { id: 'vessel_002', description: 'Check weather and tide conditions', required: true },
      { id: 'vessel_003', description: 'Coordinate with tugboat services', required: true },
      { id: 'vessel_004', description: 'Update vessel traffic system', required: true }
    ],
    sopReference: 'SOP-MARINE-001'
  },
  {
    id: 'task_006',
    title: 'Performance Review and Reporting',
    description: 'Review daily performance metrics and prepare reports',
    roleIds: ['terminal_manager', 'warehouse_manager', 'port_manager'],
    frequency: 'daily',
    priority: 'high',
    estimatedTime: 60,
    checklist: [
      { id: 'perf_001', description: 'Review throughput statistics', required: true },
      { id: 'perf_002', description: 'Analyze equipment utilization', required: true },
      { id: 'perf_003', description: 'Check safety incident reports', required: true },
      { id: 'perf_004', description: 'Prepare daily summary report', required: true }
    ],
    sopReference: 'SOP-REPORTING-001'
  }
];

// Standard Operating Procedures
export const SOPS: SOP[] = [
  {
    id: 'SOP-SAFETY-001',
    title: 'Pre-Shift Safety Inspection Procedure',
    description: 'Mandatory safety checks before beginning any work shift',
    roleIds: ['general_labour', 'docker', 'equipment_operator', 'crane_operator'],
    steps: [
      'Don all required Personal Protective Equipment (PPE)',
      'Inspect PPE for damage or wear',
      'Check safety harness and fall protection equipment',
      'Survey work area for potential hazards',
      'Report any safety concerns to supervisor immediately',
      'Sign off on safety checklist before starting work'
    ],
    safetyRequirements: [
      'Hard hat must be worn at all times',
      'Safety boots with steel toes required',
      'High-visibility vest mandatory in all areas',
      'Safety harness required when working at height'
    ],
    lastUpdated: new Date('2024-01-01')
  },
  {
    id: 'SOP-EQUIPMENT-001',
    title: 'Equipment Pre-Operation Inspection',
    description: 'Daily inspection procedure for all port equipment',
    roleIds: ['equipment_operator', 'crane_operator'],
    steps: [
      'Perform visual inspection of equipment exterior',
      'Check all fluid levels (hydraulic, engine oil, coolant)',
      'Test all safety systems and alarms',
      'Verify load capacity indicators are functioning',
      'Test emergency stop and shutdown procedures',
      'Document any defects or maintenance needs',
      'Obtain supervisor approval before operation'
    ],
    safetyRequirements: [
      'Equipment must not be operated if any safety system fails',
      'All defects must be reported immediately',
      'Only certified operators may perform inspections',
      'Lockout/tagout procedures must be followed'
    ],
    lastUpdated: new Date('2024-01-01')
  }
];

// Available integrations
export const INTEGRATIONS: Integration[] = [
  {
    id: 'emydex_integration',
    name: 'Emydex WMS',
    type: 'warehouse',
    status: 'connected',
    lastSync: new Date('2024-01-15T09:00:00')
  },
  {
    id: 'scada500_integration',
    name: 'SCADA500 System',
    type: 'scada',
    status: 'connected',
    lastSync: new Date('2024-01-15T08:45:00')
  },
  {
    id: 'dispatch_system',
    name: 'Port Dispatch System',
    type: 'dispatch',
    status: 'connected',
    lastSync: new Date('2024-01-15T09:15:00')
  },
  {
    id: 'workflow_engine',
    name: 'Workflow Management Engine',
    type: 'workflow',
    status: 'connected',
    lastSync: new Date('2024-01-15T09:10:00')
  }
];