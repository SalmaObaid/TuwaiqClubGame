import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameResults = pgTable("game_results", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").default("Player"),
  timeClicked: doublePrecision("time_clicked").notNull(), // The time they clicked (e.g. 10.05)
  difference: doublePrecision("difference").notNull(), // Difference from 10.00
  isPerfect: boolean("is_perfect").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGameResultSchema = createInsertSchema(gameResults).omit({ 
  id: true, 
  createdAt: true 
});

export type GameResult = typeof gameResults.$inferSelect;
export type InsertGameResult = z.infer<typeof insertGameResultSchema>;
