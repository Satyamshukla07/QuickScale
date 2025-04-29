import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChartPieIcon, BarChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import CounterAnimation from "@/components/CounterAnimation";
import LogoCarousel from "@/components/ui/logo-carousel";

const Home = () => {
  const stats = [
    { value: 500, label: "Marketing Campaigns", color: "blue", symbol: "+" },
    { value: 300, label: "Happy Clients", color: "purple", symbol: "+" },
    { value: 85, label: "Conversion Rate", color: "blue", symbol: "%" },
    { value: 12, label: "Industry Awards", color: "purple", symbol: "+" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:py-36">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-6">
                Accelerate Your <span className="gradient-text">Digital Presence</span> with QuickScale!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We transform your brand's digital footprint with cutting-edge marketing strategies tailored for the modern world.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/contact">
                  <Button className="bg-electric-blue hover:bg-neon-purple text-white font-medium py-6 px-8 rounded-md transition duration-300 text-center w-full sm:w-auto btn-glow">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-medium py-6 px-8 rounded-md transition duration-300 text-center w-full sm:w-auto gradient-border">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute -left-8 top-1/4 w-16 h-16 rounded-full bg-electric-blue/20 blur-xl animate-float-slow"></div>
              <div className="absolute -right-5 bottom-1/4 w-20 h-20 rounded-full bg-neon-purple/20 blur-xl animate-float-reverse"></div>
              
              <div className="relative rounded-lg overflow-hidden shadow-2xl gradient-border">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital marketing team working together" 
                  className="w-full h-auto object-cover rounded-lg z-10 relative"
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-10 -left-10 glass p-5 rounded-lg shadow-electric hidden md:block animate-float"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-electric-blue rounded-full p-2">
                    <BarChartIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Average Growth</p>
                    <p className="text-xl font-bold text-white">+147%</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-10 -right-10 glass p-5 rounded-lg shadow-neon hidden md:block animate-float-reverse"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-neon-purple rounded-full p-2">
                    <ChartPieIcon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Client Satisfaction</p>
                    <p className="text-xl font-bold text-white">98%</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Social proof snippet */}
              <motion.div 
                className="absolute bottom-5 right-5 glass p-3 rounded-lg shadow-pink hidden md:block animate-float"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-neon-pink flex items-center justify-center text-xs text-white">+</div>
                    <div className="w-6 h-6 rounded-full bg-neon-teal"></div>
                    <div className="w-6 h-6 rounded-full bg-electric-blue"></div>
                  </div>
                  <p className="text-xs text-white font-medium">35+ joined this week</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-electric-blue/5 via-neon-teal/5 to-neon-purple/5 opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-neon-pink/5 blur-2xl"></div>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-electric-blue/5 blur-2xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Our <span className="gradient-text">Impact</span> in Numbers
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We've helped businesses across industries achieve remarkable growth and digital transformation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CounterAnimation
                  target={stat.value}
                  label={stat.label}
                  symbol={stat.symbol}
                  color={stat.color as "blue" | "purple"}
                  delay={index * 200}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Call-to-action button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/services">
              <Button className="bg-neon-purple hover:bg-electric-blue text-white font-medium py-6 px-10 rounded-md transition duration-300 btn-glow">
                Explore Our Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-28 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20 bg-dots"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Trusted by <span className="gradient-text">Leading Brands</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We're proud to partner with innovative companies across all industries and sizes.
            </p>
          </motion.div>
          
          <div className="glass p-8 rounded-xl max-w-5xl mx-auto mb-16">
            <LogoCarousel />
          </div>
          
          {/* Testimonial preview */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 glass p-8 rounded-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative gradient accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-neon-purple to-neon-pink"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Rebecca Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 italic mb-4">
                  "QuickScale completely transformed our digital presence. Their strategic approach helped us increase engagement by 215% and conversion rates by 40% in just three months!"
                </p>
                <div>
                  <p className="text-white font-bold">Rebecca Chen</p>
                  <p className="text-gray-400 text-sm">Marketing Director</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/testimonials">
                <Button variant="link" className="text-electric-blue hover:text-neon-purple">
                  View all testimonials →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
