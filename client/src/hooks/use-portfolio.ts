import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  challenge?: string;
  solution?: string;
  tags?: string[];
}

export function usePortfolio() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Define the categories for filtering
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "branding", name: "Branding" },
    { id: "social-media", name: "Social Media" },
    { id: "seo", name: "SEO" },
    { id: "ppc", name: "PPC" },
    { id: "content", name: "Content Marketing" },
  ];
  
  // Fetch portfolio projects from API
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["/api/portfolio"],
  });
  
  // Filter projects when activeFilter or projects change
  useEffect(() => {
    if (projects && projects.length > 0) {
      if (activeFilter === "all") {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter((project: Project) => {
          // Check if the project tags include the active filter or if the category matches
          return (
            project.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase()) ||
            project.category.toLowerCase().includes(activeFilter.toLowerCase())
          );
        });
        
        setFilteredProjects(filtered);
      }
    }
  }, [activeFilter, projects]);
  
  // Fallback projects if API fails or while loading
  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: "LuxeStyle Rebrand",
      category: "E-commerce website redesign & digital strategy",
      description: "Complete e-commerce website redesign and digital marketing strategy that increased conversion rates by 45% and boosted organic traffic by 78%.",
      imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "LuxeStyle needed to reposition their brand in a competitive luxury market with outdated web presence and declining engagement.",
      solution: "We developed a comprehensive rebranding strategy, including website redesign, content refresh, and targeted social media campaigns.",
      tags: ["E-commerce", "Branding", "UX Design"]
    },
    {
      id: 2,
      title: "EcoFriendly Campaign",
      category: "Multi-platform social media strategy",
      description: "Designed and executed a viral sustainability campaign across Instagram, Twitter, and TikTok that earned 2M+ impressions and boosted engagement by 215%.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "The client needed to authenticate their sustainability initiatives and connect with eco-conscious Gen Z consumers.",
      solution: "We created a user-generated content campaign that encouraged followers to share their own sustainability practices.",
      tags: ["Social Media", "Sustainability", "Content Strategy"]
    },
    {
      id: 3,
      title: "TechSmart SEO",
      category: "300% organic traffic growth in 6 months",
      description: "Implemented a technical SEO overhaul and content strategy that tripled organic traffic and doubled lead generation over six months.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "TechSmart had excellent products but poor online visibility and a high bounce rate.",
      solution: "We conducted a comprehensive SEO audit, restructured site architecture, and implemented a targeted content marketing plan.",
      tags: ["SEO", "Technical", "Content Marketing"]
    },
    {
      id: 4,
      title: "FitLife PPC",
      category: "Fitness app launch with 50k+ sign-ups",
      description: "Executed a precision PPC campaign that achieved 50,000+ app downloads within the first month at a cost per acquisition 40% below industry average.",
      imageUrl: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "New fitness app needed rapid user acquisition in a saturated market with a limited marketing budget.",
      solution: "We developed highly targeted ad campaigns with continuous A/B testing and optimization across Google, Facebook, and Instagram.",
      tags: ["PPC", "App Marketing", "Ad Optimization"]
    },
    {
      id: 5,
      title: "GreenEats Branding",
      category: "Complete brand identity for food delivery service",
      description: "Created a complete brand identity for an eco-friendly food delivery service that resonated with their target demographic and increased brand recognition by 64%.",
      imageUrl: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "New food delivery service needed a distinctive identity that communicated their eco-friendly values in a competitive market.",
      solution: "We created a comprehensive brand identity including logo, visual language, packaging design, and brand voice guidelines.",
      tags: ["Branding", "Design", "Strategy"]
    },
    {
      id: 6,
      title: "TravelJoy Content",
      category: "Content strategy with 2M+ yearly views",
      description: "Implemented a multi-format content strategy that increased organic traffic by 280% and drove over 2 million annual views to a travel booking platform.",
      imageUrl: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      challenge: "Travel platform struggled to differentiate from competitors and capture organic traffic in a competitive industry.",
      solution: "We developed a destination-focused content hub with SEO-optimized articles, interactive guides, and user-generated reviews.",
      tags: ["Content Marketing", "SEO", "Travel"]
    }
  ];
  
  return {
    projects: error || isLoading ? fallbackProjects : filteredProjects,
    isLoading,
    error,
    categories,
    activeFilter,
    setActiveFilter
  };
}

export default usePortfolio;
