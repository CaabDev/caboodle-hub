
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  variant?: "default" | "gradient" | "subtle";
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
        return "bg-gradient-to-br from-white/90 to-secondary/30 dark:from-gray-800/90 dark:to-gray-900/30";
      case "subtle":
        return "bg-background/50 backdrop-blur-xs border-primary/5";
      default:
        return "glass-card";
    }
  };

  return (
    <div
      className={cn(
        "p-6 opacity-0 transform translate-y-4 transition-all duration-500 ease-out rounded-xl border border-border/50 shadow-sm",
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
