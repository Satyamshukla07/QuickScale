import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

// Define the types of pages users might be interested in
export type InterestCategory = 'services' | 'portfolio' | 'contact' | 'general';

// Interface for our context
interface BrowsingContextType {
  interests: Record<InterestCategory, number>;
  updateInterest: (category: InterestCategory) => void;
  primaryInterest: InterestCategory;
  lastVisitedPage: string;
  registerPageVisit: (path: string) => void;
}

// Create the context with default values
const BrowsingContext = createContext<BrowsingContextType>({
  interests: {
    services: 0,
    portfolio: 0,
    contact: 0,
    general: 0,
  },
  updateInterest: () => {},
  primaryInterest: 'general',
  lastVisitedPage: '/',
  registerPageVisit: () => {},
});

// Provider component
export const BrowsingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [interests, setInterests] = useState<Record<InterestCategory, number>>(() => {
    const stored = localStorage.getItem('userInterests');
    return stored ? JSON.parse(stored) : {
      services: 0,
      portfolio: 0,
      contact: 0,
      general: 1, // Default to general interest
    };
  });
  
  const [lastVisitedPage, setLastVisitedPage] = useState<string>(() => {
    return localStorage.getItem('lastVisitedPage') || '/';
  });
  
  const [location] = useLocation();
  
  // Calculate the primary interest
  const primaryInterest = Object.entries(interests).reduce(
    (max, [category, score]) => (score > interests[max as InterestCategory] ? category as InterestCategory : max),
    'general' as InterestCategory
  );
  
  // Update interests based on user behavior
  const updateInterest = (category: InterestCategory) => {
    setInterests(prev => {
      const updated = { 
        ...prev, 
        [category]: prev[category] + 1 
      };
      
      // Store in localStorage
      localStorage.setItem('userInterests', JSON.stringify(updated));
      
      return updated;
    });
  };
  
  // Register page visits and map them to interest categories
  const registerPageVisit = (path: string) => {
    setLastVisitedPage(path);
    localStorage.setItem('lastVisitedPage', path);
    
    // Map page paths to interest categories
    if (path.includes('/services')) {
      updateInterest('services');
    } else if (path.includes('/portfolio')) {
      updateInterest('portfolio');
    } else if (path.includes('/contact')) {
      updateInterest('contact');
    } else if (path === '/') {
      updateInterest('general');
    }
  };
  
  // Track page navigation
  useEffect(() => {
    registerPageVisit(location);
  }, [location]);
  
  return (
    <BrowsingContext.Provider
      value={{
        interests,
        updateInterest,
        primaryInterest,
        lastVisitedPage,
        registerPageVisit,
      }}
    >
      {children}
    </BrowsingContext.Provider>
  );
};

// Hook for using the browsing context
export const useBrowsing = () => useContext(BrowsingContext);