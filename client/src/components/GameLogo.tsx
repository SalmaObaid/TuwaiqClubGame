import logoImg from "@assets/Tuwaiq_Logo_1770702265320.png";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GameLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function GameLogo({ className, size = "md", animate = false }: GameLogoProps) {
  const sizeClasses = {
    sm: "w-24",
    md: "w-40",
    lg: "w-64",
  };

  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className={cn("relative z-10", className)}
    >
      <img 
        src={logoImg} 
        alt="Tuwaiq Club Logo" 
        className={cn("relative drop-shadow-xl", sizeClasses[size])}
      />
    </motion.div>
  );
}
