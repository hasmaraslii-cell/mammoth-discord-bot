import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const guildSettings = pgTable("guild_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull().unique(),
  prefix: text("prefix").notNull().default("!"),
  welcomeEnabled: boolean("welcome_enabled").notNull().default(false),
  welcomeMessage: text("welcome_message"),
  welcomeChannelId: text("welcome_channel_id"),
  autoRoleEnabled: boolean("auto_role_enabled").notNull().default(false),
  autoRoleId: text("auto_role_id"),
  logChannelId: text("log_channel_id"),
  antiAdEnabled: boolean("anti_ad_enabled").notNull().default(false),
  antiSpamEnabled: boolean("anti_spam_enabled").notNull().default(false),
  profanityFilterEnabled: boolean("profanity_filter_enabled").notNull().default(false),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const buttonMessages = pgTable("button_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  channelId: text("channel_id").notNull(),
  messageId: text("message_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull().default("#5865F2"),
  buttons: jsonb("buttons").notNull().$type<Array<{
    id: string;
    label: string;
    type: "role" | "dm" | "link";
    value: string;
  }>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const commands = pgTable("commands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  isCustom: boolean("is_custom").notNull().default(false),
  customResponse: text("custom_response"),
});

export const moderationLogs = pgTable("moderation_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  type: text("type").notNull(),
  userId: text("user_id").notNull(),
  username: text("username").notNull(),
  moderatorId: text("moderator_id"),
  moderatorName: text("moderator_name"),
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reactionRoles = pgTable("reaction_roles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guildId: text("guild_id").notNull(),
  channelId: text("channel_id").notNull(),
  messageId: text("message_id"),
  emoji: text("emoji").notNull(),
  roleId: text("role_id").notNull(),
  roleName: text("role_name").notNull(),
});

export const insertGuildSettingsSchema = createInsertSchema(guildSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertButtonMessageSchema = createInsertSchema(buttonMessages).omit({
  id: true,
  messageId: true,
  createdAt: true,
});

export const insertCommandSchema = createInsertSchema(commands).omit({
  id: true,
});

export const insertModerationLogSchema = createInsertSchema(moderationLogs).omit({
  id: true,
  createdAt: true,
});

export const insertReactionRoleSchema = createInsertSchema(reactionRoles).omit({
  id: true,
  messageId: true,
});

export type GuildSettings = typeof guildSettings.$inferSelect;
export type InsertGuildSettings = z.infer<typeof insertGuildSettingsSchema>;

export type ButtonMessage = typeof buttonMessages.$inferSelect;
export type InsertButtonMessage = z.infer<typeof insertButtonMessageSchema>;

export type Command = typeof commands.$inferSelect;
export type InsertCommand = z.infer<typeof insertCommandSchema>;

export type ModerationLog = typeof moderationLogs.$inferSelect;
export type InsertModerationLog = z.infer<typeof insertModerationLogSchema>;

export type ReactionRole = typeof reactionRoles.$inferSelect;
export type InsertReactionRole = z.infer<typeof insertReactionRoleSchema>;
