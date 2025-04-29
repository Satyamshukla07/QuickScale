import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { notificationService } from "./notification";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const contact = await storage.createContact({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      // Also store as a notification for the admin dashboard
      await notificationService.storeContactSubmission(validatedData);
      
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
  
  // Submit quote form
  app.post("/api/quote", async (req, res) => {
    try {
      // Store the quote data as a notification
      await notificationService.storeQuoteSubmission(req.body);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to submit quote form" 
      });
    }
  });
  
  // Authentication events (login, signup)
  app.post("/api/auth-event", async (req, res) => {
    try {
      const { type, userData } = req.body;
      if (type !== 'login' && type !== 'signup') {
        return res.status(400).json({ message: "Invalid event type" });
      }
      
      await notificationService.storeAuthEvent(type, userData);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to record auth event" 
      });
    }
  });
  
  // Admin endpoints for form submissions
  app.get("/api/admin/submissions", async (req, res) => {
    try {
      const submissions = await notificationService.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch submissions" 
      });
    }
  });
  
  app.put("/api/admin/submissions/:id/view", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.markSubmissionAsViewed(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to mark submission as viewed" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
