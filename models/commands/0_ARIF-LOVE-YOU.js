const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "love",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "ARIF BABU", 
  description: "Just Respond",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const react = body.toLowerCase();
  
  // Triggers ki list
  const triggers = ["love", "i love"];
  
  // Check karta hai agar message mein koi trigger hai
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "LOVE-YOU.gif");

    // File check: Agar file maujood hai to attachment bhej, warna sirf text
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: `𝑰 𝑳𝑶𝑽𝑬 𝒀𝑶𝑼 𝑻𝑶𝑶 𝑴𝑬𝑹𝑰 𝑱𝑨𝑨𝑵 🙈`,
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      api.sendMessage(`𝑰 𝑳𝑶𝑽𝑬 𝒀𝑶𝑼 𝑻𝑶𝑶 𝑴𝑬𝑹𝑰 𝑱𝑨𝑨𝑵 🙈`, threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("🙈", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
