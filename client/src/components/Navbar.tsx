
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Bolt } from "lucide-react";
import { useTranslation } from "react-i18next";
import PersonalizedCTA from "@/components/PersonalizedCTA";
import { useBrowsing } from "@/hooks/use-browsing-context";

interface NavbarProps {
  openAuthModal: (tab: 'login' | 'signup') => void;
}

const Navbar = ({ openAuthModal }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();
  const { primaryInterest } = useBrowsing();
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('navbar.home'), path: "/" },
    { name: t('navbar.about'), path: "/about" },
    { name: t('navbar.services'), path: "/services" },
    { name: t('navbar.portfolio'), path: "/portfolio" },
    { name: t('navbar.testimonials'), path: "/testimonials" },
    { name: t('navbar.contact'), path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-[100] top-0 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-background'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold font-poppins text-foreground flex items-center">
            <span className="text-electric-blue mr-1">
              <Bolt className="h-6 w-6" />
            </span>
            QuickScale
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-light-text hover:text-electric-blue transition duration-300 ${location === link.path ? 'text-electric-blue' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <PersonalizedCTA variant="compact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg transition-transform duration-300 ease-in-out transform md:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-light-text hover:text-electric-blue transition duration-300 py-2 ${location === link.path ? 'text-electric-blue' : ''}`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <PersonalizedCTA variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
