import { motion } from "framer-motion";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sumit Mishra",
      position: "Marketing Director",
      company: "",
      message: "QuickTech completely transformed our digital presence. Their strategic approach to social media and content marketing helped us increase our engagement by 215% and conversion rates by 40% in just three months. Their team is responsive, creative, and truly understands our brand voice. We couldn't be happier with the results!",
      rating: 5,
      // imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Dr.Vinod Mehra",
      position: "CEO",
      company: "TechStart",
      message: "As a startup, we needed to establish our brand quickly in a competitive market. QuickTech delivered a comprehensive marketing strategy that helped us gain traction from day one. Their SEO work has been particularly impressive, placing us on the first page for our key terms in under 6 months. Highly recommended!",
      rating: 5,
      // imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Namita Jain",
      position: "Brand Manager",
      company: "StyleCo",
      message: "Working with QuickTech has been a game-changer for our fashion brand. Their social media campaigns have consistently outperformed our expectations, and they've helped us build a loyal community around our products. Their content team has a remarkable ability to capture our brand voice and connect with our target audience.",
      rating: 4.5,
      // imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-dark-bg relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-electric-blue/5 to-neon-purple/5 opacity-50"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">What Our Clients Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real stories from businesses we've helped transform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
