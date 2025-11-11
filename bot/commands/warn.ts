import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Bir kullanıcıyı uyarır")
    .addUserOption((option) =>
      option
        .setName("kullanıcı")
        .setDescription("Uyarılacak kullanıcı")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Uyarı sebebi")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("kullanıcı", true);
    const reason = interaction.options.getString("sebep", true);

    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    try {
      await storage.createModerationLog({
        guildId: interaction.guild.id,
        type: "warn",
        userId: user.id,
        username: user.tag,
        moderatorId: interaction.user.id,
        moderatorName: interaction.user.tag,
        reason,
      });

      const embed = new EmbedBuilder()
        .setColor("#FEE75C")
        .setTitle("Kullanıcı Uyarıldı")
        .setDescription(`**${user.tag}** uyarıldı`)
        .addFields({ name: "Sebep", value: reason })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      try {
        await user.send({
          embeds: [
            new EmbedBuilder()
              .setColor("#FEE75C")
              .setTitle(`${interaction.guild.name} - Uyarı`)
              .setDescription(`Bir yetkili tarafından uyarıldınız!`)
              .addFields({ name: "Sebep", value: reason })
              .setTimestamp(),
          ],
        });
      } catch (error) {
        console.log("Kullanıcıya DM gönderilemedi");
      }
    } catch (error) {
      console.error("Warn komutu hatası:", error);
      await interaction.reply({ content: "Kullanıcı uyarılırken bir hata oluştu!", ephemeral: true });
    }
  },
};
