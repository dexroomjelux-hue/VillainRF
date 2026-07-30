const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "miss",
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
  const triggers = ["miss", "miss you", "याद"];
  
  // Check karta hai agar message mein koi trigger hai
  if (triggers.some(t => react.includes(t))) {
    const pathToGif = path.join(__dirname, "ARIF-BABU", "MISS-YOU.gif");

    // File exist karti hai to attachment bhej warna sirf text
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: `‌𝐈 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😇`,
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      api.sendMessage(`‌𝐈 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎 𝐌𝐀𝐑𝐈 𝐉𝐀𝐀𝐍 😇`, threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("😻", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
