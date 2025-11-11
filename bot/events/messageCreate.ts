import { Message } from "discord.js";
import { storage } from "../../server/storage";

const spamTracker = new Map<string, { count: number; timestamp: number }>();
const SPAM_THRESHOLD = 5;
const SPAM_WINDOW = 5000;

export default {
  name: "messageCreate",
  async execute(message: Message) {
    if (message.author.bot || !message.guild) return;

    try {
      const settings = await storage.getGuildSettings(message.guild.id);
      if (!settings) return;

      if (settings.antiAdEnabled) {
        const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+/gi;
        if (inviteRegex.test(message.content)) {
          await message.delete();
          if (message.channel.isSendable()) {
            await message.channel.send(
              `${message.author}, reklam yapmak yasaktır!`
            );
          }
          
          await storage.createModerationLog({
            guildId: message.guild.id,
            type: "auto_delete",
            userId: message.author.id,
            username: message.author.tag,
            moderatorId: null,
            moderatorName: null,
            reason: "Otomatik reklam engelleme",
          });
          
          return;
        }
      }

      if (settings.antiSpamEnabled) {
        const userId = message.author.id;
        const now = Date.now();
        const userSpam = spamTracker.get(userId);

        if (userSpam && now - userSpam.timestamp < SPAM_WINDOW) {
          userSpam.count++;
          
          if (userSpam.count >= SPAM_THRESHOLD) {
            try {
              const member = await message.guild.members.fetch(userId);
              await member.timeout(5 * 60 * 1000, "Otomatik spam koruması");
              if (message.channel.isSendable()) {
                await message.channel.send(
                  `${message.author} spam yaptığı için 5 dakika susturuldu.`
                );
              }
              
              await storage.createModerationLog({
                guildId: message.guild.id,
                type: "mute",
                userId: message.author.id,
                username: message.author.tag,
                moderatorId: null,
                moderatorName: null,
                reason: "Otomatik spam koruması",
              });
              
              spamTracker.delete(userId);
            } catch (error) {
              console.error("Spam timeout hatası:", error);
            }
          }
        } else {
          spamTracker.set(userId, { count: 1, timestamp: now });
        }

        setTimeout(() => {
          const current = spamTracker.get(userId);
          if (current && now === current.timestamp) {
            spamTracker.delete(userId);
          }
        }, SPAM_WINDOW);
      }
    } catch (error) {
      console.error("messageCreate event hatası:", error);
    }
  },
};
