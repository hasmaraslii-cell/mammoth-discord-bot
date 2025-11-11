import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import "./types.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();

async function loadCommands() {
  const commandsPath = join(__dirname, "commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts") || file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);
    
    if ("data" in command.default && "execute" in command.default) {
      client.commands.set(command.default.data.name, command.default);
      commands.push(command.default.data.toJSON());
    }
  }

  return commands;
}

async function loadEvents() {
  const eventsPath = join(__dirname, "events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".ts") || file.endsWith(".js")
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = await import(filePath);
    
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }
}

async function registerCommands(commands: any[]) {
  if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) {
    console.log("⚠️  Discord bot token veya client ID bulunamadı. Lütfen .env dosyanızı yapılandırın.");
    return;
  }

  try {
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
    
    console.log(`🔄 ${commands.length} slash komutu kaydediliyor...`);
    
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );
    
    console.log("✅ Slash komutları başarıyla kaydedildi!");
  } catch (error) {
    console.error("❌ Komut kaydı hatası:", error);
  }
}

async function startBot() {
  try {
    await loadEvents();
    console.log("✅ Event handler'lar yüklendi");
    
    const commands = await loadCommands();
    console.log(`✅ ${commands.length} komut yüklendi`);
    
    if (!process.env.DISCORD_TOKEN) {
      console.log("\n⚠️  DISCORD_TOKEN bulunamadı!");
      console.log("Discord botunu başlatmak için:");
      console.log("1. Discord Developer Portal'dan bot token alın");
      console.log("2. DISCORD_TOKEN ve DISCORD_CLIENT_ID'yi Replit Secrets'a ekleyin");
      console.log("\nŞu anda sadece web paneli çalışıyor.\n");
      return;
    }

    await client.login(process.env.DISCORD_TOKEN);
    
    if (commands.length > 0) {
      await registerCommands(commands);
    }
  } catch (error) {
    console.error("❌ Bot başlatma hatası:", error);
    console.log("\n⚠️  Discord bot başlatılamadı. Web paneli çalışmaya devam ediyor.\n");
  }
}

startBot();

export { client };
