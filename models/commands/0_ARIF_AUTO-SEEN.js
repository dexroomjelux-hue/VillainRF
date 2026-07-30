const fs = require('fs-extra');
const path = __dirname + '/cache/autoseen.txt';

module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  hasPermssion: 2, // Sirf Admin
  credits: "Developer",
  description: "Auto seen messages",
  commandCategory: "Tools",
  usages: "autoseen [on/off]",
  cooldowns: 5
};

// Auto seen feature handleEvent mein
module.exports.handleEvent = async ({ api, event }) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "false");
  const status = fs.readFileSync(path, 'utf-8');
  
  if (status == "true") {
    api.markAsReadAll(event.threadID);
  }
};

module.exports.run = async ({ api, event, args }) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "false");
  
  if (args[0] == "on") {
    fs.writeFileSync(path, "true");
    return api.sendMessage("✅ Auto seen on ho gaya hai.", event.threadID, event.messageID);
  } else if (args[0] == "off") {
    fs.writeFileSync(path, "false");
    return api.sendMessage("❎ Auto seen off ho gaya hai.", event.threadID, event.messageID);
  } else {
    return api.sendMessage("Sahi format: autoseen on ya autoseen off", event.threadID, event.messageID);
  }
};
