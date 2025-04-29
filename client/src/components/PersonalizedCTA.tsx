import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, BarChart3, Smartphone, MessageCircle } from "lucide-react";
import { useBrowsing, InterestCategory } from "@/hooks/use-browsing-context";
import { useToast } from "@/hooks/use-toast";

// Define CTA options based on different interests
const ctaOptions = {
  services: {
    title: "Ready to Get Started?",
    description: "Our services are tailored to your needs. Let's discuss how we can help your business grow.",
    buttonText: "Explore Our Services",
    linkPath: "/services",
    icon: <PenTool className="h-5 w-5 mr-2" />,
    color: "neon-purple"
  },
  portfolio: {
    title: "View Our Success Stories",
    description: "Take a look at how we've helped businesses like yours achieve remarkable results.",
    buttonText: "Check Our Portfolio",
    linkPath: "/portfolio",
    icon: <BarChart3 className="h-5 w-5 mr-2" />,
    color: "electric-blue"
  },
  contact: {
    title: "Let's Talk About Your Project",
    description: "Have questions? Our team is ready to discuss your needs and provide solutions.",
    buttonText: "Contact Us Now",
    linkPath: "/contact",
    icon: <MessageCircle className="h-5 w-5 mr-2" />,
    color: "neon-teal"
  },
  general: {
    title: "Transform Your Digital Presence",
    description: "Discover how our digital solutions can elevate your brand and drive growth.",
    buttonText: "Learn More",
    linkPath: "/about",
    icon: <Smartphone className="h-5 w-5 mr-2" />,
    color: "neon-pink"
  }
};

interface PersonalizedCTAProps {
  className?: string;
  variant?: "full" | "compact";
  showToast?: boolean;
}

export default function PersonalizedCTA({ 
  className = "", 
  variant = "full",
  showToast = false 
}: PersonalizedCTAProps) {
  const { primaryInterest, lastVisitedPage } = useBrowsing();
  const { toast } = useToast();
  
  // Keep track of which CTA is displayed (for animation purposes)
  const [displayedInterest, setDisplayedInterest] = useState<InterestCategory>(primaryInterest);
  
  // Show a toast notification if enabled and it's not the first page load
  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem('hasLoadedBefore') === null;
    
    if (showToast && !isFirstLoad && displayedInterest !== primaryInterest) {
      toast({
        title: "Personalized for you",
        description: "We've updated our recommendations based on your interests.",
        variant: "default",
      });
    }
    
    // Mark that we've loaded before
    sessionStorage.setItem('hasLoadedBefore', 'true');
    
    // Update displayed interest
    setDisplayedInterest(primaryInterest);
  }, [primaryInterest, showToast, toast]);
  
  // Get the appropriate CTA content
  const cta = ctaOptions[displayedInterest];
  
  // Choose different styling based on variant
  if (variant === "compact") {
    return (
      <div className={`${className}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedInterest}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={cta.linkPath}>
              <Button 
                className={`bg-${cta.color} hover:bg-${cta.color}/90 text-white font-medium transition-all duration-300 group`}
              >
                {cta.icon}
                {cta.buttonText}
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  
  // Full variant with title and description
  return (
    <div className={`glass p-6 rounded-lg shadow-glow ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayedInterest}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold">{cta.title}</h3>
          <p className="text-gray-300">{cta.description}</p>
          <Link href={cta.linkPath}>
            <Button 
              className={`bg-${cta.color} hover:bg-${cta.color}/90 text-white font-medium transition-all duration-300 group mt-2`}
            >
              {cta.icon}
              {cta.buttonText}
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}