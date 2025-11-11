import { Interaction } from "discord.js";
import { client } from "../index";

export default {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`Komut bulunamadı: ${interaction.commandName}`);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Komut hatası (${interaction.commandName}):`, error);
        
        const errorMessage = "Bu komutu çalıştırırken bir hata oluştu!";
        
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
          await interaction.reply({ content: errorMessage, ephemeral: true });
        }
      }
    } else if (interaction.isButton()) {
      const buttonHandlersPath = require("../utils/buttonHandlers");
      await buttonHandlersPath.handleButtonInteraction(interaction);
    }
  },
};
