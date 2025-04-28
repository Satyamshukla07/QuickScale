import { useRef, useEffect } from "react";
import { 
  Globe, 
  ShoppingCart, 
  MonitorSmartphone, 
  Smartphone, 
  Car, 
  Palette, 
  Shirt, 
  Tv 
} from "lucide-react";

const LogoCarousel = () => {
  const logos = [
    { icon: Globe, name: "Google" },
    { icon: MonitorSmartphone, name: "Apple" },
    { icon: Smartphone, name: "Microsoft" },
    { icon: ShoppingCart, name: "Amazon" },
    { icon: Car, name: "Tesla" },
    { icon: Palette, name: "Adobe" },
    { icon: Shirt, name: "Nike" },
    { icon: Tv, name: "Samsung" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
      {logos.map((logo, index) => (
        <div 
          key={index} 
          className="w-32 h-16 glass-card rounded-lg flex items-center justify-center p-4 hover:border-electric-blue transition duration-300"
        >
          <logo.icon 
            className="text-light-text w-full h-6"
            aria-hidden="true"
          />
          <span className="sr-only">{logo.name}</span>
        </div>
      ))}
    </div>
  );
};

export default LogoCarousel;
