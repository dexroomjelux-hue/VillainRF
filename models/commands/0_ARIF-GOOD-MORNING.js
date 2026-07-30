const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "morning",
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
  
  // Triggers ki list: lowercase mein likhein taake sab cover ho jaye
  const triggers = ["morning", "gm", "good morning"];
  
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "MORNING.gif");

    // File existence check
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: "𝐕𝐄𝐑𝐘 𝐆𝐎𝐎𝐃 𝐌𝐎𝐑𝐍𝐈𝐍𝐆 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😻",
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      // Agar file missing ho to sirf text bhejein
      api.sendMessage("𝐕𝐄𝐑𝐘 𝐆𝐎𝐎𝐃 𝐌𝐎𝐑𝐍𝐈𝐍𝐆 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😻", threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("😻", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
