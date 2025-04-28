import { Variants } from "framer-motion";

// Fade in animation variants
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
      },
    },
  };
};

// Stagger children animation variants
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Item flip animation
export const flipItem = (delay: number = 0): Variants => {
  return {
    hidden: { 
      opacity: 0,
      rotateX: 90,
      scale: 0.9
    },
    show: { 
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
      }
    },
  };
};

// Glass card hover animation
export const glassCardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 12px 40px 0 rgba(58, 134, 255, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Zoom effect 
export const zoomIn = (delay: number = 0): Variants => {
  return {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay,
      },
    },
  };
};

// Card slide-in from bottom
export const cardSlideUp = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay,
      },
    },
  };
};

// Container for staggered animations
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item for staggered animations
export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5 
    }
  },
};

// Navigation menu animation
export const navVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
    },
  },
};

// Hero section text animation
export const heroTextVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

// Hero section image animation
export const heroImageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.3,
    },
  },
};

// Stats counter animation
export const counterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Testimonial slide animation
export const testimonialVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};
