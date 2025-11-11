import { ButtonInteraction, EmbedBuilder } from "discord.js";

export async function handleButtonInteraction(interaction: ButtonInteraction) {
  try {
    const [action, value] = interaction.customId.split(":");

    switch (action) {
      case "role":
        await handleRoleButton(interaction, value);
        break;
      case "dm":
        await handleDMButton(interaction, value);
        break;
      case "link":
        await handleLinkButton(interaction, value);
        break;
      default:
        await interaction.reply({
          content: "Bilinmeyen buton işlemi!",
          ephemeral: true,
        });
    }
  } catch (error) {
    console.error("Buton işleme hatası:", error);
    
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Buton işlenirken bir hata oluştu!",
        ephemeral: true,
      });
    }
  }
}

async function handleRoleButton(interaction: ButtonInteraction, roleId: string) {
  if (!interaction.guild) {
    await interaction.reply({
      content: "Bu buton sadece sunucularda kullanılabilir!",
      ephemeral: true,
    });
    return;
  }

  const member = await interaction.guild.members.fetch(interaction.user.id);
  const role = interaction.guild.roles.cache.get(roleId);

  if (!role) {
    await interaction.reply({
      content: "Rol bulunamadı!",
      ephemeral: true,
    });
    return;
  }

  if (member.roles.cache.has(roleId)) {
    await member.roles.remove(role);
    await interaction.reply({
      content: `${role.name} rolü kaldırıldı!`,
      ephemeral: true,
    });
  } else {
    await member.roles.add(role);
    await interaction.reply({
      content: `${role.name} rolü verildi!`,
      ephemeral: true,
    });
  }
}

async function handleDMButton(interaction: ButtonInteraction, message: string) {
  try {
    const decodedMessage = Buffer.from(message, "base64").toString("utf-8");
    
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Mesaj")
      .setDescription(decodedMessage)
      .setTimestamp();

    await interaction.user.send({ embeds: [embed] });
    
    await interaction.reply({
      content: "Özel mesajınız gönderildi! DM kutunuzu kontrol edin.",
      ephemeral: true,
    });
  } catch (error) {
    console.error("DM gönderme hatası:", error);
    await interaction.reply({
      content: "Özel mesaj gönderilemedi! DM kutunuz kapalı olabilir.",
      ephemeral: true,
    });
  }
}

async function handleLinkButton(interaction: ButtonInteraction, url: string) {
  const decodedUrl = Buffer.from(url, "base64").toString("utf-8");
  
  await interaction.reply({
    content: `Link: ${decodedUrl}`,
    ephemeral: true,
  });
}
