const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "Kiss",
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
  
  // Triggers ki list (lowercase mein)
  const triggers = ["kiss", "kiss me", "kiss you", "चूमा"];
  
  // Check karta hai agar message mein koi trigger hai
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "KISS-YOU.gif");

    // File exist karti hai to attachment bhej warna sirf text
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: `𝑰 𝑲𝑰𝑺𝑺 𝒀𝑶𝑶 𝑻𝑶𝑶 𝑩𝑨𝑩𝒀 💋🙊💞`,
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      api.sendMessage(`𝑰 𝑲𝑰𝑺𝑺 𝒀𝑶𝑶 𝑻𝑶𝑶 𝑩𝑨𝑩𝒀 💋🙊💞`, threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("💋", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
