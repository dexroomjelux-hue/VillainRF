const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "chocolate",
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
  
  // Checking if the message includes the keyword
  if (react.includes("chocolate")) {
    const pathToImage = path.join(__dirname, "ARIF-BABU", "CHOCOLATE.jpeg");

    // Check if file exists
    if (fs.existsSync(pathToImage)) {
      api.sendMessage({
        body: "𝐁𝐀𝐁𝐔 𝐂𝐇𝐎𝐂𝐎𝐋𝐀𝐓𝐄 𝐊𝐇𝐀 𝐋𝐎 🍫",
        attachment: fs.createReadStream(pathToImage)
      }, threadID, messageID);
    } else {
      // Fallback agar image file nahi mili
      api.sendMessage("𝐁𝐀𝐁𝐔 𝐂𝐇𝐎𝐂𝐎𝐋𝐀𝐓𝐄 𝐊𝐇𝐀 𝐋𝐎 🍫", threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("🍫", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
