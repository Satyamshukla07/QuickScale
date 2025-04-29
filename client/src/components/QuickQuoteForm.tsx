import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Form schema with validation
const quickQuoteSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  service: z.string().min(1, { message: "Please select a service" }),
  budget: z.string().min(1, { message: "Please select a budget range" }),
});

type QuickQuoteFormValues = z.infer<typeof quickQuoteSchema>;

export default function QuickQuoteForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const totalSteps = 3;

  const form = useForm<QuickQuoteFormValues>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      budget: "",
    },
  });

  // For demonstration purposes, just simulate a submission
  const onSubmit = async (data: QuickQuoteFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'quote', data }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent!",
          description: "We'll get back to you within 24 hours.",
          variant: "default",
        });
        form.reset();
        setStep(1);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Services list
  const services = [
    "UI/UX Design",
    "Website Development",
    "Mobile App Development",
    "Web Application Development",
    "Meta Advertising",
    "Search Engine Optimization",
    "Content Marketing",
    "Social Media Management"
  ];

  // Budget ranges
  const budgetRanges = [
    "Less than $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+"
  ];

  // Go to next step if current step is valid
  const handleNextStep = async () => {
    const fieldsToValidate: (keyof QuickQuoteFormValues)[] = 
      step === 1 ? ["name"] : 
      step === 2 ? ["email"] : ["service", "budget"];

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setStep(Math.min(step + 1, totalSteps));
    }
  };

  // Go to previous step
  const handlePrevStep = () => {
    setStep(Math.max(step - 1, 1));
  };

  return (
    <div className="glass p-6 rounded-lg shadow-glow">
      <h3 className="text-xl font-bold mb-4 text-center">Get a Free Quote</h3>

      {/* Progress indicators */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className="flex flex-col items-center"
            onClick={() => step >= stepNumber && setStep(stepNumber)}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${step > stepNumber 
                  ? "bg-neon-teal" 
                  : step === stepNumber 
                    ? "bg-electric-blue" 
                    : "bg-gray-700"} 
                ${step >= stepNumber ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {step > stepNumber ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <span className="text-xs text-white">{stepNumber}</span>
              )}
            </div>
            <div className="text-xs mt-1 text-gray-400">
              {stepNumber === 1 ? "Info" : stepNumber === 2 ? "Contact" : "Service"}
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="bg-background/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="bg-background/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Step 3: Service and Budget */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Needed</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select your budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map(range => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevStep}
                className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
              >
                Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}

            {step < totalSteps ? (
              <Button 
                type="button" 
                onClick={handleNextStep} 
                className="bg-electric-blue hover:bg-neon-purple text-white"
              >
                Next Step <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-neon-teal hover:bg-neon-teal/90 text-white"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Quote <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}


// Placeholder for Dashboard and AdminDashboard components with padding
const Dashboard = () => ( <div style={{ paddingTop: '64px' }}>{/* Dashboard content here */}</div> );
const AdminDashboard = () => ( <div style={{ paddingTop: '64px' }}>{/* Admin Dashboard content here */}</div> );

// Placeholder for Navbar with logout
const Navbar = () => (
  <nav>
    <button>Logout</button> {/* Add actual logout logic here */}
  </nav>
);