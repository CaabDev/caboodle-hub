
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface CabAnimationProps {
  className?: string;
  color?: string;
  size?: number;
}

const CabAnimation = ({ 
  className, 
  color = "text-primary", 
  size = 48 
}: CabAnimationProps) => {
  return (
    <div className="relative w-full overflow-hidden h-16">
      <div className={cn(
        "absolute animate-car-move",
        className
      )}>
        <Car size={size} className={color} />
      </div>
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  );
};

export default CabAnimation;
