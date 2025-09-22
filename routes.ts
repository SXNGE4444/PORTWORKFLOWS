import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertVesselSchema, insertContainerSchema, insertTaskSchema, insertGateTransactionSchema } from "@shared/schema";
import { z } from "zod";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";

interface AuthenticatedRequest extends Request {
  user: {
    claims: {
      sub: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard analytics
  app.get('/api/dashboard/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // User management routes
  app.get('/api/users', isAuthenticated, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch('/api/users/:id/role', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { role, roleLevel } = req.body;
      const user = await storage.updateUserRole(id, role, roleLevel);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Vessel management routes
  app.get('/api/vessels', isAuthenticated, async (req, res) => {
    try {
      const vessels = await storage.getVessels();
      res.json(vessels);
    } catch (error) {
      console.error("Error fetching vessels:", error);
      res.status(500).json({ message: "Failed to fetch vessels" });
    }
  });

  app.post('/api/vessels', isAuthenticated, async (req, res) => {
    try {
      const vesselData = insertVesselSchema.parse(req.body);
      const vessel = await storage.createVessel(vesselData);
      res.json(vessel);
    } catch (error) {
      console.error("Error creating vessel:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid vessel data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create vessel" });
      }
    }
  });

  app.patch('/api/vessels/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const vessel = await storage.updateVessel(id, req.body);
      res.json(vessel);
    } catch (error) {
      console.error("Error updating vessel:", error);
      res.status(500).json({ message: "Failed to update vessel" });
    }
  });

  // Container management routes
  app.get('/api/containers', isAuthenticated, async (req, res) => {
    try {
      const containers = await storage.getContainers();
      res.json(containers);
    } catch (error) {
      console.error("Error fetching containers:", error);
      res.status(500).json({ message: "Failed to fetch containers" });
    }
  });

  app.post('/api/containers', isAuthenticated, async (req, res) => {
    try {
      const containerData = insertContainerSchema.parse(req.body);
      const container = await storage.createContainer(containerData);
      res.json(container);
    } catch (error) {
      console.error("Error creating container:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid container data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create container" });
      }
    }
  });

  // Task management routes
  app.get('/api/tasks', isAuthenticated, async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get('/api/tasks/user/:userId', isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await storage.getTasksByUser(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      res.status(500).json({ message: "Failed to fetch user tasks" });
    }
  });

  app.post('/api/tasks', isAuthenticated, async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid task data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create task" });
      }
    }
  });

  app.patch('/api/tasks/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.updateTask(id, req.body);
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Gate transaction routes
  app.get('/api/gate-transactions', isAuthenticated, async (req, res) => {
    try {
      const transactions = await storage.getGateTransactions();
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching gate transactions:", error);
      res.status(500).json({ message: "Failed to fetch gate transactions" });
    }
  });

  app.post('/api/gate-transactions', isAuthenticated, async (req, res) => {
    try {
      const transactionData = insertGateTransactionSchema.parse(req.body);
      const transaction = await storage.createGateTransaction(transactionData);
      res.json(transaction);
    } catch (error) {
      console.error("Error creating gate transaction:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create gate transaction" });
      }
    }
  });

  // Berth management routes
  app.get('/api/berths', isAuthenticated, async (req, res) => {
    try {
      const berths = await storage.getBerths();
      res.json(berths);
    } catch (error) {
      console.error("Error fetching berths:", error);
      res.status(500).json({ message: "Failed to fetch berths" });
    }
  });

  app.patch('/api/berths/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const berth = await storage.updateBerth(id, req.body);
      res.json(berth);
    } catch (error) {
      console.error("Error updating berth:", error);
      res.status(500).json({ message: "Failed to update berth" });
    }
  });

  // Integration management routes
  app.get('/api/integrations', isAuthenticated, async (req, res) => {
    try {
      const integrations = await storage.getIntegrations();
      res.json(integrations);
    } catch (error) {
      console.error("Error fetching integrations:", error);
      res.status(500).json({ message: "Failed to fetch integrations" });
    }
  });

  app.patch('/api/integrations/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const integration = await storage.updateIntegration(id, req.body);
      res.json(integration);
    } catch (error) {
      console.error("Error updating integration:", error);
      res.status(500).json({ message: "Failed to update integration" });
    }
  });

  // PayPal payment routes
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  const httpServer = createServer(app);
  return httpServer;
}
