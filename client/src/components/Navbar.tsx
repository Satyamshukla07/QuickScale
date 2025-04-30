
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
    <nav className={`fixed w-full z-[100] ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-background/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Bolt className="h-8 w-8 text-electric-blue" />
            <span className="ml-2 text-xl font-bold">QuickScale</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-electric-blue ${
                  location === link.path ? 'text-electric-blue' : 'text-foreground/80'
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <PersonalizedCTA variant="compact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-electric-blue focus:outline-none"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-6 h-5">
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 translate-y-2 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 translate-y-4 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location === link.path
                  ? 'text-electric-blue bg-electric-blue/10'
                  : 'text-foreground/80 hover:text-electric-blue hover:bg-electric-blue/5'
              }`}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 px-3">
            <PersonalizedCTA variant="compact" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
