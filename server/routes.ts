import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints prefix
  const apiPrefix = "/api";

  // Contact form submission endpoint
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({
        success: true,
        data: submission,
        message: "Contact form submitted successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server error while processing your submission"
        });
      }
    }
  });

  // Get all services
  app.get(`${apiPrefix}/services`, async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services" });
    }
  });

  // Get all products
  app.get(`${apiPrefix}/products`, async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  // Get all testimonials
  app.get(`${apiPrefix}/testimonials`, async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });

  // Get navigation items
  app.get(`${apiPrefix}/nav-items`, async (_req, res) => {
    try {
      const navItems = await storage.getAllNavigationItems();
      res.json(navItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching navigation items" });
    }
  });

  // Get social links
  app.get(`${apiPrefix}/social-links`, async (_req, res) => {
    try {
      const socialLinks = await storage.getAllSocialLinks();
      res.json(socialLinks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching social links" });
    }
  });

  // Get footer columns
  app.get(`${apiPrefix}/footer-columns`, async (_req, res) => {
    try {
      const footerColumns = await storage.getAllFooterColumns();
      res.json(footerColumns);
    } catch (error) {
      res.status(500).json({ message: "Error fetching footer columns" });
    }
  });

  // Get page content by slug
  app.get(`${apiPrefix}/pages/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      const pageContent = await storage.getPageContentBySlug(slug);
      
      if (!pageContent) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(pageContent);
    } catch (error) {
      res.status(500).json({ message: "Error fetching page content" });
    }
  });

  // Get site config
  app.get(`${apiPrefix}/site-config`, async (_req, res) => {
    try {
      const siteConfig = await storage.getSiteContentByKey('siteConfig');
      
      if (!siteConfig) {
        return res.status(404).json({ message: "Site configuration not found" });
      }
      
      res.json(siteConfig);
    } catch (error) {
      res.status(500).json({ message: "Error fetching site configuration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
