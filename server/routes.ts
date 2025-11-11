import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertGuildSettingsSchema, insertButtonMessageSchema, insertReactionRoleSchema } from "@shared/schema";

// Discord bot imports - will be loaded dynamically when bot is initialized
let client: any = null;
let EmbedBuilder: any, TextChannel: any, ActionRowBuilder: any, ButtonBuilder: any, ButtonStyle: any;

try {
  const discord = await import("discord.js");
  EmbedBuilder = discord.EmbedBuilder;
  TextChannel = discord.TextChannel;
  ActionRowBuilder = discord.ActionRowBuilder;
  ButtonBuilder = discord.ButtonBuilder;
  ButtonStyle = discord.ButtonStyle;
} catch (error) {
  console.log("Discord.js not loaded");
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/settings/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      let settings = await storage.getGuildSettings(guildId);
      
      if (!settings) {
        settings = await storage.upsertGuildSettings({
          guildId,
          prefix: "!",
          welcomeEnabled: false,
          welcomeMessage: null,
          welcomeChannelId: null,
          autoRoleEnabled: false,
          autoRoleId: null,
          logChannelId: null,
          antiAdEnabled: false,
          antiSpamEnabled: false,
          profanityFilterEnabled: false,
        });
      }
      
      res.json(settings);
    } catch (error) {
      console.error("Get settings error:", error);
      res.status(500).json({ message: "Ayarlar alınırken hata oluştu" });
    }
  });

  app.put("/api/settings/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const validatedData = insertGuildSettingsSchema.parse({
        ...req.body,
        guildId,
      });
      
      const settings = await storage.upsertGuildSettings(validatedData);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        console.error("Update settings error:", error);
        res.status(500).json({ message: "Ayarlar kaydedilirken hata oluştu" });
      }
    }
  });

  app.get("/api/messages/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const messages = await storage.getButtonMessages(guildId);
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ message: "Mesajlar alınırken hata oluştu" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertButtonMessageSchema.parse(req.body);
      
      if (!client.isReady()) {
        return res.status(503).json({ message: "Discord botu çevrimdışı" });
      }

      const guild = client.guilds.cache.get(validatedData.guildId);
      if (!guild) {
        return res.status(404).json({ message: "Sunucu bulunamadı" });
      }

      const channel = guild.channels.cache.get(validatedData.channelId);
      if (!channel || !channel.isTextBased()) {
        return res.status(404).json({ message: "Kanal bulunamadı" });
      }

      const embed = new EmbedBuilder()
        .setColor(validatedData.color as `#${string}`)
        .setTitle(validatedData.title)
        .setDescription(validatedData.description)
        .setTimestamp();

      const rows: ActionRowBuilder<ButtonBuilder>[] = [];
      let currentRow = new ActionRowBuilder<ButtonBuilder>();
      
      (validatedData.buttons as Array<{id: string; label: string; type: "role" | "dm" | "link"; value: string}>).forEach((button, index) => {
        let style = ButtonStyle.Primary;
        let customId = "";
        let url: string | undefined;

        if (button.type === "role") {
          style = ButtonStyle.Success;
          customId = `role:${button.value}`;
        } else if (button.type === "dm") {
          style = ButtonStyle.Secondary;
          const encodedMessage = Buffer.from(button.value).toString("base64");
          customId = `dm:${encodedMessage}`;
        } else if (button.type === "link") {
          style = ButtonStyle.Link;
          url = button.value;
        }

        const btnBuilder = new ButtonBuilder()
          .setLabel(button.label)
          .setStyle(style);

        if (url) {
          btnBuilder.setURL(url);
        } else {
          btnBuilder.setCustomId(customId);
        }

        currentRow.addComponents(btnBuilder);

        if ((index + 1) % 5 === 0 || index === validatedData.buttons.length - 1) {
          rows.push(currentRow);
          currentRow = new ActionRowBuilder<ButtonBuilder>();
        }
      });

      const sentMessage = await (channel as TextChannel).send({
        embeds: [embed],
        components: rows,
      });

      const messageData: any = {
        ...validatedData,
        messageId: sentMessage.id,
      };
      const savedMessage = await storage.createButtonMessage(messageData);

      res.json(savedMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        console.error("Create message error:", error);
        res.status(500).json({ message: "Mesaj gönderilirken hata oluştu" });
      }
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteButtonMessage(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete message error:", error);
      res.status(500).json({ message: "Mesaj silinirken hata oluştu" });
    }
  });

  app.get("/api/commands/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const commands = await storage.getCommands(guildId);
      res.json(commands);
    } catch (error) {
      console.error("Get commands error:", error);
      res.status(500).json({ message: "Komutlar alınırken hata oluştu" });
    }
  });

  app.put("/api/commands/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const { enabled } = req.body;
      
      if (typeof enabled !== "boolean") {
        return res.status(400).json({ message: "Geçersiz veri" });
      }
      
      await storage.toggleCommand(id, enabled);
      res.json({ success: true });
    } catch (error) {
      console.error("Toggle command error:", error);
      res.status(500).json({ message: "Komut durumu değiştirilirken hata oluştu" });
    }
  });

  app.get("/api/logs/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getModerationLogs(guildId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Get logs error:", error);
      res.status(500).json({ message: "Loglar alınırken hata oluştu" });
    }
  });

  app.get("/api/reaction-roles/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const reactionRoles = await storage.getReactionRoles(guildId);
      res.json(reactionRoles);
    } catch (error) {
      console.error("Get reaction roles error:", error);
      res.status(500).json({ message: "Reaksiyon rolleri alınırken hata oluştu" });
    }
  });

  app.post("/api/reaction-roles", async (req, res) => {
    try {
      const validatedData = insertReactionRoleSchema.parse(req.body);
      
      if (!client.isReady()) {
        return res.status(503).json({ message: "Discord botu çevrimdışı" });
      }

      const guild = client.guilds.cache.get(validatedData.guildId);
      if (!guild) {
        return res.status(404).json({ message: "Sunucu bulunamadı" });
      }

      const channel = guild.channels.cache.get(validatedData.channelId);
      if (!channel || !channel.isTextBased()) {
        return res.status(404).json({ message: "Kanal bulunamadı" });
      }

      const existingRoles = await storage.getReactionRoles(validatedData.guildId);
      
      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle("Rollerini Seç")
        .setDescription("Aşağıdaki emojilere tıklayarak rollerini alabilirsin!")
        .setTimestamp();

      [...existingRoles, validatedData].forEach((rr) => {
        embed.addFields({
          name: rr.emoji,
          value: rr.roleName,
          inline: true,
        });
      });

      const sentMessage = await (channel as TextChannel).send({ embeds: [embed] });

      for (const rr of [...existingRoles, validatedData]) {
        try {
          await sentMessage.react(rr.emoji);
        } catch (error) {
          console.error("React error:", error);
        }
      }

      const roleData: any = {
        ...validatedData,
        messageId: sentMessage.id,
      };
      const savedRole = await storage.createReactionRole(roleData);

      res.json(savedRole);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Geçersiz veri", errors: error.errors });
      } else {
        console.error("Create reaction role error:", error);
        res.status(500).json({ message: "Reaksiyon rolü oluşturulurken hata oluştu" });
      }
    }
  });

  app.delete("/api/reaction-roles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteReactionRole(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete reaction role error:", error);
      res.status(500).json({ message: "Reaksiyon rolü silinirken hata oluştu" });
    }
  });

  app.get("/api/bot-status", async (req, res) => {
    try {
      if (!client.isReady()) {
        return res.json({
          online: false,
          guilds: 0,
          users: 0,
          uptime: 0,
        });
      }

      res.json({
        online: true,
        guilds: client.guilds.cache.size,
        users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
        uptime: client.uptime || 0,
        tag: client.user?.tag || "Unknown",
      });
    } catch (error) {
      console.error("Bot status error:", error);
      res.status(500).json({ message: "Bot durumu alınırken hata oluştu" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
