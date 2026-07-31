module.exports.config = {
  name: "ARIF-RANKUP-CARD",
  version: "12.0.0-FUTURISTIC",
  hasPermssion: 0, // Change to 0 for normal members
  credits: "ARIF BABU", // ⚠️ CREDIT PROTECTION
  description: "Futuristic VIP Rankup Card System",
  commandCategory: "LEVEL UP",
  dependencies: {
    "fs-extra": "",
    "axios": "" // Axios zaroori hai agar humein user ka name ya profile pic bhi handle karna ho baad mein
  },
  cooldowns: 5
};

// ⛔ CREDIT PROTECTION — DO NOT TOUCH
module.exports.onLoad = function () {
  const fs = require("fs");
  const path = __filename;
  const fileData = fs.readFileSync(path, "utf8");

  if (!fileData.includes('credits: "ARIF BABU"')) {
    console.log("\n❌ ERROR: Credits Badle Gaye Hain! File Disabled ❌\n");
    process.exit(1);
  }
};
// ---------------------

module.exports.handleEvent = async function ({ api, event, Currencies, Users, Threads }) {
  const { threadID, senderID } = event;
  
  // 1. Thread check: Kya rankup is thread mein ON hai?
  const threadData = (await Threads.getData(threadID)).data || {};
  if (threadData.rankup === false) return;

  const fs = global.nodemodule["fs-extra"];
  const pathCache = __dirname + "/cache/rankup.png";

  // Check karein ke rankup.png cache folder mein exist karta hai ya nahi
  if (!fs.existsSync(pathCache)) {
    console.log("❌ ARIF-RANKUP-CARD Error: rankup.png not found in cache folder.");
    return;
  }

  // 2. EXP Update logic
  let dataExp = (await Currencies.getData(senderID)) || {};
  let exp = dataExp.exp || 0;
  exp += 1; // Har message par +1 EXP
  
  // Level formula (Math.sqrt(1 + (4 * exp / 3)) + 1) / 2)
  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3)) + 1) / 2);
  const oldLevel = Math.floor((Math.sqrt(1 + (4 * (exp - 1) / 3)) + 1) / 2);

  // Sirf tabhi photo bhejein agar level badha ho
  if (curLevel > oldLevel) {
    const name = await Users.getNameUser(senderID);
    
    // Futuristic design ke hisab se message ka format
    const msg = {
      body: `✨ SYSTEM ALERT: NEW PROTOCOL REACHED ✨\n\n🤵 Subject: ${name}\n⚡ Status: LEVEL ${curLevel}\n🌐 Location: SECURE NET\n\n🚀 G A T E W A Y   O P E N E D 🚀`,
      attachment: fs.createReadStream(pathCache)
    };

    api.sendMessage(msg, threadID);
  }

  // Database update
  await Currencies.setData(senderID, { exp });
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID } = event;
  let data = (await Threads.getData(threadID)).data || {};
  
  // Toggle rankup status for the specific group
  if (typeof data.rankup === 'undefined') {
      data.rankup = false; // Default OFF
  } else {
      data.rankup = !data.rankup; // Switch ON/OFF
  }

  await Threads.setData(threadID, { data });
  
  return api.sendMessage(
    data.rankup ? "👑 VIP Futuristic Rankup Card ON ho gaya!" : "❌ VIP Futuristic Rankup Card OFF ho gaya!",
    threadID
  );
};
