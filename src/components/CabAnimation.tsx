
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface CabAnimationProps {
  className?: string;
  color?: string;
  size?: number;
  speed?: "slow" | "normal" | "fast";
  showRoad?: boolean;
}

const CabAnimation = ({ 
  className, 
  color = "text-primary", 
  size = 48,
  speed = "normal",
  showRoad = true
}: CabAnimationProps) => {
  const getSpeedClass = () => {
    switch (speed) {
      case "slow": return "animate-car-move-slow";
      case "fast": return "animate-car-move-fast";
      default: return "animate-car-move";
    }
  };

  return (
    <div className="relative w-full overflow-hidden h-16">
      <div className={cn(
        "absolute",
        getSpeedClass(),
        className
      )}>
        <div className="animate-float">
          <Car size={size} className={cn(color, "drop-shadow-md teal-glow")} />
        </div>
      </div>
      {showRoad && (
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      )}
    </div>
  );
};

export default CabAnimation;
