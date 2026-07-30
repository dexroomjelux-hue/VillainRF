const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "night",
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
  const triggers = ["night", "good night", "शुभ रात्रि"];
  
  // Check karta hai ke message mein koi bhi trigger maujood hai ya nahi
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "NIGHT.gif");

    // File check: Agar file folder mein hai to bheje, warna sirf text bheje
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: `𝐆𝐎𝐎𝐃 𝐍𝐈𝐆𝐇𝐓 😴 𝐒𝐖𝐄𝐄𝐓 𝐃𝐑𝐄𝐀𝐌 😇`,
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      api.sendMessage(`𝐆𝐎𝐎𝐃 𝐍𝐈𝐆𝐇𝐓 😴 𝐒𝐖𝐄𝐄𝐓 𝐃𝐑𝐄𝐀𝐌 😇`, threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("🌃", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
