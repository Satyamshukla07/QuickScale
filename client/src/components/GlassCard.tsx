import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  onClick,
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg",
        hoverEffect && "hover:transform hover:-translate-y-1 hover:shadow-electric transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
