import { motion } from "framer-motion";
import { Linkedin, Twitter, Dribbble, Instagram } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { TEAM_MEMBERS, TIMELINE } from "@/lib/constants";

const About = () => {
  const teamMembers = TEAM_MEMBERS;
  const timelineItems = TIMELINE;

  return (
    <section id="about" className="py-32 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">About QuickScale</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're a team of passionate digital marketers on a mission to transform brands.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold font-poppins mb-6 text-electric-blue">Our Mission</h3>
              <p className="text-gray-300 mb-8">
                To empower businesses with innovative digital marketing solutions that drive growth and establish
                meaningful connections with their audience.
              </p>
              
              {/* Timeline */}
              <div className="relative pl-8 border-l-2 border-electric-blue">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="mb-10 relative last:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute -left-11 w-5 h-5 rounded-full bg-electric-blue flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <h4 className="text-xl font-bold font-poppins mb-2">{item.year}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Team */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold font-poppins mb-6 text-neon-purple">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-lg font-bold font-poppins text-center mb-1">{member.name}</h4>
                    <p className={`${index % 2 === 0 ? 'text-electric-blue' : 'text-neon-purple'} text-center mb-3`}>
                      {member.position}
                    </p>
                    <p className="text-gray-300 text-center text-sm">{member.bio}</p>
                    <div className="flex justify-center space-x-3 mt-4">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-electric-blue">
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} className="text-gray-400 hover:text-electric-blue">
                          <Twitter size={16} />
                        </a>
                      )}
                      {member.socialLinks.dribbble && (
                        <a href={member.socialLinks.dribbble} className="text-gray-400 hover:text-neon-purple">
                          <Dribbble size={16} />
                        </a>
                      )}
                      {member.socialLinks.instagram && (
                        <a href={member.socialLinks.instagram} className="text-gray-400 hover:text-neon-purple">
                          <Instagram size={16} />
                        </a>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
