import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Facebook, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'login' | 'signup';
  setActiveTab: (tab: 'login' | 'signup') => void;
}

const AuthModal = ({ isOpen, onClose, activeTab, setActiveTab }: AuthModalProps) => {
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (loginEmail === 'admin@example.com' && loginPassword === 'admin123') {
        localStorage.setItem('userEmail', loginEmail);
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
        onClose();
        window.location.href = '/admin';
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid credentials. Try admin@example.com / admin123",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "You must agree to the Terms of Service to create an account.",
        variant: "destructive",
      });
      return;
    }

    // Signup logic would go here
    toast({
      title: "Sign Up Attempted",
      description: "This is a demo. Actual registration would be implemented here.",
    });
  };

  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setRememberMe(false);
    setFirstName("");
    setLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/80" onClick={handleClose} />

          <motion.div
            className="glass rounded-xl max-w-md w-full relative z-10"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <button
              className="absolute top-4 right-4 text-white text-xl hover:text-electric-blue transition duration-300"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                className={`w-1/2 py-4 font-medium text-center transition duration-300 ${
                  activeTab === 'login'
                    ? "text-electric-blue border-b-2 border-electric-blue"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-4 font-medium text-center transition duration-300 ${
                  activeTab === 'signup'
                    ? "text-electric-blue border-b-2 border-electric-blue"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <Label htmlFor="login-email" className="text-light-text mb-2">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password" className="text-light-text mb-2">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-300">
                        Remember me
                      </Label>
                    </div>
                    <a href="#" className="text-sm text-electric-blue hover:text-neon-purple transition duration-300">
                      Forgot password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="bg-electric-blue hover:bg-neon-purple text-white font-medium py-3 px-6 rounded-md transition duration-300 w-full"
                    onClick={() => {
                      localStorage.setItem('isAuthenticated', 'true');
                      localStorage.setItem('userName', loginEmail.split('@')[0]);
                      onClose();
                      window.location.reload();
                    }}
                  >
                    Login
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-700 absolute w-full"></div>
                    <div className="bg-dark-bg px-4 relative z-10 text-gray-500">or continue with</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="glass flex items-center justify-center py-3 rounded-md hover:bg-white/10 transition duration-300 border-gray-700"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="glass flex items-center justify-center py-3 rounded-md hover:bg-white/10 transition duration-300 border-gray-700"
                    >
                      <Facebook className="mr-2 h-4 w-4" /> Facebook
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSignup}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-fname" className="text-light-text mb-2">
                        First Name
                      </Label>
                      <Input
                        id="signup-fname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-lname" className="text-light-text mb-2">
                        Last Name
                      </Label>
                      <Input
                        id="signup-lname"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-email" className="text-light-text mb-2">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password" className="text-light-text mb-2">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-confirm" className="text-light-text mb-2">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 focus:ring-electric-blue text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <a href="#" className="text-electric-blue hover:text-neon-purple">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-electric-blue hover:text-neon-purple">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="bg-neon-purple hover:bg-electric-blue text-white font-medium py-3 px-6 rounded-md transition duration-300 w-full"
                  >
                    Create Account
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-700 absolute w-full"></div>
                    <div className="bg-dark-bg px-4 relative z-10 text-gray-500">or sign up with</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="glass flex items-center justify-center py-3 rounded-md hover:bg-white/10 transition duration-300 border-gray-700"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="glass flex items-center justify-center py-3 rounded-md hover:bg-white/10 transition duration-300 border-gray-700"
                    >
                      <Facebook className="mr-2 h-4 w-4" /> Facebook
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;