import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Navbar from "@/components/Navbar";
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
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = (tab: 'login' | 'signup') => {
    setActiveAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar openAuthModal={openAuthModal} />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <ScrollToTop />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        activeTab={activeAuthTab}
        setActiveTab={setActiveAuthTab}
      />
      <Toaster />
      <LiveChat />
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}

export default App;
