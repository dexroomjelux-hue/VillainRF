const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "bye",
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
  const triggers = ["bye", "byyy", "byy", "अलविदा"];
  
  if (triggers.some(t => react.includes(t))) {
    // Sahi path banane ke liye path.join ka use karein
    const pathToGif = path.join(__dirname, "ARIF-BABU", "BYE.gif");

    // Check karein file exist karti hai ya nahi taake error na aaye
    if (fs.existsSync(pathToGif)) {
      api.sendMessage({
        body: "𝐁𝐘𝐄 𝐁𝐘𝐄 🙋‍♂ 𝐓𝐀𝐊𝐄 𝐂𝐀𝐑𝐄 𝐁𝐀𝐁𝐔 😇",
        attachment: fs.createReadStream(pathToGif)
      }, threadID, messageID);
    } else {
      // Agar file nahi mili, to sirf text message bhejein (bot crash nahi hoga)
      api.sendMessage("𝐁𝐘𝐄 𝐁𝐘𝐄 🙋‍♂ 𝐓𝐀𝐊𝐄 𝐂𝐀𝐑𝐄 𝐁𝐀𝐁𝐔 😇", threadID, messageID);
    }

    // Reaction
    api.setMessageReaction("🙋", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
