import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define supported languages
export const SUPPORTED_LANGUAGES = ['en', 'yo', 'ig', 'ha', 'fr', 'es', 'sw'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  language: text("language").default('en'),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    title: string;
    description: string;
  }>>(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  keyFeatures: text("key_features").array().notNull(),
  benefits: text("benefits").array().notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    title: string;
    description: string;
    keyFeatures: string[];
    benefits: string[];
  }>>(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    content: string;
  }>>(),
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, any>>(),
});

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  metaTitle: text("metaDitle"),
  metaDescription: text("metaDescription"),
  sections: jsonb("sections").notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    sections: any[];
  }>>(),
});

export const navigationItems = pgTable("navigation_items", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  order: integer("order").default(0),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    label: string;
  }>>(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    platform: string;
  }>>(),
});

export const footerColumns = pgTable("footer_columns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  links: jsonb("links").$type<{ label: string; url: string }[]>().notNull(),
  translations: jsonb("translations").$type<Record<SupportedLanguage, {
    title: string;
    links: { label: string; url: string }[];
  }>>(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  fullName: true,
  email: true,
  phone: true,
  message: true,
  language: true,
});

export const insertServiceSchema = createInsertSchema(services);
export const insertProductSchema = createInsertSchema(products);
export const insertTestimonialSchema = createInsertSchema(testimonials);
export const insertSiteContentSchema = createInsertSchema(siteContent);
export const insertPageContentSchema = createInsertSchema(pageContent);
export const insertNavigationItemSchema = createInsertSchema(navigationItems);
export const insertSocialLinkSchema = createInsertSchema(socialLinks);
export const insertFooterColumnSchema = createInsertSchema(footerColumns);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContent.$inferSelect;

export type InsertNavigationItem = z.infer<typeof insertNavigationItemSchema>;
export type NavigationItem = typeof navigationItems.$inferSelect;

export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

export type InsertFooterColumn = z.infer<typeof insertFooterColumnSchema>;
export type FooterColumn = typeof footerColumns.$inferSelect;
