import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import GlassCard from "@/components/GlassCard";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  selected: boolean;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

interface ProjectSize {
  pages: number;
  duration: number; // in weeks
}

export default function PriceCalculator() {
  // This line was causing issues, removing it as it's not being used
  // const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: "social-media",
      name: "Social Media Marketing",
      description: "Strategic content creation and management",
      basePrice: 499,
      selected: false
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      description: "User-centered design solutions",
      basePrice: 799,
      selected: false
    },
    {
      id: "web-dev",
      name: "Website Development",
      description: "Custom responsive websites",
      basePrice: 999,
      selected: false
    },
    {
      id: "mobile-dev",
      name: "Mobile App Development",
      description: "Native & cross-platform apps",
      basePrice: 1499,
      selected: false
    },
    {
      id: "web-app",
      name: "Web Application Development",
      description: "Scalable, feature-rich web apps",
      basePrice: 1299,
      selected: false
    },
    {
      id: "meta",
      name: "Meta Advertising",
      description: "Strategic campaigns across Meta platforms",
      basePrice: 699,
      selected: false
    }
  ]);

  const [addons, setAddons] = useState<Addon[]>([
    {
      id: "seo",
      name: "SEO Optimization",
      description: "Improve visibility in search engines",
      price: 299,
      selected: false
    },
    {
      id: "content",
      name: "Content Creation",
      description: "Blog posts, videos, and graphics",
      price: 399,
      selected: false
    },
    {
      id: "analytics",
      name: "Analytics & Reporting",
      description: "Comprehensive performance tracking",
      price: 199,
      selected: false
    },
    {
      id: "maintenance",
      name: "Maintenance Package",
      description: "Regular updates and technical support",
      price: 249,
      selected: false
    }
  ]);

  const [projectSize, setProjectSize] = useState<ProjectSize>({
    pages: 5,
    duration: 4
  });

  const [urgentDelivery, setUrgentDelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price when selections change
  useEffect(() => {
    let price = 0;
    
    // Add base prices for selected services
    services.forEach(service => {
      if (service.selected) {
        price += service.basePrice;
      }
    });
    
    // Add prices for selected addons
    addons.forEach(addon => {
      if (addon.selected) {
        price += addon.price;
      }
    });
    
    // Apply project size multiplier
    const sizeFactor = (projectSize.pages / 5) * (projectSize.duration / 4);
    price = Math.round(price * (1 + (sizeFactor - 1) * 0.5));
    
    // Apply urgent delivery fee if selected (20% extra)
    if (urgentDelivery) {
      price = Math.round(price * 1.2);
    }
    
    setTotalPrice(price);
  }, [services, addons, projectSize, urgentDelivery]);

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };

  const toggleAddon = (id: string) => {
    setAddons(addons.map(addon => 
      addon.id === id ? { ...addon, selected: !addon.selected } : addon
    ));
  };

  const updatePages = (value: number[]) => {
    setProjectSize({
      ...projectSize,
      pages: value[0]
    });
  };

  const updateDuration = (value: number[]) => {
    setProjectSize({
      ...projectSize,
      duration: value[0]
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center mr-2">
              <Calculator size={24} className="text-neon-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">
              Service <span className="gradient-text">Price Calculator</span>
            </h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get an instant estimate for your project by selecting services and customizing your requirements.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Services selection */}
          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-6 text-electric-blue">Select Services</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {services.map(service => (
                  <div 
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      service.selected 
                        ? "border-electric-blue bg-electric-blue/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{service.name}</h4>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <p className="text-white mt-2">
                          <span className="text-lg font-bold">${service.basePrice}</span>
                          <span className="text-sm text-gray-400"> base price</span>
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        service.selected 
                          ? "bg-electric-blue text-white" 
                          : "bg-white/10"
                      }`}>
                        {service.selected && <Check size={14} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4 text-neon-purple">Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map(addon => (
                  <div 
                    key={addon.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      addon.selected 
                        ? "border-neon-purple bg-neon-purple/10" 
                        : "border-white/10 hover:border-white/30"
                    }`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{addon.name}</h4>
                        <p className="text-sm text-gray-400">{addon.description}</p>
                        <p className="text-white mt-2">
                          <span className="text-lg font-bold">+${addon.price}</span>
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        addon.selected 
                          ? "bg-neon-purple text-white" 
                          : "bg-white/10"
                      }`}>
                        {addon.selected && <Check size={14} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Project details and price */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-6 text-neon-teal">Project Details</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="pages">Number of Pages/Screens</Label>
                    <span className="text-electric-blue font-bold">{projectSize.pages}</span>
                  </div>
                  <Slider 
                    id="pages"
                    min={1} 
                    max={20} 
                    step={1} 
                    value={[projectSize.pages]}
                    onValueChange={updatePages}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="duration">Project Duration (weeks)</Label>
                    <span className="text-neon-purple font-bold">{projectSize.duration}</span>
                  </div>
                  <Slider 
                    id="duration"
                    min={2} 
                    max={12} 
                    step={1} 
                    value={[projectSize.duration]}
                    onValueChange={updateDuration}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urgent" className="mr-2">Urgent Delivery</Label>
                    <p className="text-sm text-gray-400">20% express fee</p>
                  </div>
                  <Switch 
                    id="urgent"
                    checked={urgentDelivery}
                    onCheckedChange={setUrgentDelivery}
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">Estimated Price</h3>
                <p className="text-gray-300 mb-6 text-sm">Based on your selections and project details.</p>
                
                <div className="text-4xl font-bold text-white mb-6">
                  ${totalPrice.toLocaleString()}
                </div>
                
                <p className="text-sm text-gray-400 mb-4">
                  This estimate includes all selected services, add-ons, and project parameters. 
                  For a detailed quote, please contact us.
                </p>
                
                <Button className="w-full bg-neon-purple hover:bg-electric-blue transition-colors duration-300">
                  Request Detailed Quote
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}