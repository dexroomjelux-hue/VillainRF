module.exports.config = {
  name: "truth",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SARDAR RDX",
  description: "Truth or Dare game with reply system",
  commandCategory: "Games",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const msg = await api.sendMessage(
    "╭─── ✨ 𝐓𝐑𝐔𝐓𝐇 𝐎𝐑 𝐃𝐀𝐑𝐄 ✨ ───╮\n\n" +
    "✨ Aap Kya Chuna Chahenge? ✨\n\n" +
    "💠 Reply Karein:\n" +
    "『 𝐓 』 ya 『 𝐓𝐫𝐮𝐭𝐡 』\n" +
    "『 𝐃 』 ya 『 𝐃𝐚𝐫𝐞 』\n\n" +
    "╰──────── 🎮 ────────╯",
    event.threadID,
    event.messageID
  );
  
  global.client.handleReply.push({
    name: this.config.name,
    messageID: msg.messageID,
    author: event.senderID
  });
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const fs = require("fs");
  const path = __dirname + "/truth.json";
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  
  const choice = event.body.toLowerCase();
  
  // Variation check
  const isTruth = ["t", "truth"].includes(choice);
  const isDare = ["d", "dare"].includes(choice);
  
  if (isTruth) {
    const truth = data.truth[Math.floor(Math.random() * data.truth.length)];
    return api.sendMessage(`🤔 𝐘𝐨𝐮𝐫 𝐓𝐫𝐮𝐭𝐡:\n"${truth}"`, event.threadID, event.messageID);
  } 
  else if (isDare) {
    const dare = data.dare[Math.floor(Math.random() * data.dare.length)];
    return api.sendMessage(`🔥 𝐘𝐨𝐮𝐫 𝐃𝐚𝐫𝐞:\n"${dare}"`, event.threadID, event.messageID);
  } 
  else {
    return api.sendMessage("❌ Invalid! Sirf 'T' ya 'D' likhein.", event.threadID, event.messageID);
  }
};
