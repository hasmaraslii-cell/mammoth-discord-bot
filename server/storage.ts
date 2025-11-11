import {
  type GuildSettings,
  type InsertGuildSettings,
  type ButtonMessage,
  type InsertButtonMessage,
  type Command,
  type InsertCommand,
  type ModerationLog,
  type InsertModerationLog,
  type ReactionRole,
  type InsertReactionRole,
  guildSettings,
  buttonMessages,
  commands,
  moderationLogs,
  reactionRoles,
} from "@shared/schema";
import { db } from "db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getGuildSettings(guildId: string): Promise<GuildSettings | undefined>;
  upsertGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings>;
  
  getButtonMessages(guildId: string): Promise<ButtonMessage[]>;
  createButtonMessage(message: InsertButtonMessage): Promise<ButtonMessage>;
  deleteButtonMessage(id: string): Promise<void>;
  
  getCommands(guildId: string): Promise<Command[]>;
  upsertCommand(command: InsertCommand): Promise<Command>;
  toggleCommand(id: string, enabled: boolean): Promise<void>;
  
  getModerationLogs(guildId: string, limit?: number): Promise<ModerationLog[]>;
  createModerationLog(log: InsertModerationLog): Promise<ModerationLog>;
  
  getReactionRoles(guildId: string): Promise<ReactionRole[]>;
  createReactionRole(role: InsertReactionRole): Promise<ReactionRole>;
  deleteReactionRole(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getGuildSettings(guildId: string): Promise<GuildSettings | undefined> {
    const [settings] = await db
      .select()
      .from(guildSettings)
      .where(eq(guildSettings.guildId, guildId))
      .limit(1);
    return settings;
  }

  async upsertGuildSettings(settings: InsertGuildSettings): Promise<GuildSettings> {
    const [updated] = await db
      .insert(guildSettings)
      .values(settings)
      .onConflictDoUpdate({
        target: guildSettings.guildId,
        set: { ...settings, updatedAt: new Date() },
      })
      .returning();
    return updated;
  }

  async getButtonMessages(guildId: string): Promise<ButtonMessage[]> {
    return db
      .select()
      .from(buttonMessages)
      .where(eq(buttonMessages.guildId, guildId))
      .orderBy(desc(buttonMessages.createdAt));
  }

  async createButtonMessage(message: InsertButtonMessage): Promise<ButtonMessage> {
    const [created] = await db.insert(buttonMessages).values(message).returning();
    return created;
  }

  async deleteButtonMessage(id: string): Promise<void> {
    await db.delete(buttonMessages).where(eq(buttonMessages.id, id));
  }

  async getCommands(guildId: string): Promise<Command[]> {
    return db
      .select()
      .from(commands)
      .where(eq(commands.guildId, guildId));
  }

  async upsertCommand(command: InsertCommand): Promise<Command> {
    const existing = await db
      .select()
      .from(commands)
      .where(and(eq(commands.guildId, command.guildId), eq(commands.name, command.name)))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(commands)
        .set(command)
        .where(eq(commands.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(commands).values(command).returning();
      return created;
    }
  }

  async toggleCommand(id: string, enabled: boolean): Promise<void> {
    await db.update(commands).set({ enabled }).where(eq(commands.id, id));
  }

  async getModerationLogs(guildId: string, limit: number = 50): Promise<ModerationLog[]> {
    return db
      .select()
      .from(moderationLogs)
      .where(eq(moderationLogs.guildId, guildId))
      .orderBy(desc(moderationLogs.createdAt))
      .limit(limit);
  }

  async createModerationLog(log: InsertModerationLog): Promise<ModerationLog> {
    const [created] = await db.insert(moderationLogs).values(log).returning();
    return created;
  }

  async getReactionRoles(guildId: string): Promise<ReactionRole[]> {
    return db
      .select()
      .from(reactionRoles)
      .where(eq(reactionRoles.guildId, guildId));
  }

  async createReactionRole(role: InsertReactionRole): Promise<ReactionRole> {
    const [created] = await db.insert(reactionRoles).values(role).returning();
    return created;
  }

  async deleteReactionRole(id: string): Promise<void> {
    await db.delete(reactionRoles).where(eq(reactionRoles.id, id));
  }
}

export const storage = new DatabaseStorage();
