import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import GlassCard from "./GlassCard";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  message: string;
  rating: number;
  imageUrl: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const variants = {
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="relative h-[400px] md:h-[320px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            <GlassCard className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <img 
                    src={testimonials[currentIndex].imageUrl} 
                    alt={`${testimonials[currentIndex].name} testimonial`} 
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h4 className="text-xl font-bold font-poppins text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-electric-blue">
                    {testimonials[currentIndex].position}
                    {testimonials[currentIndex].company && `, ${testimonials[currentIndex].company}`}
                  </p>
                  <div className="flex mt-3 text-yellow-400">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="text-4xl text-electric-blue mb-4">"</div>
                  <p className="text-gray-300">
                    {testimonials[currentIndex].message}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Testimonial Navigation */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-electric-blue" : "bg-gray-500"
            }`}
            onClick={() => goToTestimonial(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Testimonial Controls */}
      <button
        className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue/20 transition duration-300"
        onClick={prevTestimonial}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-electric-blue/20 transition duration-300"
        onClick={nextTestimonial}
        aria-label="Next testimonial"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
