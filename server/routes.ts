import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const contact = await storage.createContact({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      res.status(201).json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "Failed to submit contact form" 
      });
    }
  });

  // Get portfolio projects
  app.get("/api/portfolio", async (req, res) => {
    try {
      const projects = await storage.getPortfolioProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch portfolio projects" 
      });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
