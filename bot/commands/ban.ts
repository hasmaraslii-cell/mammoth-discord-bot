import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bir kullanıcıyı sunucudan yasaklar")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Yasaklanacak kullanıcı")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Yasaklama sebebi")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı", true);
    const reason = interaction.options.getString("sebep") || "Sebep belirtilmedi";

    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      
      if (!member.bannable) {
        await interaction.reply({ content: "Bu kullanıcıyı yasaklayamam!", ephemeral: true });
        return;
      }

      await member.ban({ reason });

      await storage.createModerationLog({
        guildId: interaction.guild.id,
        type: "ban",
        userId: user.id,
        username: user.tag,
        moderatorId: interaction.user.id,
        moderatorName: interaction.user.tag,
        reason,
      });

      const embed = new EmbedBuilder()
        .setColor("#ED4245")
        .setTitle("Kullanıcı Yasaklandı")
        .setDescription(`**${user.tag}** yasaklandı`)
        .addFields({ name: "Sebep", value: reason })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Ban komutu hatası:", error);
      await interaction.reply({ content: "Kullanıcı yasaklanırken bir hata oluştu!", ephemeral: true });
    }
  },
};
