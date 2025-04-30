import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChartPieIcon, BarChartIcon, Instagram, PenTool, Search, BarChart3, Palette, Code, Smartphone, Globe, AtSign, ArrowRight, Zap, Building, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import CounterAnimation from "@/components/CounterAnimation";
import LogoCarousel from "@/components/ui/logo-carousel";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import PersonalizedCTA from "@/components/PersonalizedCTA";
import { SERVICES, TEAM_MEMBERS, TIMELINE } from "@/lib/constants";

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
      <section id="home" className="pt-32 pb-20 md:py-36 relative overflow-hidden">
        {/* Hero background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-electric-blue/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-electric-blue/5 via-neon-purple/5 to-neon-pink/5 rounded-full filter blur-3xl opacity-50"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-electric-blue/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-neon-purple/20 rounded-full animate-float-reverse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 border border-neon-pink/20 rounded-full animate-float-slow"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
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
                className="absolute -bottom-16 -left-16 glass p-5 rounded-lg shadow-electric hidden md:block animate-float z-20"
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
                className="absolute -top-16 -right-16 glass p-5 rounded-lg shadow-neon hidden md:block animate-float-reverse z-20"
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

      {/* Quick Quote Form Section */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-blue/5 via-neon-purple/5 to-neon-teal/5 opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-neon-pink/5 blur-2xl"></div>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-electric-blue/5 blur-2xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                Get a <span className="gradient-text">Quick Quote</span> for Your Project
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Fill out this simple form and receive a personalized quote in less than 24 hours. Our team is ready to help you achieve your digital goals.
              </p>
              <ul className="space-y-3 mb-8">
                {["Free consultation and quote", "Multi-step progress tracking", "No obligation pricing", "Personalized service recommendations"].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="w-6 h-6 rounded-full bg-electric-blue/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-electric-blue" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <QuickQuoteForm />
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

      {/* Services Section */}
      <section className="py-28 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-blue/5 via-neon-purple/5 to-neon-teal/5 opacity-70"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-neon-purple/10 blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-electric-blue/10 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Comprehensive digital solutions to help your business thrive in the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service, index) => {
              // Map icon names to imported icon components
              const iconMap: {[key: string]: any} = {
                Instagram, PenTool, Search, BarChart3, Palette, Code, Smartphone, Globe, AtSign
              };
              const IconComponent = iconMap[service.icon];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full flex flex-col relative overflow-hidden group" hoverEffect>
                    {/* Service image */}
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className={`text-${service.color === "blue" ? "electric-blue" : service.color === "purple" ? "neon-purple" : service.color === "teal" ? "neon-teal" : "neon-pink"} mb-4`}>
                        {IconComponent && <IconComponent className="h-7 w-7" />}
                      </div>
                      <h3 className="text-xl font-bold font-poppins mb-3">{service.title}</h3>
                      <p className="text-gray-300 mb-4 flex-grow text-sm">{service.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/services">
              <Button className="px-8 py-6 rounded-md bg-neon-purple hover:bg-electric-blue text-white font-medium transition duration-300 btn-glow">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
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
              About <span className="gradient-text">QuickScale</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              We're a team of passionate digital experts on a mission to transform brands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* About Us Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-8 h-full">
                <h3 className="text-2xl font-bold font-poppins mb-6 text-electric-blue">Who We Are</h3>
                <p className="text-gray-300 mb-6">
                  At QuickScale, we blend creativity with data-driven strategies to deliver exceptional digital experiences. Our team of experts is dedicated to helping businesses of all sizes establish a powerful online presence and achieve sustainable growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-electric-blue/20 flex items-center justify-center mx-auto mb-4">
                      <Zap className="text-electric-blue h-7 w-7" />
                    </div>
                    <h4 className="font-bold mb-1">Fast Delivery</h4>
                    <p className="text-gray-400 text-sm">Quick turnaround without compromising quality</p>
                  </div>

                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                      <Building className="text-neon-purple h-7 w-7" />
                    </div>
                    <h4 className="font-bold mb-1">Experienced Team</h4>
                    <p className="text-gray-400 text-sm">Industry veterans with proven success records</p>
                  </div>

                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-neon-teal/20 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="text-neon-teal h-7 w-7" />
                    </div>
                    <h4 className="font-bold mb-1">Results-Driven</h4>
                    <p className="text-gray-400 text-sm">Focused on metrics that matter to your business</p>
                  </div>
                </div>

                <Link href="/about">
                  <Button className="w-full bg-electric-blue hover:bg-neon-purple text-white font-medium py-4 rounded-md transition duration-300">
                    Learn More About Us
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold font-poppins mb-6 text-neon-purple">Our Journey</h3>

              <div className="relative pl-8 border-l-2 border-neon-purple">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    className="mb-10 relative last:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute -left-11 w-5 h-5 rounded-full bg-neon-purple flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <h4 className="text-xl font-bold font-poppins mb-2">{item.year}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Team preview */}
              <motion.div
                className="mt-8 glass p-6 rounded-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex -space-x-4 mb-4">
                  {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
                    <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-2 border-dark-bg">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-2">Meet our talented team of digital experts</p>
                <Link href="/about">
                  <Button variant="link" className="text-neon-purple hover:text-white p-0">
                    View Team →
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
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
                  src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Priya Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 italic mb-4">
                  "QuickScale completely transformed our digital presence. Their strategic approach helped us increase engagement by 215% and conversion rates by 40% in just three months!"
                </p>
                <div>
                  <p className="text-white font-bold">Priya Sharma</p>
                  <p className="text-gray-400 text-sm">Marketing Director, InnovateIndia</p>
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

      {/* Personalized CTA Section */}
      <section className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10 bg-noise"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-electric-blue/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Personalized <span className="gradient-text">Recommendations</span> For You
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Based on your interests, we've selected the perfect next steps to help you achieve your digital goals.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PersonalizedCTA showToast={true} />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;