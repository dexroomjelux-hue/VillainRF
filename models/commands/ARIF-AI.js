const axios = require("axios");

module.exports.config = {
  name: "admincheck",
  version: "1.0.0",
  hasPermssion: 2, // 2 matlab sirf admin
  credits: "ARIF-BABU",
  description: "Sirf Admin ke liye Inbox Testing Command",
  commandCategory: "admin",
  usages: "inbox check",
  cooldowns: 0,
};

// Yahan apni Facebook ID daalein
const ADMIN_ID = "YOUR_FACEBOOK_ID_HERE"; 

module.exports.run = async function({ api, event, args }) {
  const { senderID, threadID, messageID } = event;

  // Check karega ke kya message bhejne wala Admin hai?
  if (senderID !== ADMIN_ID) {
    return; // Agar admin nahi hai, toh bot chup rahega
  }

  // Testing ke liye command
  const input = args.join(" ");
  
  if (!input) {
    return api.sendMessage("✅ Admin, Bot active hai. Aap testing ke liye kuch bhi likhein (e.g., .admincheck test)", threadID, messageID);
  }

  // Yahan aap apni testing logic likh sakte hain
  api.sendMessage(`🤖 Bot Work Kar Raha Hai!\nAapne kaha: ${input}`, threadID, messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
  // Inbox mein check karne ke liye logic
  const { senderID, body, threadID } = event;
  
  // Agar sender Admin hai aur message inbox (private) mein hai
  if (senderID === ADMIN_ID && threadID === senderID) {
    if (body.toLowerCase() === "check") {
      api.sendMessage("✨ Admin, main bilkul sahi kaam kar raha hoon! 🚀", threadID);
    }
  }
};
