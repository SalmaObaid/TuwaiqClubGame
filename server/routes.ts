import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.results.create.path, async (req, res) => {
    try {
      const input = api.results.create.input.parse(req.body);
      const result = await storage.createGameResult(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.results.list.path, async (req, res) => {
    const results = await storage.getLatestResults();
    res.json(results);
  });

  app.get("/api/admin-all-results", async (req, res) => {
    try {
      const allResults = await storage.getLatestResults(100);
      res.json(allResults);
    } catch (err) {
      res.status(500).json({ 
        message: "Error fetching database records",
        error: err instanceof Error ? err.message : String(err)
      });
    }
  });

  return httpServer;
}
