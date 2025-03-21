
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  variant?: "default" | "gradient" | "subtle" | "glass" | "highlight";
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  hoverEffect = true,
  variant = "default"
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
        return "bg-gradient-to-br from-white/95 to-secondary/20 dark:from-gray-800/90 dark:to-gray-900/30 border-white/20";
      case "subtle":
        return "bg-background/50 backdrop-blur-xs border-primary/5";
      case "glass":
        return "bg-white/80 backdrop-blur-md border-white/30 dark:bg-gray-900/50 dark:border-gray-800/50";
      case "highlight":
        return "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20";
      default:
        return "glass-card";
    }
  };

  return (
    <div
      className={cn(
        "p-6 opacity-0 transform translate-y-4 transition-all duration-500 ease-out rounded-xl border shadow-sm",
        getVariantClasses(),
        isVisible && "opacity-100 translate-y-0",
        hoverEffect && "hover:translate-y-[-5px] hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
