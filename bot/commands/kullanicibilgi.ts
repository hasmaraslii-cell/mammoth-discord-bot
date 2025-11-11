import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kullanicibilgi")
    .setDescription("Bir kullanıcı hakkında bilgi gösterir")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Bilgisi gösterilecek kullanıcı")
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı") || interaction.user;

    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    const member = await interaction.guild.members.fetch(user.id);
    
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle(`${user.username} - Kullanıcı Bilgisi`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Kullanıcı Adı", value: user.tag, inline: true },
        { name: "ID", value: user.id, inline: true },
        { name: "Sunucuya Katılma", value: member.joinedAt?.toLocaleDateString("tr-TR") || "Bilinmiyor", inline: true },
        { name: "Hesap Oluşturma", value: user.createdAt.toLocaleDateString("tr-TR"), inline: true },
        { name: "Roller", value: member.roles.cache.filter(r => r.id !== interaction.guild!.id).map(r => r.name).join(", ") || "Rol yok", inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
