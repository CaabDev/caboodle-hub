
import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  hoverEffect = true
}: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "glass-card p-6 opacity-0 transform translate-y-4 transition-all duration-500 ease-out",
        isVisible && "opacity-100 translate-y-0",
        hoverEffect && "hover:translate-y-[-5px] hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
