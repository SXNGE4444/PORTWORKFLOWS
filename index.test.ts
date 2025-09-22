import request from "supertest";
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Helper to create the app as in index.ts
async function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    // ...same logging middleware as index.ts...
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  return app;
}

describe("Express server", () => {
  let app: express.Express;

  beforeAll(async () => {
    app = await createTestApp();
  });

  it("should respond to a known API route", async () => {
    // Replace with a real route from registerRoutes
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
  });

  it("should handle unknown API routes with 404", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });

  it("should handle errors and return JSON", async () => {
    // Simulate an error route if available
    const res = await request(app).get("/api/error");
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should log API requests", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await request(app).get("/api/health");
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
