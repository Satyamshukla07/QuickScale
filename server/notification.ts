import { storage } from "./storage";
import { InsertContact, InsertUser } from "@shared/schema";

export interface FormSubmission {
  type: 'quote' | 'contact' | 'signup' | 'login';
  data: Record<string, any>;
  createdAt: string;
  phoneNumber?: string;
  email?: string;
}

/**
 * Simple notification system that stores form submissions in the database
 * and can be viewed in the admin dashboard
 */
export class NotificationService {
  
  /**
   * Store a new form submission in the database
   */
  async storeSubmission(submission: FormSubmission) {
    try {
      return await storage.createSubmission(submission);
    } catch (error) {
      console.error('Error storing form submission:', error);
      throw error;
    }
  }
  
  /**
   * Store a contact form submission
   */
  async storeContactSubmission(contactData: InsertContact) {
    const submission: FormSubmission = {
      type: 'contact',
      data: contactData,
      createdAt: new Date().toISOString(),
      email: contactData.email,
    };
    
    return this.storeSubmission(submission);
  }
  
  /**
   * Store a quote form submission
   */
  async storeQuoteSubmission(quoteData: Record<string, any>) {
    const submission: FormSubmission = {
      type: 'quote',
      data: quoteData,
      createdAt: new Date().toISOString(),
      email: quoteData.email,
      phoneNumber: quoteData.phone,
    };
    
    return this.storeSubmission(submission);
  }
  
  /**
   * Store an authentication event (signup or login)
   */
  async storeAuthEvent(type: 'signup' | 'login', userData: InsertUser | Record<string, any>) {
    const submission: FormSubmission = {
      type,
      data: userData,
      createdAt: new Date().toISOString(),
      email: userData.email || userData.username,
    };
    
    return this.storeSubmission(submission);
  }
  
  /**
   * Get all submissions
   */
  async getAllSubmissions() {
    return storage.getAllSubmissions();
  }
}

export const notificationService = new NotificationService();