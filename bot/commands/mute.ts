import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Bir kullanıcıyı susturur")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Susturulacak kullanıcı")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("süre")
        .setDescription("Susturma süresi (dakika)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(40320)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Susturma sebebi")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı", true);
    const duration = interaction.options.getInteger("süre", true);
    const reason = interaction.options.getString("sebep") || "Sebep belirtilmedi";

    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      
      if (!member.moderatable) {
        await interaction.reply({ content: "Bu kullanıcıyı susturamam!", ephemeral: true });
        return;
      }

      await member.timeout(duration * 60 * 1000, reason);

      await storage.createModerationLog({
        guildId: interaction.guild.id,
        type: "mute",
        userId: user.id,
        username: user.tag,
        moderatorId: interaction.user.id,
        moderatorName: interaction.user.tag,
        reason: `${reason} (${duration} dakika)`,
      });

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle("Kullanıcı Susturuldu")
        .setDescription(`**${user.tag}** susturuldu`)
        .addFields(
          { name: "Süre", value: `${duration} dakika`, inline: true },
          { name: "Sebep", value: reason, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Mute komutu hatası:", error);
      await interaction.reply({ content: "Kullanıcı susturulurken bir hata oluştu!", ephemeral: true });
    }
  },
};
