import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/GlassCard";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PersonalizedCTA from "@/components/PersonalizedCTA";
import { useBrowsing } from "@/hooks/use-browsing-context";

const contactSchema = insertContactSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateInterest } = useBrowsing();
  
  // Track that user is interested in contacting when they visit this page
  useEffect(() => {
    updateInterest('contact');
  }, [updateInterest]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-32 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Reach Us</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let's discuss how we can help accelerate your digital presence.
          </p>
        </motion.div>
        
        {/* Personalized CTA above contact form */}
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PersonalizedCTA />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold font-poppins mb-6 text-electric-blue">Send us a message</h3>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="block text-light-text mb-2">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                      placeholder="Your Name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-light-text mb-2">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                      placeholder="your@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="block text-light-text mb-2">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.subject ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                    placeholder="How can we help you?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message" className="block text-light-text mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                    placeholder="Tell us about your project..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-electric-blue hover:bg-neon-purple text-white font-medium py-3 px-6 rounded-md transition duration-300 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <span>Send Message</span>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <GlassCard className="p-8 mb-8">
              <h3 className="text-2xl font-bold font-poppins mb-6 text-neon-purple">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-neon-purple text-xl mt-1">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Our Office</h4>
                    <p className="text-gray-300">
                      123 Innovation Drive, Tech District<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-electric-blue text-xl mt-1">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email Us</h4>
                    <a
                      href="mailto:info@quicktech.com"
                      className="text-gray-300 hover:text-electric-blue transition duration-300"
                    >
                      info@quicktech.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-neon-purple text-xl mt-1">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Call Us</h4>
                    <a
                      href="tel:+14155557890"
                      className="text-gray-300 hover:text-neon-purple transition duration-300"
                    >
                      +1 (415) 555-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-electric-blue text-xl mt-1">
                    <Send />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">WhatsApp</h4>
                    <a
                      href="https://wa.me/14155557890"
                      className="text-gray-300 hover:text-electric-blue transition duration-300"
                    >
                      +1 (415) 555-7890
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue transition duration-300"
                  >
                    <Facebook className="text-white" size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue transition duration-300"
                  >
                    <Twitter className="text-white" size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue transition duration-300"
                  >
                    <Instagram className="text-white" size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue transition duration-300"
                  >
                    <Linkedin className="text-white" size={18} />
                  </a>
                </div>
              </div>
            </GlassCard>
            
            {/* Map */}
            <GlassCard className="p-4 h-[300px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1066655783687!2d-122.40096278447546!3d37.78565977975729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085277d429b%3A0x67ba4f04f149ba61!2sSan%20Francisco%2C%20CA%2094107%2C%20USA!5e0!3m2!1sen!2sus!4v1625177674137!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
                title="Google Maps Location"
              ></iframe>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
