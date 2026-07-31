module.exports = {
  config: {
    credits: "SARDAR RDX",
    name: "autoreact",
    aliases: ["ar", "autolike"],
    description: "Group mein auto react on/off karein.",
    usage: "autoreact on | autoreact off",
    category: "Admin",
    cooldowns: 3,
    hasPermssion: 1 // 1 matlab Admin Only
  },

  async run({ api, event, args }) {
    const { threadID, messageID } = event;

    // Check karein ki user admin hai ya nahi
    if (!global.config.ADMINBOT.includes(event.senderID)) {
      return api.sendMessage("❌ Yeh command sirf bot admins use kar sakte hain!", threadID, messageID);
    }

    const action = (args[0] || "").toLowerCase();
    
    // Agar koi argument na ho, toh status dikhayein
    if (!["on", "off"].includes(action)) {
      return api.sendMessage("✅ Auto React Settings:\n\nUse: .autoreact on / .autoreact off", threadID, messageID);
    }

    // Settings save karne ke liye local data
    const enable = action === "on";
    
    // Yeh part aapke bot ke database/data storage system par depend karta hai
    // Agar error aaye toh samajh jayein ki 'global.data' path sahi nahi hai
    if (!global.data.threadData.has(threadID)) {
        global.data.threadData.set(threadID, {});
    }
    const threadData = global.data.threadData.get(threadID);
    threadData.autoreact = enable;
    global.data.threadData.set(threadID, threadData);

    // Confirmation message
    api.sendMessage(
      enable
        ? "✅ Auto React ON ho gaya!\nAb bot har message par react karega."
        : "❌ Auto React OFF ho gaya!\nAb bot react nahi karega.",
      threadID,
      messageID
    );
  }
};
