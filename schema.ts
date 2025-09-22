import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("general_labour"),
  roleLevel: integer("role_level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vessels table
export const vessels = pgTable("vessels", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  imoNumber: varchar("imo_number", { length: 20 }).unique(),
  callSign: varchar("call_sign", { length: 20 }),
  flag: varchar("flag", { length: 100 }),
  vesselType: varchar("vessel_type", { length: 100 }),
  length: decimal("length", { precision: 8, scale: 2 }),
  beam: decimal("beam", { precision: 8, scale: 2 }),
  draft: decimal("draft", { precision: 8, scale: 2 }),
  grossTonnage: integer("gross_tonnage"),
  deadweight: integer("deadweight"),
  status: varchar("status", { length: 50 }).default("approaching"),
  eta: timestamp("eta"),
  etd: timestamp("etd"),
  berthId: varchar("berth_id", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Containers table
export const containers = pgTable("containers", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  containerNumber: varchar("container_number", { length: 20 }).unique().notNull(),
  containerType: varchar("container_type", { length: 50 }),
  size: varchar("size", { length: 10 }),
  status: varchar("status", { length: 50 }).default("empty"),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  yardLocation: varchar("yard_location", { length: 50 }),
  vesselId: uuid("vessel_id").references(() => vessels.id),
  customerId: varchar("customer_id", { length: 100 }),
  arrivalDate: timestamp("arrival_date"),
  departureDate: timestamp("departure_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  roleRequired: varchar("role_required", { length: 100 }),
  priority: varchar("priority", { length: 20 }).default("medium"),
  status: varchar("status", { length: 50 }).default("pending"),
  estimatedDuration: integer("estimated_duration_minutes"),
  vesselId: uuid("vessel_id").references(() => vessels.id),
  containerId: uuid("container_id").references(() => containers.id),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gate transactions table
export const gateTransactions = pgTable("gate_transactions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  truckNumber: varchar("truck_number", { length: 50 }).notNull(),
  driverName: varchar("driver_name", { length: 255 }),
  containerId: uuid("container_id").references(() => containers.id),
  transactionType: varchar("transaction_type", { length: 20 }).notNull(), // 'in' or 'out'
  gateNumber: varchar("gate_number", { length: 10 }),
  processedBy: varchar("processed_by").references(() => users.id),
  processedAt: timestamp("processed_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Berths table
export const berths = pgTable("berths", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  length: decimal("length", { precision: 8, scale: 2 }),
  depth: decimal("depth", { precision: 8, scale: 2 }),
  maxDraft: decimal("max_draft", { precision: 8, scale: 2 }),
  craneCount: integer("crane_count").default(0),
  status: varchar("status", { length: 50 }).default("available"),
  currentVesselId: uuid("current_vessel_id").references(() => vessels.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Integration connections table
export const integrations = pgTable("integrations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).default("disconnected"),
  config: jsonb("config"),
  lastSync: timestamp("last_sync"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVesselSchema = createInsertSchema(vessels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContainerSchema = createInsertSchema(containers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGateTransactionSchema = createInsertSchema(gateTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertBerthSchema = createInsertSchema(berths).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertIntegrationSchema = createInsertSchema(integrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Vessel = typeof vessels.$inferSelect;
export type InsertVessel = z.infer<typeof insertVesselSchema>;
export type Container = typeof containers.$inferSelect;
export type InsertContainer = z.infer<typeof insertContainerSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type GateTransaction = typeof gateTransactions.$inferSelect;
export type InsertGateTransaction = z.infer<typeof insertGateTransactionSchema>;
export type Berth = typeof berths.$inferSelect;
export type InsertBerth = z.infer<typeof insertBerthSchema>;
export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;
