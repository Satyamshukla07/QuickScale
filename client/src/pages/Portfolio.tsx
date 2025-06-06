import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import GlassCard from "@/components/GlassCard";
import PersonalizedCTA from "@/components/PersonalizedCTA";
import { useBrowsing } from "@/hooks/use-browsing-context";

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

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { updateInterest } = useBrowsing();
  
  // Track that user is interested in portfolio when they visit this page
  useEffect(() => {
    updateInterest('portfolio');
  }, [updateInterest]);

  const projects: Project[] = [
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

  const handleOpenLightbox = (project: Project) => {
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="portfolio" className="py-32 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Our Portfolio</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore some of our most successful projects and case studies.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <GlassCard className="rounded-xl overflow-hidden h-full">
                <div className="relative overflow-hidden group h-64">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-poppins text-white mb-2">{project.title}</h3>
                      <p className="text-gray-200 mb-3">{project.category}</p>
                      <button
                        className="bg-electric-blue hover:bg-neon-purple text-white px-4 py-2 rounded-md transition duration-300"
                        onClick={() => handleOpenLightbox(project)}
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Personalized CTA Section */}
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PersonalizedCTA />
        </motion.div>
      </div>

      <PortfolioLightbox
        isOpen={lightboxOpen}
        project={selectedProject}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};

export default Portfolio;
