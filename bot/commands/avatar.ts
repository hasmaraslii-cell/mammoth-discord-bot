import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Bir kullanıcının avatarını gösterir")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Avatarı gösterilecek kullanıcı")
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı") || interaction.user;
    
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle(`${user.username} - Avatar`)
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
