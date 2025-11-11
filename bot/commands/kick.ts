import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Bir kullanıcıyı sunucudan atar")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Atılacak kullanıcı")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Atma sebebi")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı", true);
    const reason = interaction.options.getString("sebep") || "Sebep belirtilmedi";

    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      
      if (!member.kickable) {
        await interaction.reply({ content: "Bu kullanıcıyı atamam!", ephemeral: true });
        return;
      }

      await member.kick(reason);

      await storage.createModerationLog({
        guildId: interaction.guild.id,
        type: "kick",
        userId: user.id,
        username: user.tag,
        moderatorId: interaction.user.id,
        moderatorName: interaction.user.tag,
        reason,
      });

      const embed = new EmbedBuilder()
        .setColor("#FEE75C")
        .setTitle("Kullanıcı Atıldı")
        .setDescription(`**${user.tag}** atıldı`)
        .addFields({ name: "Sebep", value: reason })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Kick komutu hatası:", error);
      await interaction.reply({ content: "Kullanıcı atılırken bir hata oluştu!", ephemeral: true });
    }
  },
};
