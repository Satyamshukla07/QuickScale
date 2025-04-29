import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

interface CounterProps {
  target: number;
  label: string;
  symbol?: string;
  color?: "blue" | "purple";
  delay?: number;
}

const CounterAnimation = ({
  target,
  label,
  symbol = "",
  color = "blue",
  delay = 0
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    let animationFrameId: number;
    
    const animateCounter = () => {
      if (!isInView) return;
      
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      
      const counter = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(easingFunction(progress) * target);
        
        if (frame === totalFrames) {
          setCount(target);
          cancelAnimationFrame(animationFrameId);
        } else {
          setCount(currentCount);
          animationFrameId = requestAnimationFrame(counter);
        }
      };
      
      // Start after delay
      setTimeout(() => {
        counter();
      }, delay);
    };
    
    // Easing function to make counting more natural
    const easingFunction = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    animateCounter();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, delay]);
  
  const textColorClass = color === "blue" ? "text-electric-blue" : "text-neon-purple";
  
  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <GlassCard className="rounded-xl p-6 text-center">
        <div className={`text-4xl md:text-5xl font-bold font-poppins mb-2 ${textColorClass}`}>
          <span>{count}</span>{symbol}
        </div>
        <p className="text-gray-900 dark:text-gray-300">{label}</p>
      </GlassCard>
    </motion.div>
  );
};

export default CounterAnimation;
