import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GlassCard from "./GlassCard";

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

interface PortfolioLightboxProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

const PortfolioLightbox = ({ isOpen, project, onClose }: PortfolioLightboxProps) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass max-w-4xl w-full rounded-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-electric-blue transition duration-300"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-poppins text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  {project.challenge && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-electric-blue mb-2">Challenge</h4>
                      <p className="text-gray-300">{project.challenge}</p>
                    </div>
                  )}
                  
                  {project.solution && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-neon-purple mb-2">Solution</h4>
                      <p className="text-gray-300">{project.solution}</p>
                    </div>
                  )}
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1 rounded-full text-sm ${
                            index % 2 === 0 
                              ? "bg-electric-blue/20 text-electric-blue" 
                              : "bg-neon-purple/20 text-neon-purple"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioLightbox;
