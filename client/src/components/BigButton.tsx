import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

export function BigButton({ 
  children, 
  className, 
  variant = "primary", 
  icon,
  ...props 
}: BigButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 border-transparent",
    secondary: "bg-white text-primary border-2 border-primary/20 hover:border-primary/50 shadow-sm",
    outline: "bg-transparent text-primary border-2 border-primary/20 hover:bg-primary/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={cn(
        "relative px-8 py-4 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 flex items-center justify-center gap-3",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      {children}
    </motion.button>
  );
}
