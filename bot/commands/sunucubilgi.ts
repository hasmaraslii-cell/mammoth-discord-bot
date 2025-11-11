import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("sunucubilgi")
    .setDescription("Sunucu hakkında bilgi gösterir"),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    const guild = interaction.guild;
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL() || "")
      .addFields(
        { name: "Sunucu ID", value: guild.id, inline: true },
        { name: "Sahip", value: owner.user.tag, inline: true },
        { name: "Üye Sayısı", value: guild.memberCount.toString(), inline: true },
        { name: "Kanal Sayısı", value: guild.channels.cache.size.toString(), inline: true },
        { name: "Rol Sayısı", value: guild.roles.cache.size.toString(), inline: true },
        { name: "Oluşturulma Tarihi", value: guild.createdAt.toLocaleDateString("tr-TR"), inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
