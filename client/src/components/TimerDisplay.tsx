import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  className?: string;
  isRunning?: boolean;
}

export function TimerDisplay({ time, className, isRunning }: TimerDisplayProps) {
  // Format to 2 decimal places: 10.00
  const formattedTime = time.toFixed(2);
  const [seconds, centiseconds] = formattedTime.split('.');

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <div className={cn(
          "digital-font font-bold text-8xl md:text-9xl tracking-tighter tabular-nums leading-none",
          isRunning ? "text-purple-600" : "text-purple-600"
        )}>
          <span className="w-[1.2em] inline-block text-right">{seconds}</span>
          <span className="text-muted-foreground/40">.</span>
          <span className="w-[1.2em] inline-block text-left text-purple-600">{centiseconds}</span>
        </div>
        <div className="text-center text-sm uppercase tracking-widest font-semibold text-muted-foreground mt-2">
          Seconds
        </div>
      </div>
    </div>
  );
}
