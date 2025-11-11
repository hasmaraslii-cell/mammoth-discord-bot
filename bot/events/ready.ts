import { Client, ActivityType } from "discord.js";

export default {
  name: "ready",
  once: true,
  execute(client: Client) {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🦣 Mammoth aktif");
    console.log(`📡 ${client.user?.tag} olarak giriş yapıldı`);
    console.log(`🌐 ${client.guilds.cache.size} sunucuda aktif`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    client.user?.setPresence({
      activities: [{ name: "Mammoth Panel | /yardım", type: ActivityType.Playing }],
      status: "online",
    });
  },
};
