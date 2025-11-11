import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { storage } from "../../server/storage";

export default {
  data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Bot ayarlarını gösterir")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      await interaction.reply({ content: "Bu komut sadece sunucularda kullanılabilir!", ephemeral: true });
      return;
    }

    try {
      let settings = await storage.getGuildSettings(interaction.guild.id);
      
      if (!settings) {
        settings = await storage.upsertGuildSettings({
          guildId: interaction.guild.id,
          prefix: "!",
          welcomeEnabled: false,
          welcomeMessage: null,
          welcomeChannelId: null,
          autoRoleEnabled: false,
          autoRoleId: null,
          logChannelId: null,
          antiAdEnabled: false,
          antiSpamEnabled: false,
          profanityFilterEnabled: false,
        });
      }

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle("🔧 Bot Ayarları")
        .setDescription("Mammoth bot ayarları - Web panelinden düzenleyebilirsiniz")
        .addFields(
          { name: "Komut Öneki", value: settings.prefix, inline: true },
          { name: "Karşılama Mesajı", value: settings.welcomeEnabled ? "✅ Aktif" : "❌ Pasif", inline: true },
          { name: "Otomatik Rol", value: settings.autoRoleEnabled ? "✅ Aktif" : "❌ Pasif", inline: true },
          { name: "Reklam Engelleme", value: settings.antiAdEnabled ? "✅ Aktif" : "❌ Pasif", inline: true },
          { name: "Spam Koruması", value: settings.antiSpamEnabled ? "✅ Aktif" : "❌ Pasif", inline: true },
          { name: "Küfür Filtresi", value: settings.profanityFilterEnabled ? "✅ Aktif" : "❌ Pasif", inline: true }
        )
        .setFooter({ text: "Detaylı ayarlar için web panelini kullanın" })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Ayarlar komutu hatası:", error);
      await interaction.reply({ content: "Ayarlar gösterilirken bir hata oluştu!", ephemeral: true });
    }
  },
};
