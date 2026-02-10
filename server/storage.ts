import { db } from "./db";
import {
  gameResults,
  type InsertGameResult,
  type GameResult
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createGameResult(result: InsertGameResult): Promise<GameResult>;
  getLatestResults(limit?: number): Promise<GameResult[]>;
}

export class DatabaseStorage implements IStorage {
  async createGameResult(result: InsertGameResult): Promise<GameResult> {
    const [newResult] = await db.insert(gameResults).values(result).returning();
    return newResult;
  }

  async getLatestResults(limit = 10): Promise<GameResult[]> {
    return await db.select()
      .from(gameResults)
      .orderBy(desc(gameResults.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
