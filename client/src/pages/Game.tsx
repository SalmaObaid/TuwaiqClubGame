import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { GameLogo } from "@/components/GameLogo";
import { TimerDisplay } from "@/components/TimerDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BigButton } from "@/components/BigButton";

export default function Game() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [time, setTime] = useState(0);
  const [isCrashing, setIsCrashing] = useState(false);

  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const hitSoundRef = useRef<HTMLAudioElement | null>(null);

  const TARGET_TIME = 5.0;
  const MAX_TIME = 8.0;

  useEffect(() => {
    hitSoundRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3",
    );
    hitSoundRef.current.volume = 0.5;
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const stopGame = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const finalTime = (performance.now() - startTimeRef.current) / 1000;
    setIsPlaying(false);

    if (hitSoundRef.current) {
      hitSoundRef.current.currentTime = 0;
      hitSoundRef.current.play().catch(() => {});
    }

    if (finalTime > 7) {
      setIsCrashing(true);
      setTimeout(() => {
        setLocation(
          `/result?time=${finalTime.toFixed(3)}&name=${encodeURIComponent(playerName)}`,
        );
      }, 6500);
      return;
    }

    localStorage.setItem("tuwaiq_last_player", playerName);
    setLocation(
      `/result?time=${finalTime.toFixed(3)}&name=${encodeURIComponent(playerName)}`,
    );
  }, [playerName, setLocation]);

  const updateTimer = useCallback(() => {
    const now = performance.now();
    const elapsed = (now - startTimeRef.current) / 1000;

    setTime(elapsed);

    if (elapsed >= MAX_TIME) {
      stopGame();
    } else {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [stopGame]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setShowInput(false);
    setIsPlaying(true);
    setTime(0);

    startTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && isPlaying) {
        e.preventDefault();
        stopGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, stopGame]);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden touch-manipulation cursor-default select-none bg-white"
      onClick={() => isPlaying && stopGame()}
    >
      <AnimatePresence>
        {isCrashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#0000aa] z-[999] p-10 font-mono text-white flex flex-col justify-center"
          >
            <div className="max-w-2xl mx-auto space-y-6 text-left">
              <h1 className="text-9xl mb-4">:(</h1>
              <h2 className="text-2xl font-bold uppercase">
                System Error: Player IQ Insufficient
              </h2>
              <p className="text-lg opacity-90">
                The system detected choices that… well, let’s call them
                questionable. This session cannot continue.
              </p>
              <div className="space-y-1 text-sm border-t border-white/20 pt-4 opacity-70">
                <p>*** ERROR: 0xBRAIN_FREEZE (PLAYER_OVERESTIMATED_SELF)</p>
                <p>*** MEMORY_DUMPING… SUCCESS</p>
                <p>
                  *** RECOMMENDATION: Maybe consult your instincts before
                  clicking next time.
                </p>
              </div>
              <p className="animate-pulse mt-10 text-xl font-bold">
                Redirecting… and try not to make the system facepalm.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 flex justify-between items-center z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-purple-100"
          onClick={(e) => {
            e.stopPropagation();
            setLocation("/");
          }}
        >
          <ArrowLeft className="w-6 h-6 text-purple-700" />
        </Button>
        <div className="text-sm font-bold text-purple-900/40 uppercase tracking-widest">
          Target: 5.00s
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <AnimatePresence mode="wait">
          {showInput ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm px-6 space-y-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-purple-900">
                Enter Your Name
              </h2>
              <Input
                placeholder="Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="text-center text-lg h-12"
                onKeyDown={(e) => e.key === "Enter" && startGame()}
              />
              <BigButton
                disabled={!playerName.trim()}
                onClick={startGame}
                icon={<Play className="w-6 h-6 fill-current" />}
                className="w-full"
              >
                Start Game
              </BigButton>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 text-xl font-bold text-purple-600 italic uppercase tracking-wider">
                {playerName}
              </div>
              <motion.div
                animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mb-12"
              >
                <GameLogo size="md" />
              </motion.div>

              <TimerDisplay time={time} isRunning={isPlaying} />

              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-16 text-center"
                  >
                    <p className="text-2xl font-light text-muted-foreground animate-pulse">
                      Tap anywhere to stop at 5s
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-100">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
          style={{ width: `${Math.min((time / TARGET_TIME) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
