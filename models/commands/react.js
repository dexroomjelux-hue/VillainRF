module.exports.config = {
  name: "react",
  version: "1.0.0",
  hasPermssion: 0, // 0 matlab koi bhi use kar sakta hai (agar admin only chahiye toh 1 karein)
  credits: "SARDAR RDX",
  description: "Auto react on/off karein",
  commandCategory: "no prefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, Threads }) {
  const { threadID, messageID, senderID } = event;

  // Bot apne message par react na kare
  if (senderID === api.getCurrentUserID()) return;

  try {
    const threadData = (await Threads.getData(threadID)).data || {};
    
    // Sirf tab react karega agar system ON hoga
    if (threadData.autoreact === true) {
      const emojis = ["❤️", "🔥", "👍", "😍", "✨", "😎", "🥰", "⚡", "💖", "💯", "🥀", "👑"];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      api.setMessageReaction(randomEmoji, messageID, () => {}, true);
    }
  } catch (err) {}
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, messageID } = event;
  const action = (args[0] || "").toLowerCase();

  let data = (await Threads.getData(threadID)).data || {};

  // Agar user sirf .react likhe
  if (!["on", "off"].includes(action)) {
    const status = data.autoreact ? "✅ ON" : "❌ OFF";
    return api.sendMessage(`⚙️ 𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓 𝐒𝐘𝐒𝐓𝐄𝐌\nStatus: ${status}\nUsage: .react on / .react off`, threadID, messageID);
  }

  // ON / OFF logic
  if (action === "on") {
    data.autoreact = true;
    await Threads.setData(threadID, { data });
    return api.sendMessage("✅ Auto React ON ho gaya!", threadID, messageID);
  } else {
    data.autoreact = false;
    await Threads.setData(threadID, { data });
    return api.sendMessage("❌ Auto React OFF ho gaya!", threadID, messageID);
  }
};
