import { MessageReaction, User, PartialMessageReaction, PartialUser } from "discord.js";
import { storage } from "../../server/storage";

export default {
  name: "messageReactionRemove",
  async execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Reaksiyon fetch hatası:", error);
        return;
      }
    }

    try {
      const reactionRoles = await storage.getReactionRoles(reaction.message.guildId!);
      
      const matchingRole = reactionRoles.find(
        (rr) =>
          rr.messageId === reaction.message.id &&
          rr.emoji === reaction.emoji.toString()
      );

      if (matchingRole) {
        const member = await reaction.message.guild?.members.fetch(user.id);
        if (member) {
          const role = reaction.message.guild?.roles.cache.get(matchingRole.roleId);
          if (role) {
            await member.roles.remove(role);
            console.log(`✅ ${user.tag} kullanıcısından ${role.name} rolü kaldırıldı (emoji: ${reaction.emoji})`);
          }
        }
      }
    } catch (error) {
      console.error("Reaction role kaldırma hatası:", error);
    }
  },
};
