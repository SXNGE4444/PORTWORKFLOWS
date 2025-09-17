# Harbor & Port Operations Management System

A comprehensive Role-Based Access Control (RBAC) system designed for maritime port operations, featuring premium subscription management, task automation, and integration capabilities with warehouse management systems.

## Features

### 🚢 **Owner Dashboard**
- **System Owner**: lsmptylastsaymatters@gmail.com
- Real-time user analytics and subscription management
- Revenue tracking from $100/month premium subscriptions
- System health monitoring and integration status

### 👥 **Role-Based Access Control**
Complete hierarchy from general workers to executives:
- **General Labour/Stevedore** (Level 1)
- **Equipment Operators** (Level 2)
- **Checkers/Clerks** (Level 3)
- **Supervisors/Foremen** (Level 4-5)
- **Marine Pilots** (Level 6)
- **Terminal Managers** (Level 7)
- **Harbour Masters** (Level 8)
- **Port Directors** (Level 9)
- **Transnet Executives** (Level 10)

### 📋 **Task Management & SOPs**
- Daily task assignments with interactive checklists
- Standard Operating Procedures for safety compliance
- Role-specific task filtering and priority management
- Estimated completion times and progress tracking

### 🔗 **Integration Hub**
- **Emydex WMS** integration for warehouse management
- **SCADA500** support for industrial automation
- **Dispatch System** connectivity
- Pre-picking list generation and inventory sync
- Real-time notifications and task automation

### 💰 **Premium Subscription Model**
- $100/month per employer subscription
- ID verification system with employment contract validation
- Unlimited users per employer subscription
- Comprehensive billing and payment tracking

### 🛡️ **Security & Compliance**
- Multi-level access control based on employment contracts
- ID verification requirements for all users
- Audit trails and activity monitoring
- Safety compliance tracking and reporting

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom maritime theme
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd harbor-port-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── RoleHierarchy.tsx # Role visualization
│   ├── RBACSimulator.tsx # Access control demo
│   ├── UserManagement.tsx # User administration
│   ├── OwnerDashboard.tsx # Owner analytics
│   ├── TaskManagement.tsx # Task & SOP management
│   ├── IntegrationHub.tsx # System integrations
│   └── SubscriptionManagement.tsx # Billing
├── types/
│   └── roles.ts         # Type definitions & data
├── App.tsx              # Main application
└── main.tsx            # Entry point
```

## Key Features Explained

### Role-Based Access Control
Each user is assigned a role with specific access levels (1-10). The system automatically grants or denies access to various port systems based on the user's role level and permissions.

### Task Management
Daily tasks are assigned to roles with interactive checklists. Each task includes:
- Priority levels (Critical, High, Medium, Low)
- Estimated completion times
- Required vs. optional checklist items
- SOP references for safety compliance

### Integration Capabilities
The system connects with:
- **Warehouse Management Systems** (Emydex WMS)
- **SCADA Systems** (SCADA500)
- **Dispatch Systems** for task coordination
- **Workflow Engines** for automation

### Premium Subscription Model
Employers pay $100/month for:
- Unlimited user accounts
- Full RBAC implementation
- Task management and SOPs
- System integrations
- ID verification services
- 24/7 support

## Live Demo

The application is deployed at: https://harbor-port-operatio-er3t.bolt.host

## License

This project is proprietary software owned by lsmptylastsaymatters@gmail.com.

## Support

For technical support or subscription inquiries, contact: lsmptylastsaymatters@gmail.com