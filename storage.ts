import {
  users,
  vessels,
  containers,
  tasks,
  gateTransactions,
  berths,
  integrations,
  type User,
  type UpsertUser,
  type Vessel,
  type InsertVessel,
  type Container,
  type InsertContainer,
  type Task,
  type InsertTask,
  type GateTransaction,
  type InsertGateTransaction,
  type Berth,
  type InsertBerth,
  type Integration,
  type InsertIntegration,
} from '@shared/schema';
import { db } from './db';
import { eq, desc, and, or, count, sql } from 'drizzle-orm';

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string, roleLevel: number): Promise<User>;
  
  // Vessel operations
  getVessels(): Promise<Vessel[]>;
  getVessel(id: string): Promise<Vessel | undefined>;
  createVessel(vessel: InsertVessel): Promise<Vessel>;
  updateVessel(id: string, vessel: Partial<Vessel>): Promise<Vessel>;
  
  // Container operations
  getContainers(): Promise<Container[]>;
  getContainer(id: string): Promise<Container | undefined>;
  createContainer(container: InsertContainer): Promise<Container>;
  updateContainer(id: string, container: Partial<Container>): Promise<Container>;
  
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  getTasksByUser(userId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<Task>): Promise<Task>;
  
  // Gate operations
  getGateTransactions(): Promise<GateTransaction[]>;
  createGateTransaction(transaction: InsertGateTransaction): Promise<GateTransaction>;
  
  // Berth operations
  getBerths(): Promise<Berth[]>;
  getBerth(id: string): Promise<Berth | undefined>;
  updateBerth(id: string, berth: Partial<Berth>): Promise<Berth>;
  
  // Integration operations
  getIntegrations(): Promise<Integration[]>;
  updateIntegration(id: string, integration: Partial<Integration>): Promise<Integration>;
  
  // Dashboard analytics
  getDashboardStats(): Promise<{
    totalVessels: number;
    vesselsInPort: number;
    containersInYard: number;
    pendingTasks: number;
    gateTransactionsToday: number;
    yardOccupancy: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (Required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserRole(id: string, role: string, roleLevel: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ role, roleLevel, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Vessel operations
  async getVessels(): Promise<Vessel[]> {
    return await db.select().from(vessels).orderBy(desc(vessels.eta));
  }

  async getVessel(id: string): Promise<Vessel | undefined> {
    const [vessel] = await db.select().from(vessels).where(eq(vessels.id, id));
    return vessel;
  }

  async createVessel(vesselData: InsertVessel): Promise<Vessel> {
    const [vessel] = await db.insert(vessels).values(vesselData).returning();
    return vessel;
  }

  async updateVessel(id: string, vesselData: Partial<Vessel>): Promise<Vessel> {
    const [vessel] = await db
      .update(vessels)
      .set({ ...vesselData, updatedAt: new Date() })
      .where(eq(vessels.id, id))
      .returning();
    return vessel;
  }

  // Container operations
  async getContainers(): Promise<Container[]> {
    return await db.select().from(containers).orderBy(desc(containers.arrivalDate));
  }

  async getContainer(id: string): Promise<Container | undefined> {
    const [container] = await db.select().from(containers).where(eq(containers.id, id));
    return container;
  }

  async createContainer(containerData: InsertContainer): Promise<Container> {
    const [container] = await db.insert(containers).values(containerData).returning();
    return container;
  }

  async updateContainer(id: string, containerData: Partial<Container>): Promise<Container> {
    const [container] = await db
      .update(containers)
      .set({ ...containerData, updatedAt: new Date() })
      .where(eq(containers.id, id))
      .returning();
    return container;
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  }

  async getTask(id: string): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.assignedTo, userId));
  }

  async createTask(taskData: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(taskData).returning();
    return task;
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const [task] = await db
      .update(tasks)
      .set({ ...taskData, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  // Gate operations
  async getGateTransactions(): Promise<GateTransaction[]> {
    return await db.select().from(gateTransactions).orderBy(desc(gateTransactions.processedAt));
  }

  async createGateTransaction(transactionData: InsertGateTransaction): Promise<GateTransaction> {
    const [transaction] = await db.insert(gateTransactions).values(transactionData).returning();
    return transaction;
  }

  // Berth operations
  async getBerths(): Promise<Berth[]> {
    return await db.select().from(berths);
  }

  async getBerth(id: string): Promise<Berth | undefined> {
    const [berth] = await db.select().from(berths).where(eq(berths.id, id));
    return berth;
  }

  async updateBerth(id: string, berthData: Partial<Berth>): Promise<Berth> {
    const [berth] = await db
      .update(berths)
      .set({ ...berthData, updatedAt: new Date() })
      .where(eq(berths.id, id))
      .returning();
    return berth;
  }

  // Integration operations
  async getIntegrations(): Promise<Integration[]> {
    return await db.select().from(integrations);
  }

  async updateIntegration(id: string, integrationData: Partial<Integration>): Promise<Integration> {
    const [integration] = await db
      .update(integrations)
      .set({ ...integrationData, updatedAt: new Date() })
      .where(eq(integrations.id, id))
      .returning();
    return integration;
  }

  // Dashboard analytics
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [vesselsCount] = await db.select({ count: count() }).from(vessels);
    const [vesselsInPortCount] = await db
      .select({ count: count() })
      .from(vessels)
      .where(eq(vessels.status, 'docked'));
    
    const [containersCount] = await db.select({ count: count() }).from(containers);
    const [pendingTasksCount] = await db
      .select({ count: count() })
      .from(tasks)
      .where(eq(tasks.status, 'pending'));
    
    const [gateTransactionsCount] = await db
      .select({ count: count() })
      .from(gateTransactions)
      .where(sql`DATE(processed_at) = CURRENT_DATE`);

    // Simple yard occupancy calculation
    const totalYardSlots = 1000; // This would be configurable
    const yardOccupancy = Math.round((containersCount.count / totalYardSlots) * 100);

    return {
      totalVessels: vesselsCount.count,
      vesselsInPort: vesselsInPortCount.count,
      containersInYard: containersCount.count,
      pendingTasks: pendingTasksCount.count,
      gateTransactionsToday: gateTransactionsCount.count,
      yardOccupancy,
    };
  }
}

export const storage = new DatabaseStorage();
