import { users, type User, type InsertUser, contactSubmissions, type ContactSubmission, type InsertContact, portfolioProjects, type PortfolioProject, testimonials, type Testimonial } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions
  createContact(contact: InsertContact & { createdAt: string }): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Portfolio projects
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  
  // Form submissions (for notifications)
  createSubmission(submission: {
    type: string;
    data: Record<string, any>;
    createdAt: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<FormSubmission>;
  getAllSubmissions(): Promise<FormSubmission[]>;
  getSubmissionById(id: number): Promise<FormSubmission | undefined>;
  markSubmissionAsViewed(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactSubmission>;
  private projects: Map<number, PortfolioProject>;
  private testimonialsList: Map<number, Testimonial>;
  private submissions: Map<number, FormSubmission>;
  
  currentId: number;
  contactId: number;
  projectId: number;
  testimonialId: number;
  submissionId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.projects = new Map();
    this.testimonialsList = new Map();
    this.submissions = new Map();
    
    this.currentId = 1;
    this.contactId = 1;
    this.projectId = 1;
    this.testimonialId = 1;
    this.submissionId = 1;
    
    // Initialize with sample portfolio projects
    this.initializeSampleData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContact(contact: InsertContact & { createdAt: string }): Promise<ContactSubmission> {
    const id = this.contactId++;
    const newContact: ContactSubmission = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values());
  }
  
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.projects.values());
  }
  
  async getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined> {
    return this.projects.get(id);
  }
  
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsList.values());
  }
  
  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonialsList.get(id);
  }
  
  private initializeSampleData() {
    // Sample portfolio projects
    const portfolioSamples: PortfolioProject[] = [
      {
        id: this.projectId++,
        title: "LuxeStyle Rebrand",
        category: "E-commerce website redesign & digital strategy",
        description: "Complete e-commerce website redesign and digital marketing strategy that increased conversion rates by 45% and boosted organic traffic by 78%.",
        imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "LuxeStyle needed to reposition their brand in a competitive luxury market with outdated web presence and declining engagement.",
        solution: "We developed a comprehensive rebranding strategy, including website redesign, content refresh, and targeted social media campaigns.",
        tags: ["E-commerce", "Branding", "UX Design"],
      },
      {
        id: this.projectId++,
        title: "EcoFriendly Campaign",
        category: "Multi-platform social media strategy",
        description: "Designed and executed a viral sustainability campaign across Instagram, Twitter, and TikTok that earned 2M+ impressions and boosted engagement by 215%.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "The client needed to authenticate their sustainability initiatives and connect with eco-conscious Gen Z consumers.",
        solution: "We created a user-generated content campaign that encouraged followers to share their own sustainability practices.",
        tags: ["Social Media", "Sustainability", "Content Strategy"],
      },
      {
        id: this.projectId++,
        title: "TechSmart SEO",
        category: "300% organic traffic growth in 6 months",
        description: "Implemented a technical SEO overhaul and content strategy that tripled organic traffic and doubled lead generation over six months.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "TechSmart had excellent products but poor online visibility and a high bounce rate.",
        solution: "We conducted a comprehensive SEO audit, restructured site architecture, and implemented a targeted content marketing plan.",
        tags: ["SEO", "Technical", "Content Marketing"],
      },
      {
        id: this.projectId++,
        title: "FitLife PPC",
        category: "Fitness app launch with 50k+ sign-ups",
        description: "Executed a precision PPC campaign that achieved 50,000+ app downloads within the first month at a cost per acquisition 40% below industry average.",
        imageUrl: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "New fitness app needed rapid user acquisition in a saturated market with a limited marketing budget.",
        solution: "We developed highly targeted ad campaigns with continuous A/B testing and optimization across Google, Facebook, and Instagram.",
        tags: ["PPC", "App Marketing", "Ad Optimization"],
      },
      {
        id: this.projectId++,
        title: "GreenEats Branding",
        category: "Complete brand identity for food delivery service",
        description: "Created a complete brand identity for an eco-friendly food delivery service that resonated with their target demographic and increased brand recognition by 64%.",
        imageUrl: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "New food delivery service needed a distinctive identity that communicated their eco-friendly values in a competitive market.",
        solution: "We created a comprehensive brand identity including logo, visual language, packaging design, and brand voice guidelines.",
        tags: ["Branding", "Design", "Strategy"],
      },
      {
        id: this.projectId++,
        title: "TravelJoy Content",
        category: "Content strategy with 2M+ yearly views",
        description: "Implemented a multi-format content strategy that increased organic traffic by 280% and drove over 2 million annual views to a travel booking platform.",
        imageUrl: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        challenge: "Travel platform struggled to differentiate from competitors and capture organic traffic in a competitive industry.",
        solution: "We developed a destination-focused content hub with SEO-optimized articles, interactive guides, and user-generated reviews.",
        tags: ["Content Marketing", "SEO", "Travel"],
      }
    ];
    
    // Sample testimonials
    const testimonialSamples: Testimonial[] = [
      {
        id: this.testimonialId++,
        name: "Rebecca Chen",
        position: "Marketing Director",
        company: "",
        message: "QuickTech completely transformed our digital presence. Their strategic approach to social media and content marketing helped us increase our engagement by 215% and conversion rates by 40% in just three months. Their team is responsive, creative, and truly understands our brand voice. We couldn't be happier with the results!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      },
      {
        id: this.testimonialId++,
        name: "Michael Torres",
        position: "CEO",
        company: "TechStart",
        message: "As a startup, we needed to establish our brand quickly in a competitive market. QuickTech delivered a comprehensive marketing strategy that helped us gain traction from day one. Their SEO work has been particularly impressive, placing us on the first page for our key terms in under 6 months. Highly recommended!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      },
      {
        id: this.testimonialId++,
        name: "Sophia Williams",
        position: "Brand Manager",
        company: "StyleCo",
        message: "Working with QuickTech has been a game-changer for our fashion brand. Their social media campaigns have consistently outperformed our expectations, and they've helped us build a loyal community around our products. Their content team has a remarkable ability to capture our brand voice and connect with our target audience.",
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      }
    ];
    
    // Add sample data to storage
    portfolioSamples.forEach(project => {
      this.projects.set(project.id, project);
    });
    
    testimonialSamples.forEach(testimonial => {
      this.testimonialsList.set(testimonial.id, testimonial);
    });
  }
}

export const storage = new MemStorage();
