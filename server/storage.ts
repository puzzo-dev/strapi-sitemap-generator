import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  services, type Service, type InsertService,
  products, type Product, type InsertProduct,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";

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
}

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
        icon: service.icon
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
        benefits: product.benefits
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
        image: testimonial.image || null
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
}

export const storage = new MemStorage();
