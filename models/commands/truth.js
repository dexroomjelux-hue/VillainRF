module.exports.config = {
  name: "truth",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SARDAR RDX",
  description: "Truth or Dare game",
  commandCategory: "Games",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = __dirname + "/truth.json";
  
  // File read karein
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  
  // Random select karein
  const truth = data.truth[Math.floor(Math.random() * data.truth.length)];
  const dare = data.dare[Math.floor(Math.random() * data.dare.length)];

  return api.sendMessage(
    `✨ **TRUTH OR DARE GAME** ✨\n\n` +
    `🤔 Truth: ${truth}\n\n` +
    `🔥 Dare: ${dare}\n\n` +
    `Chuno ki kya karna hai!`,
    event.threadID,
    event.messageID
  );
};
