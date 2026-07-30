const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "nacho",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "ARIF BABU", 
  description: "Just",
  commandCategory: "no prefix",
  cooldowns: 5, 
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const react = body.toLowerCase();
  
  // Triggers ki list
  const triggers = ["nacho", "nicho", "naco"];
  
  // Check karta hai agar message mein koi trigger hai
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "DANCE.gif");

    // File exist karti hai to attachment bhej warna sirf text
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: `𝐍𝐀𝐂𝐇𝐎 𝐌𝐄𝐑𝐈 𝐉𝐀𝐀𝐍 𝐍𝐀𝐂𝐇𝐎 🙂🤟 ❜`,
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      api.sendMessage(`𝐍𝐀𝐂𝐇𝐎 𝐌𝐄𝐑𝐈 𝐉𝐀𝐀𝐍 𝐍𝐀𝐂𝐇𝐎 🙂🤟 ❜`, threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("🥳", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
