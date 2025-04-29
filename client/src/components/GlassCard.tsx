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
        "dark:bg-white/10 bg-white/60 backdrop-blur-xl border dark:border-white/20 border-gray-200/80 rounded-xl shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        hoverEffect && "hover:transform hover:-translate-y-1 hover:shadow-electric transition-all duration-300 dark:hover:bg-white/15",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
