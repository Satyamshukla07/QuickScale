import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-24 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm border-white/10 hover:bg-background/80"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-foreground transition-all" />
        ) : (
          <Sun className="h-5 w-5 text-foreground transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}