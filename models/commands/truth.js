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
    "✨ **TRUTH OR DARE GAME** ✨\n\n" +
    "Aap Truth ya Dare mein se kya chunnoge?\n" +
    "Reply mein 'Truth' ya 'Dare' likhein.",
    event.threadID,
    event.messageID
  );
  
  // Is messageID ko global client mein save karte hain taaki reply handle ho sake
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
  
  if (choice === "truth") {
    const truth = data.truth[Math.floor(Math.random() * data.truth.length)];
    return api.sendMessage(`🤔 Aapka Truth hai:\n"${truth}"`, event.threadID, event.messageID);
  } 
  else if (choice === "dare") {
    const dare = data.dare[Math.floor(Math.random() * data.dare.length)];
    return api.sendMessage(`🔥 Aapka Dare hai:\n"${dare}"`, event.threadID, event.messageID);
  } 
  else {
    return api.sendMessage("❌ Invalid choice! Sirf 'Truth' ya 'Dare' likhein.", event.threadID, event.messageID);
  }
};
