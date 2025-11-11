import { GuildMember, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  name: "guildMemberAdd",
  async execute(member: GuildMember) {
    try {
      const settings = await storage.getGuildSettings(member.guild.id);
      
      if (!settings) return;

      if (settings.autoRoleEnabled && settings.autoRoleId) {
        try {
          const role = member.guild.roles.cache.get(settings.autoRoleId);
          if (role) {
            await member.roles.add(role);
            console.log(`✅ ${member.user.tag} kullanıcısına otomatik rol verildi: ${role.name}`);
          }
        } catch (error) {
          console.error("Otomatik rol verme hatası:", error);
        }
      }

      if (settings.welcomeEnabled && settings.welcomeMessage && settings.welcomeChannelId) {
        try {
          const channel = member.guild.channels.cache.get(settings.welcomeChannelId);
          
          if (channel && channel.isTextBased()) {
            const welcomeMessage = settings.welcomeMessage
              .replace("{user}", member.user.toString())
              .replace("{username}", member.user.username)
              .replace("{server}", member.guild.name);

            const embed = new EmbedBuilder()
              .setColor("#5865F2")
              .setTitle("Hoş Geldin! 👋")
              .setDescription(welcomeMessage)
              .setThumbnail(member.user.displayAvatarURL())
              .setFooter({ text: `Üye #${member.guild.memberCount}` })
              .setTimestamp();

            await channel.send({ embeds: [embed] });
            console.log(`✅ ${member.user.tag} için karşılama mesajı gönderildi`);
          }
        } catch (error) {
          console.error("Karşılama mesajı gönderme hatası:", error);
        }
      }
    } catch (error) {
      console.error("guildMemberAdd event hatası:", error);
    }
  },
};
