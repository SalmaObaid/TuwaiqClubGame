import { useLocation } from "wouter";
import { GameLogo } from "@/components/GameLogo";
import { BigButton } from "@/components/BigButton";
import { Play, Trophy, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  name: string;
  bestDiff: number;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const resetLeaderboard = () => {
    localStorage.removeItem("tuwaiq_leaderboard");
    setLeaderboard([]);
  };
  useEffect(() => {
    const saved = localStorage.getItem("tuwaiq_leaderboard");
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative bg-white">
      <div className="w-full max-w-md mx-auto text-center space-y-8">
        {/* Logo on Top */}
        <div className="flex flex-col items-center gap-4">
          <GameLogo animate size="lg" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-1"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600">
              Tuwaiq Game
            </h1>
          </motion.div>
        </div>

        {/* Start Game Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 w-full px-8"
        >
          <BigButton
            onClick={() => setLocation("/game")}
            icon={<Play className="w-6 h-6 fill-current" />}
            className="w-full"
          >
            Start Game
          </BigButton>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-purple-50 p-6 rounded-2xl border border-purple-100 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetLeaderboard}
              className="text-purple-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {leaderboard.length > 0 ? (
              leaderboard.slice(0, 5).map((entry, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-purple-100 last:border-0"
                >
                  <span className="font-medium text-purple-700">
                    {entry.name}
                  </span>
                  <span className="font-bold text-purple-900">
                    {entry.bestDiff.toFixed(2)}s diff
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">No scores yet</p>
            )}
          </div>
        </motion.div>
      </div>

      <footer className="mt-12 text-center text-xs text-muted-foreground/60">
        Developed by Salma Alharbi
      </footer>
    </div>
  );
}
