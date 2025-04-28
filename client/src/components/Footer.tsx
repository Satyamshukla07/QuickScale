import { Link } from "wouter";
import { Bolt, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-12 bg-dark-bg border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Link href="/" className="text-2xl font-bold font-poppins text-white flex items-center mb-4">
              <span className="text-electric-blue mr-1">
                <Bolt className="h-6 w-6" />
              </span>
              QuickTech
            </Link>
            <p className="text-gray-400 mb-6">
              Accelerating digital presence for businesses worldwide with innovative marketing strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-poppins text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-bold font-poppins text-white mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  PPC Advertising
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Analytics & Reporting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-electric-blue transition duration-300">
                  Brand Strategy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold font-poppins text-white mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest digital marketing tips and trends delivered to your inbox.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-r-none focus:ring-electric-blue text-white"
              />
              <Button type="submit" className="bg-electric-blue hover:bg-neon-purple text-white px-4 rounded-l-none transition duration-300">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} QuickTech. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-electric-blue transition duration-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
