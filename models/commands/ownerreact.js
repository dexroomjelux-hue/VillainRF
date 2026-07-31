module.exports = {
  config: {
    credits: "SARDAR RDX",
    name: "ownerreact",
    aliases: ["or", "ownerr"],
    description: "Owner auto react on/off karein.",
    usage: "ownerreact on | ownerreact off",
    category: "Admin",
    cooldowns: 3,
    hasPermssion: 1
  },

  // Yeh part message aane par react karega
  async handleEvent({ api, event, Threads }) {
    const { threadID, messageID, senderID } = event;
    const data = (await Threads.getData(threadID)).data || {};

    // Sirf tab react karega agar 'ownerreact' ON hoga aur message Owner ka hoga
    if (data.ownerreact === true && global.config.ADMINBOT.includes(senderID)) {
      const emojis = ["❤️", "🔥", "💖", "😎", "👍"];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      api.setMessageReaction(randomEmoji, messageID, () => {}, true);
    }
  },

  // Yeh part command handle karega
  async run({ api, event, args, Threads }) {
    const { threadID, messageID, senderID } = event;

    if (!global.config.ADMINBOT.includes(senderID)) {
      return api.sendMessage("❌ Yeh command sirf Admin use kar sakte hain!", threadID, messageID);
    }

    const action = (args[0] || "").toLowerCase();
    
    if (!["on", "off"].includes(action)) {
      const data = (await Threads.getData(threadID)).data || {};
      const status = data.ownerreact ? "✅ ON" : "❌ OFF";
      return api.sendMessage(`🎯 Owner React Status: ${status}\n\nUse: .ownerreact on / .ownerreact off`, threadID, messageID);
    }

    const enable = action === "on";
    const data = (await Threads.getData(threadID)).data || {};
    data.ownerreact = enable;
    
    await Threads.setData(threadID, { data });

    return api.sendMessage(
      enable
        ? "✅ Owner React ON ho gaya!\nAb bot sirf aapke message par react karega."
        : "❌ Owner React OFF ho gaya!",
      threadID,
      messageID
    );
  }
};