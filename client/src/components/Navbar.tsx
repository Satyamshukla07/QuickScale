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
  const [location, navigate] = useLocation();
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('navbar.home'), path: "/" },
    { name: t('navbar.services'), path: "/services" },
    { name: t('navbar.portfolio'), path: "/portfolio" },
    { name: t('navbar.dashboard'), path: "/dashboard" },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 py-3 transition-all duration-300 ${isScrolled ? 'glass' : 'glass bg-opacity-0'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-poppins text-white flex items-center">
          <span className="text-electric-blue mr-1">
            <Bolt className="h-6 w-6" />
          </span>
          QuickScale
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`nav-link text-light-text hover:text-electric-blue transition duration-300 ${location === link.path ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Personalized CTA - Desktop */}
        <div className="hidden md:block mx-2">
          <PersonalizedCTA variant="compact" />
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(localStorage.getItem('userName') === 'Admin' ? '/admin-dashboard' : '/dashboard')}>
                {localStorage.getItem('userName') || 'Profile'}
              </Button>
              <Button 
                variant="ghost"
                className="text-light-text hover:text-electric-blue transition duration-300"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userName');
                  setIsAuthenticated(false);
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-light-text hover:text-electric-blue transition duration-300"
                onClick={() => openAuthModal('login')}
              >
                {t('navbar.login')}
              </Button>
              <Button 
                className="bg-electric-blue hover:bg-neon-purple text-white font-medium transition duration-300"
                onClick={() => openAuthModal('signup')}
              >
                {t('navbar.signup')}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" className="text-light-text focus:outline-none" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full glass py-4 px-4 mt-2 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`text-light-text hover:text-electric-blue transition duration-300 ${location === link.path ? 'text-electric-blue' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
          {/* Personalized CTA - Mobile */}
          <div className="my-3">
            <PersonalizedCTA variant="compact" />
          </div>

          <hr className="border-gray-700" />
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-light-text hover:text-electric-blue transition duration-300"
              onClick={() => {
                openAuthModal('login');
                closeMobileMenu();
              }}
            >
              {t('navbar.login')}
            </Button>
            <Button 
              className="bg-electric-blue hover:bg-neon-purple text-white font-medium transition duration-300"
              onClick={() => {
                openAuthModal('signup');
                closeMobileMenu();
              }}
            >
              {t('navbar.signup')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;