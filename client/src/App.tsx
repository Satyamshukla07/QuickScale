import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Navbar from "@/components/Navbar";

const ProtectedAdminRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const [, navigate] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      const isAdmin = localStorage.getItem('userEmail') === 'admin@example.com';

      if (!isAuth || !isAdmin) {
        navigate('/login');
        return;
      }
      setIsAuthorized(true);
    };

    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [navigate]);

  if (!isAuthorized) {
    return null;
  }

  return <Component />;
};
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AuthModal from "@/components/AuthModal";
import LiveChat from "@/components/LiveChat";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  //const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  //const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'signup'>('login');

  //const openAuthModal = (tab: 'login' | 'signup') => {
  //  setActiveAuthTab(tab);
  //  setIsAuthModalOpen(true);
  //};

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <ScrollToTop />
      {/*<AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        activeTab={activeAuthTab}
        setActiveTab={setActiveAuthTab}
      />*/}
      <Toaster />
      <LiveChat />
      
     
    </div>
  );
}

export default App;