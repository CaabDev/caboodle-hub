
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  variant?: "default" | "gradient" | "subtle" | "glass" | "highlight";
  glowEffect?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  hoverEffect = true,
  variant = "default",
  glowEffect = false
}: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-card/95 to-secondary/80 border-white/5";
      case "subtle":
        return "bg-background/50 backdrop-blur-xs border-white/5";
      case "glass":
        return "bg-card/50 backdrop-blur-md border-white/10";
      case "highlight":
        return "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20";
      default:
        return "bg-card/80 backdrop-blur-sm border border-white/10";
    }
  };

  return (
    <div
      className={cn(
        "p-6 opacity-0 transform translate-y-4 transition-all duration-500 ease-out rounded-xl border shadow-md",
        getVariantClasses(),
        isVisible && "opacity-100 translate-y-0",
        hoverEffect && "hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300",
        glowEffect && "teal-glow",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
