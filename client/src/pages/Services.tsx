import { motion } from "framer-motion";
import { Instagram, PenTool, Search, Bookmark, BarChart3, Megaphone, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const Services = () => {
  const services = [
    {
      icon: Instagram,
      title: "Social Media Marketing",
      description: "Strategic content creation and community management across all major platforms.",
      color: "blue",
    },
    {
      icon: PenTool,
      title: "Content Creation",
      description: "Engaging blog posts, videos, graphics and interactive content that resonates with your audience.",
      color: "purple",
    },
    {
      icon: Search,
      title: "Search Engine Optimization",
      description: "Data-driven SEO strategies to improve your visibility and organic traffic.",
      color: "blue",
    },
    {
      icon: Bookmark,
      title: "PPC Advertising",
      description: "Targeted paid campaigns across Google, social media, and other relevant platforms.",
      color: "purple",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive analytics to track performance and optimize your marketing ROI.",
      color: "blue",
    },
    {
      icon: Megaphone,
      title: "Brand Strategy",
      description: "Cohesive brand identity development and positioning in competitive markets.",
      color: "purple",
    },
  ];

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
    <section id="services" className="py-32 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Our Digital Marketing Services
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive strategies to grow your brand across all digital channels.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <GlassCard className="p-8 h-full flex flex-col" hoverEffect>
                <div className={`text-${service.color === "blue" ? "electric-blue" : "neon-purple"} mb-4 text-4xl`}>
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{service.description}</p>
                <a
                  href="#"
                  className={`text-${
                    service.color === "blue" ? "electric-blue" : "neon-purple"
                  } hover:text-${service.color === "blue" ? "neon-purple" : "electric-blue"} transition duration-300 flex items-center group`}
                >
                  Learn more{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
