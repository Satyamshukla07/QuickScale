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

const signupSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUp = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    
    // This is a demo - actual signup would be implemented here
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Sign Up Attempted",
        description: "This is a demo. Actual registration would be implemented here.",
      });
    }, 1500);
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
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-center">Create Account</h2>
            <p className="text-gray-300 mb-8 text-center">
              Join QuickTech to access our premium digital marketing services.
            </p>
            
            <GlassCard className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-light-text mb-2">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.firstName ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                      placeholder="John"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-light-text mb-2">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.lastName ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
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
                
                <div>
                  <Label htmlFor="confirmPassword" className="text-light-text mb-2">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-700'} rounded-md focus:ring-electric-blue text-white`}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    className={`data-[state=checked]:bg-electric-blue data-[state=checked]:border-electric-blue ${errors.agreeTerms ? 'border-red-400' : ''}`}
                    {...register("agreeTerms")}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-gray-300">
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
                {errors.agreeTerms && (
                  <p className="mt-1 text-sm text-red-400">{errors.agreeTerms.message}</p>
                )}
                
                <Button
                  type="submit"
                  className="bg-neon-purple hover:bg-electric-blue text-white font-medium py-3 px-6 rounded-md transition duration-300 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    <span>Create Account</span>
                  )}
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
                
                <div className="text-center mt-6">
                  <p className="text-gray-300">
                    Already have an account?{" "}
                    <Link href="/login" className="text-electric-blue hover:text-neon-purple transition duration-300">
                      Log in
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

export default SignUp;
