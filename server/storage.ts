import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  services, type Service, type InsertService,
  products, type Product, type InsertProduct,
  testimonials, type Testimonial, type InsertTestimonial,
  navigationItems, type NavigationItem, type InsertNavigationItem,
  socialLinks, type SocialLink, type InsertSocialLink,
  footerColumns, type FooterColumn, type InsertFooterColumn,
  pageContent, type PageContent, type InsertPageContent,
  siteContent, type SiteContent, type InsertSiteContent
} from "@shared/schema";

// Import db connection
import { db } from "./db";
import { eq } from "drizzle-orm";

// Import dummy data from client's data module
import { services as dummyServices, products as dummyProducts, testimonials as dummyTestimonials } from "../client/src/lib/data";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Service operations
  getAllServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  
  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;

  // Navigation operations
  getAllNavigationItems(): Promise<NavigationItem[]>;
  
  // Social links operations
  getAllSocialLinks(): Promise<SocialLink[]>;
  
  // Footer columns operations
  getAllFooterColumns(): Promise<FooterColumn[]>;
  
  // Page content operations
  getPageContentBySlug(slug: string): Promise<PageContent | undefined>;
  
  // Site content operations
  getSiteContentByKey(key: string): Promise<SiteContent | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private servicesData: Map<number, Service>;
  private productsData: Map<number, Product>;
  private testimonialsData: Map<number, Testimonial>;
  
  private userIdCounter: number;
  private contactSubmissionIdCounter: number;
  private serviceIdCounter: number;
  private productIdCounter: number;
  private testimonialIdCounter: number;
  
  // For backward compatibility
  currentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.servicesData = new Map();
    this.productsData = new Map();
    this.testimonialsData = new Map();
    
    this.userIdCounter = 1;
    this.contactSubmissionIdCounter = 1;
    this.serviceIdCounter = 1;
    this.productIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.currentId = 1;
    
    // Initialize with dummy data from the imported data module
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Populate services from dummy data
    dummyServices.forEach(service => {
      const serviceData: Service = {
        id: this.serviceIdCounter++,
        title: service.title,
        description: service.description,
        icon: service.icon,
        translations: null
      };
      this.servicesData.set(serviceData.id, serviceData);
    });
    
    // Populate products from dummy data
    dummyProducts.forEach(product => {
      const productData: Product = {
        id: this.productIdCounter++,
        title: product.title,
        description: product.description,
        image: product.image || null,
        keyFeatures: product.keyFeatures,
        benefits: product.benefits,
        translations: null
      };
      this.productsData.set(productData.id, productData);
    });
    
    // Populate testimonials from dummy data
    dummyTestimonials.forEach(testimonial => {
      const testimonialData: Testimonial = {
        id: this.testimonialIdCounter++,
        name: testimonial.name,
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image || null,
        translations: null
      };
      this.testimonialsData.set(testimonialData.id, testimonialData);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact submission operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionIdCounter++;
    const currentDate = new Date();
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id,
      language: submission.language || 'en',
      createdAt: currentDate
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }
  
  // Service operations
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.servicesData.values());
  }
  
  async getServiceById(id: number): Promise<Service | undefined> {
    return this.servicesData.get(id);
  }
  
  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.productsData.get(id);
  }
  
  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsData.values());
  }

  // Navigation operations
  async getAllNavigationItems(): Promise<NavigationItem[]> {
    return [];
  }
  
  // Social links operations
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return [];
  }
  
  // Footer columns operations
  async getAllFooterColumns(): Promise<FooterColumn[]> {
    return [];
  }
  
  // Page content operations
  async getPageContentBySlug(slug: string): Promise<PageContent | undefined> {
    return undefined;
  }
  
  // Site content operations
  async getSiteContentByKey(key: string): Promise<SiteContent | undefined> {
    return undefined;
  }
}

// Database storage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return contactSubmission;
  }
  
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }
  
  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }
  
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getAllNavigationItems(): Promise<NavigationItem[]> {
    return await db.select().from(navigationItems).orderBy(navigationItems.order);
  }
  
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return await db.select().from(socialLinks);
  }
  
  async getAllFooterColumns(): Promise<FooterColumn[]> {
    return await db.select().from(footerColumns);
  }
  
  async getPageContentBySlug(slug: string): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContent).where(eq(pageContent.slug, slug));
    return content;
  }
  
  async getSiteContentByKey(key: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.key, key));
    return content;
  }
}

// Choose which storage implementation to use
// Use DatabaseStorage for PostgreSQL integration
export const storage = new DatabaseStorage();
