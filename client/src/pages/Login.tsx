import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/GlassCard";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Use the admin credentials defined in storage.ts
      // email: admin@example.com
      // password: admin123
      if (data.email === 'admin@example.com' && data.password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', 'Admin');
        toast({
          title: "Success",
          description: "Successfully logged in as admin",
        });
        navigate('/admin');
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
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-32 bg-dark-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-center">Login</h2>
            <p className="text-gray-300 mb-8 text-center">
              Welcome back! Log in to your account to access our services.
            </p>
            
            <GlassCard className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label htmlFor="email" className="text-light-text mb-2">
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
                <div>
                  <Label htmlFor="password" className="text-light-text mb-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.password ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      className="data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue"
                      {...register("rememberMe")}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-300">
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : (
                    <span>Login</span>
                  )}
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
                
                <div className="text-center mt-6">
                  <p className="text-gray-300">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-electric-blue hover:text-neon-purple transition duration-300">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;
