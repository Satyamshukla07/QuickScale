import { motion } from "framer-motion";
import { ArrowRight, Instagram, PenTool, Search, BarChart3, Palette, Code, Smartphone, Globe, AtSign } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { SERVICES } from "@/lib/constants";
import PriceCalculator from "@/components/PriceCalculator";

const Services = () => {
  // Define map of icon names to actual components
  const iconMap: {[key: string]: any} = {
    Instagram,
    PenTool,
    Search,
    BarChart3,
    Palette,
    Code,
    Smartphone,
    Globe,
    AtSign
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
    <>
      <section id="services" className="py-32 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-electric-blue/5 via-neon-teal/5 to-neon-purple/5 opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-neon-pink/5 blur-3xl"></div>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-electric-blue/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Comprehensive strategies and solutions to grow your brand across all digital channels.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {SERVICES.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              
              return (
                <motion.div key={index} variants={item}>
                  <GlassCard className="h-full flex flex-col relative overflow-hidden group" hoverEffect>
                    {/* Service image */}
                    <div className="h-48 w-full overflow-hidden rounded-t-xl">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className={`text-${service.color === "blue" ? "electric-blue" : service.color === "purple" ? "neon-purple" : service.color === "teal" ? "neon-teal" : "neon-pink"} mb-4`}>
                        {IconComponent && <IconComponent className="h-7 w-7" />}
                      </div>
                      <h3 className="text-xl font-bold font-poppins mb-3">{service.title}</h3>
                      <p className="text-gray-300 mb-4 flex-grow text-sm">{service.description}</p>
                      <a
                        href="#"
                        className={`text-${
                          service.color === "blue" ? "electric-blue" : 
                          service.color === "purple" ? "neon-purple" : 
                          service.color === "teal" ? "neon-teal" : "neon-pink"
                        } hover:text-white transition duration-300 flex items-center group mt-2`}
                      >
                        Learn more{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      <PriceCalculator />
    </>
  );
};

export default Services;
