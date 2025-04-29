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
                  <Button className="bg-electric-blue hover:bg-blue-600 text-white font-medium py-6 px-8 rounded-md transition duration-300 text-center w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-medium py-6 px-8 rounded-md transition duration-300 text-center w-full sm:w-auto">
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
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Digital marketing team working together" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
              <motion.div 
                className="absolute -bottom-10 -left-10 glass p-5 rounded-lg hidden md:block"
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
                className="absolute -top-10 -right-10 glass p-5 rounded-lg hidden md:block"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-dark-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-electric-blue/5 to-neon-purple/5 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">We've helped businesses across industries achieve remarkable results.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <CounterAnimation
                key={index}
                target={stat.value}
                label={stat.label}
                symbol={stat.symbol}
                color={stat.color as "blue" | "purple"}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Our Clients</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Trusted by leading brands across industries.</p>
          </motion.div>
          
          <LogoCarousel />
        </div>
      </section>
    </>
  );
};

export default Home;
