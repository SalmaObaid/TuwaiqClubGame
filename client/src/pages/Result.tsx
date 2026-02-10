// import { useEffect, useState } from "react";
// import { useLocation } from "wouter";
// import confetti from "canvas-confetti";
// import { motion } from "framer-motion";
// import { GameLogo } from "@/components/GameLogo";
// import { BigButton } from "@/components/BigButton";
// import { TimerDisplay } from "@/components/TimerDisplay";
// import { useCreateGameResult } from "@/hooks/use-game";
// import { RotateCcw, Home, Medal } from "lucide-react";

// interface LeaderboardEntry {
//   name: string;
//   bestDiff: number;
// }

// export default function Result() {
//   const [, setLocation] = useLocation();
//   const { mutate: saveResult } = useCreateGameResult();

//   const queryParams = new URLSearchParams(window.location.search);
//   const timeParam = queryParams.get("time");
//   const nameParam = queryParams.get("name") || "Player";
//   const finalTime = timeParam ? parseFloat(timeParam) : 0;

//   const TARGET = 10.0;
//   const TOLERANCE = 0.05;
//   const diff = finalTime - TARGET;
//   const absDiff = Math.abs(diff);
//   const isPerfect = absDiff <= TOLERANCE;
//   const formattedDiff = (diff > 0 ? "+" : "") + diff.toFixed(2);

//   const [hasSaved, setHasSaved] = useState(false);

//   useEffect(() => {
//     if (!timeParam) {
//       setLocation("/");
//       return;
//     }

//     if (!hasSaved) {
//       // API Save
//       saveResult({
//         timeClicked: finalTime,
//         difference: parseFloat(diff.toFixed(2)),
//         isPerfect,
//         playerName: nameParam,
//       });

//       // LocalStorage Leaderboard
//       const saved = localStorage.getItem("tuwaiq_leaderboard");
//       let leaderboard: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];

//       const existingIdx = leaderboard.findIndex(e => e.name === nameParam);
//       if (existingIdx > -1) {
//         if (absDiff < leaderboard[existingIdx].bestDiff) {
//           leaderboard[existingIdx].bestDiff = absDiff;
//         }
//       } else {
//         leaderboard.push({ name: nameParam, bestDiff: absDiff });
//       }

//       leaderboard.sort((a, b) => a.bestDiff - b.bestDiff);
//       localStorage.setItem("tuwaiq_leaderboard", JSON.stringify(leaderboard));

//       setHasSaved(true);
//     }

//     if (isPerfect) {
//       const duration = 3000;
//       const end = Date.now() + duration;

//       const frame = () => {
//         confetti({
//           particleCount: 5,
//           angle: 60,
//           spread: 55,
//           origin: { x: 0 },
//           colors: ["#a855f7", "#ec4899", "#fce7f3"],
//         });
//         confetti({
//           particleCount: 5,
//           angle: 120,
//           spread: 55,
//           origin: { x: 1 },
//           colors: ["#a855f7", "#ec4899", "#fce7f3"],
//         });

//         if (Date.now() < end) {
//           requestAnimationFrame(frame);
//         }
//       };
//       frame();
//     }
//   }, [finalTime, isPerfect, saveResult, hasSaved, setLocation, timeParam, nameParam, absDiff, diff]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-white">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="w-full max-w-lg mx-auto text-center space-y-8 z-10"
//       >
//         <div className="mb-8">
//           <GameLogo size="sm" className="mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-purple-600 uppercase tracking-widest">
//             {nameParam}, {isPerfect ? "Precision Master!" : "Game Over"}
//           </h2>
//         </div>

//         <div className="relative py-4">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <TimerDisplay time={finalTime} />

//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.4, type: "spring" }}
//               className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold mt-4 shadow-sm border ${
//                 isPerfect
//                   ? "bg-green-100 text-green-700 border-green-200"
//                   : "bg-red-50 text-red-600 border-red-100"
//               }`}
//             >
//               {isPerfect ? <Medal className="w-5 h-5" /> : null}
//               {isPerfect ? "PERFECT HIT!" : `${formattedDiff}s`}
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 leading-tight">
//             {isPerfect ? (
//               <span>
//                 Congratulations! <br />
//                 Perfect Timing!
//               </span>
//             ) : (
//               "So close! Try to focus more"
//             )}
//           </h1>

//           <p className="text-muted-foreground text-lg max-w-xs mx-auto">
//             {isPerfect
//               ? "Try again to improve your speed and accuracy!"
//               : "Focus is key to precision."}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 w-full px-4">
//           <BigButton
//             variant="secondary"
//             onClick={() => setLocation("/game")}
//             icon={<RotateCcw className="w-5 h-5" />}
//           >
//             Play Again
//           </BigButton>

//           <BigButton
//             variant="outline"
//             onClick={() => setLocation("/")}
//             icon={<Home className="w-5 h-5" />}
//           >
//             Home
//           </BigButton>
//         </div>

//         <div className="pt-12 border-t border-purple-100 mt-8">
//           <p className="text-sm text-muted-foreground">
//             Precision and focus are key parts of technical thinking, just like
//             we train at Tuwaiq Academy
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "wouter";
// import confetti from "canvas-confetti";
// import { motion } from "framer-motion";
// import { GameLogo } from "@/components/GameLogo";
// import { BigButton } from "@/components/BigButton";
// import { TimerDisplay } from "@/components/TimerDisplay";
// import { useCreateGameResult } from "@/hooks/use-game";
// import { RotateCcw, Home, Medal } from "lucide-react";

// interface LeaderboardEntry {
//   name: string;
//   bestDiff: number;
// }

// export default function Result() {
//   const [, setLocation] = useLocation();
//   const { mutate: saveResult } = useCreateGameResult();
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const queryParams = new URLSearchParams(window.location.search);
//   const timeParam = queryParams.get("time");
//   const nameParam = queryParams.get("name") || "Player";
//   const finalTime = timeParam ? parseFloat(timeParam) : 0;

//   const TARGET = 10.0;
//   const TOLERANCE = 0.35;
//   const diff = finalTime - TARGET;
//   const absDiff = Math.abs(diff);
//   const isPerfect = absDiff <= TOLERANCE;
//   const formattedDiff = (diff > 0 ? "+" : "") + diff.toFixed(2);

//   const [hasSaved, setHasSaved] = useState(false);

//   useEffect(() => {
//     if (!timeParam) {
//       setLocation("/");
//       return;
//     }

//     if (!hasSaved) {
//       // API Save
//       saveResult({
//         timeClicked: finalTime,
//         difference: parseFloat(diff.toFixed(2)),
//         isPerfect,
//         playerName: nameParam,
//       });

//       // LocalStorage Leaderboard
//       const saved = localStorage.getItem("tuwaiq_leaderboard");
//       let leaderboard: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];

//       const existingIdx = leaderboard.findIndex((e) => e.name === nameParam);
//       if (existingIdx > -1) {
//         if (absDiff < leaderboard[existingIdx].bestDiff) {
//           leaderboard[existingIdx].bestDiff = absDiff;
//         }
//       } else {
//         leaderboard.push({ name: nameParam, bestDiff: absDiff });
//       }

//       leaderboard.sort((a, b) => a.bestDiff - b.bestDiff);
//       localStorage.setItem("tuwaiq_leaderboard", JSON.stringify(leaderboard));

//       setHasSaved(true);
//     }

//     if (isPerfect) {
//       // Trigger confetti
//       const duration = 3000;
//       const end = Date.now() + duration;
//       const frame = () => {
//         confetti({
//           particleCount: 5,
//           angle: 60,
//           spread: 55,
//           origin: { x: 0 },
//           colors: ["#a855f7", "#ec4899", "#fce7f3"],
//         });
//         confetti({
//           particleCount: 5,
//           angle: 120,
//           spread: 55,
//           origin: { x: 1 },
//           colors: ["#a855f7", "#ec4899", "#fce7f3"],
//         });

//         if (Date.now() < end) requestAnimationFrame(frame);
//       };
//       frame();

//       // Play confetti/pop sound
//       try {
//         const audio = new Audio("/assets/Sound.mp3"); // ملف الصوت في public/assets
//         audio.volume = 0.5;
//         audio.play().catch(() => console.log("Audio play failed"));
//         audioRef.current = audio;
//       } catch (e) {
//         console.error("Audio setup failed", e);
//       }
//     }
//   }, [
//     finalTime,
//     isPerfect,
//     saveResult,
//     hasSaved,
//     setLocation,
//     timeParam,
//     nameParam,
//     absDiff,
//     diff,
//   ]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-white">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="w-full max-w-lg mx-auto text-center space-y-8 z-10"
//       >
//         <div className="mb-8">
//           <GameLogo size="sm" className="mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-purple-600 uppercase tracking-widest">
//             {nameParam}, {isPerfect ? "🎯 Precision Master!" : "😅 Game Over!"}
//           </h2>
//         </div>

//         <div className="relative py-4">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <TimerDisplay time={finalTime} />

//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.4, type: "spring" }}
//               className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold mt-4 shadow-sm border ${
//                 isPerfect
//                   ? "bg-green-100 text-green-700 border-green-200"
//                   : "bg-red-50 text-red-600 border-red-100"
//               }`}
//             >
//               {isPerfect ? <Medal className="w-5 h-5" /> : null}
//               {isPerfect ? "🎉 PERFECT HIT!" : `${formattedDiff}s`}
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 leading-tight">
//             {isPerfect ? (
//               <span>
//                 Congratulations! <br />
//                 Pixel Perfect Timing! 🎊
//               </span>
//             ) : (
//               "So close! Try to focus more ⏱️"
//             )}
//           </h1>

//           <p className="text-muted-foreground text-lg max-w-xs mx-auto">
//             {isPerfect
//               ? "Try again to improve your speed and accuracy! 🚀"
//               : "Focus is key to precision."}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 w-full px-4">
//           <BigButton
//             variant="secondary"
//             onClick={() => setLocation("/game")}
//             icon={<RotateCcw className="w-5 h-5" />}
//           >
//             Play Again
//           </BigButton>

//           <BigButton
//             variant="outline"
//             onClick={() => setLocation("/")}
//             icon={<Home className="w-5 h-5" />}
//           >
//             Home
//           </BigButton>
//         </div>

//         <div className="pt-12 border-t border-purple-100 mt-8">
//           <p className="text-sm text-muted-foreground italic">
//             📌 Precision and focus are key parts of technical thinking, just
//             like we train at Tuwaiq Academy
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "wouter";
// import confetti from "canvas-confetti";
// import { motion } from "framer-motion";
// import { GameLogo } from "@/components/GameLogo";
// import { BigButton } from "@/components/BigButton";
// import { TimerDisplay } from "@/components/TimerDisplay";
// import { useCreateGameResult } from "@/hooks/use-game";
// import { RotateCcw, Home, Medal, Bot } from "lucide-react";
// import { Trophy } from "lucide-react";

// interface LeaderboardEntry {
//   name: string;
//   bestDiff: number;
// }

// export default function Result() {
//   const [, setLocation] = useLocation();
//   const { mutate: saveResult } = useCreateGameResult();
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const queryParams = new URLSearchParams(window.location.search);
//   const timeParam = queryParams.get("time");
//   const nameParam = queryParams.get("name") || "Player";
//   const finalTime = timeParam ? parseFloat(timeParam) : 0;

//   const TARGET = 5.0;
//   const diff = finalTime - TARGET;
//   const absDiff = Math.abs(diff);

//   const isPerfect = absDiff === 0;
//   const isVeryClose = absDiff <= 0.35;
//   const isNormal = absDiff <= 2;

//   const [hasSaved, setHasSaved] = useState(false);

//   useEffect(() => {
//     if (!timeParam) {
//       setLocation("/");
//       return;
//     }
//     if (!hasSaved) {
//       saveResult({
//         timeClicked: finalTime,
//         difference: parseFloat(diff.toFixed(3)),
//         isPerfect: isNormal,
//         playerName: nameParam,
//       });
//       const saved = localStorage.getItem("tuwaiq_leaderboard");
//       let leaderboard: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];
//       const existingIdx = leaderboard.findIndex((e) => e.name === nameParam);
//       if (existingIdx > -1) {
//         if (absDiff < leaderboard[existingIdx].bestDiff)
//           leaderboard[existingIdx].bestDiff = absDiff;
//       } else {
//         leaderboard.push({ name: nameParam, bestDiff: absDiff });
//       }
//       leaderboard.sort((a, b) => a.bestDiff - b.bestDiff);
//       localStorage.setItem("tuwaiq_leaderboard", JSON.stringify(leaderboard));
//       setHasSaved(true);
//     }

//     if (isNormal) {
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: ["#a855f7", "#ec4899"],
//       });
//       try {
//         const audio = new Audio("/assets/Sound.mp3");
//         audio.volume = 0.5;
//         audio.play().catch(() => {});
//         audioRef.current = audio;
//       } catch (e) {}
//     }
//   }, [
//     finalTime,
//     isNormal,
//     saveResult,
//     hasSaved,
//     setLocation,
//     timeParam,
//     nameParam,
//     absDiff,
//     diff,
//   ]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-white">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="w-full max-w-lg mx-auto text-center space-y-8 z-10"
//       >
//         <div className="mb-8">
//           <GameLogo size="sm" className="mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-purple-600 uppercase tracking-widest">
//             {nameParam}, {isNormal ? "🎯 Precision Master!" : "😅 Game Over!"}
//           </h2>
//         </div>

//         <div className="relative py-4">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <TimerDisplay time={finalTime} />
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.4, type: "spring" }}
//               className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold mt-4 shadow-sm border ${
//                 isNormal
//                   ? "bg-green-100 text-green-700 border-green-200"
//                   : "bg-red-50 text-red-600 border-red-100"
//               }`}
//             >
//               {isPerfect ? (
//                 <Bot className="w-5 h-5" />
//               ) : isNormal ? (
//                 <Medal className="w-5 h-5" />
//               ) : null}
//               {isPerfect
//                 ? "PERFECT ROBOT!🎉"
//                 : isVeryClose
//                   ? "So Close!"
//                   : `${(diff > 0 ? "+" : "") + diff.toFixed(4)}s`}
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 leading-tight">
//             {isPerfect
//               ? "LEGENDARY TIMING! 🎊\nSomeone give this player a medal!!"
//               : isVeryClose
//                 ? "Oof, that was close… but no"
//                 : isNormal
//                   ? "Expected.."
//                   : absDiff > 4.0
//                     ? "Bro… it said 10"
//                     : "That was just bad!"}
//           </h1>

//           <p className="text-muted-foreground text-lg max-w-xs mx-auto italic">
//             {isPerfect
//               ? "Finally, someone who can count!"
//               : isVeryClose
//                 ? "Skill stopped at the finish line ..."
//                 : isNormal
//                   ? "Let’s pretend that didn’t happen..."
//                   : absDiff > 4.0
//                     ? "Yeah… that explains a lot.."
//                     : "Next time, use your eyes"}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 w-full px-4">
//           <BigButton
//             variant="secondary"
//             onClick={() => setLocation("/game")}
//             icon={<RotateCcw className="w-5 h-5" />}
//           >
//             Play Again
//           </BigButton>
//           <BigButton
//             variant="outline"
//             onClick={() => setLocation("/")}
//             icon={<Trophy className="w-5 h-5 text-yellow-500" />}
//           >
//             Leaderboard
//           </BigButton>
//         </div>

//         <div className="pt-12 border-t border-purple-100 mt-8">
//           <p className="text-sm text-muted-foreground italic">
//             📌 Developed by Salma Alharbi
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { GameLogo } from "@/components/GameLogo";
import { BigButton } from "@/components/BigButton";
import { TimerDisplay } from "@/components/TimerDisplay";
import { useCreateGameResult } from "@/hooks/use-game";
import { RotateCcw, Home, Medal, Bot, Trophy } from "lucide-react";

interface LeaderboardEntry {
  name: string;
  bestDiff: number;
}

export default function Result() {
  const [, setLocation] = useLocation();
  const { mutate: saveResult } = useCreateGameResult();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const queryParams = new URLSearchParams(window.location.search);
  const timeParam = queryParams.get("time");
  const nameParam = queryParams.get("name") || "Player";
  const finalTime = timeParam ? parseFloat(timeParam) : 0;

  const TARGET = 5.0;
  const diff = finalTime - TARGET;
  const absDiff = Math.abs(diff);

  const isPerfect = absDiff === 0;
  const isVeryClose = absDiff <= 0.35;
  const isNormal = absDiff <= 2;

  const [hasSaved, setHasSaved] = useState(false);
  useEffect(() => {
    if (!timeParam) {
      setLocation("/");
      return;
    }
    if (!hasSaved) {
      saveResult({
        timeClicked: finalTime,
        difference: parseFloat(diff.toFixed(3)),
        isPerfect: isNormal,
        playerName: nameParam,
      });
      const saved = localStorage.getItem("tuwaiq_leaderboard");
      let leaderboard: LeaderboardEntry[] = saved ? JSON.parse(saved) : [];
      const existingIdx = leaderboard.findIndex((e) => e.name === nameParam);
      if (existingIdx > -1) {
        if (absDiff < leaderboard[existingIdx].bestDiff)
          leaderboard[existingIdx].bestDiff = absDiff;
      } else {
        leaderboard.push({ name: nameParam, bestDiff: absDiff });
      }
      leaderboard.sort((a, b) => a.bestDiff - b.bestDiff);
      localStorage.setItem("tuwaiq_leaderboard", JSON.stringify(leaderboard));
      setHasSaved(true);
    }

    if (isPerfect) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#ffd700"],
      });

      try {
        const audio = new Audio("/assets/Sound.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => {});
        audioRef.current = audio;
      } catch (e) {}
    }
  }, [
    finalTime,
    isNormal,
    isPerfect,
    saveResult,
    hasSaved,
    setLocation,
    timeParam,
    nameParam,
    absDiff,
    diff,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg mx-auto text-center space-y-8 z-10"
      >
        <div className="mb-8">
          <GameLogo size="sm" className="mx-auto mb-4" />
          <h2 className="text-xl font-bold text-purple-600 uppercase tracking-widest">
            {nameParam}, {isNormal ? "is Master! 🎯" : " is Beginner 😅"}
          </h2>
        </div>

        <div className="relative py-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TimerDisplay time={finalTime} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold mt-4 shadow-sm border ${
                isNormal
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-50 text-red-600 border-red-100"
              }`}
            >
              {isPerfect ? (
                <Bot className="w-5 h-5" />
              ) : isNormal ? (
                <Medal className="w-5 h-5" />
              ) : null}
              {isPerfect
                ? "PERFECT ROBOT!🎉"
                : isVeryClose
                  ? "So Close!"
                  : `${(diff > 0 ? "+" : "") + diff.toFixed(4)}s`}
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 leading-tight">
            {isPerfect
              ? "LEGENDARY TIMING! 🎊\nSomeone give this player a medal!!"
              : isVeryClose
                ? "Oof, that was close… but no"
                : isNormal
                  ? "Expected.."
                  : absDiff > 4.0
                    ? "Bro… it said 10"
                    : "That was just bad!"}
          </h1>

          <p className="text-muted-foreground text-lg max-w-xs mx-auto italic">
            {isPerfect
              ? "Finally, someone who can count!"
              : isVeryClose
                ? "Skill stopped at the finish line ..."
                : isNormal
                  ? "Let’s pretend that didn’t happen..."
                  : absDiff > 4.0
                    ? "Yeah… that explains a lot.."
                    : "Next time, use your eyes"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 w-full px-4">
          <BigButton
            variant="secondary"
            onClick={() => setLocation("/game")}
            icon={<RotateCcw className="w-5 h-5" />}
          >
            Play Again
          </BigButton>
          <BigButton
            variant="outline"
            onClick={() => setLocation("/")}
            icon={<Trophy className="w-5 h-5 text-yellow-500" />}
          >
            Leaderboard
          </BigButton>
        </div>

        <div className="pt-12 border-t border-purple-100 mt-8">
          <p className="text-sm text-muted-foreground italic">
            Developed by Salma Alharbi
          </p>
        </div>
      </motion.div>
    </div>
  );
}
