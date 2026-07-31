module.exports.config = {
  name: "check",
  version: "1.0.0",
  hasPermssion: 0, // 0 rakha hai taaki permission ka koi panga na ho
  credits: "ARIF-BABU",
  description: "Sirf Admin ke liye testing",
  commandCategory: "admin",
  usages: "check",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  // Yahan apni Facebook ID dalein
  const ADMIN_ID = "100001463657257"; 

  if (event.senderID !== ADMIN_ID) {
    return; // Admin ke ilawa kisi aur ko reply nahi karega
  }

  // Inbox check
  if (event.threadID === event.senderID) {
    return api.sendMessage("✅ Admin, Bot Inbox mein bilkul sahi kaam kar raha hai! 🤖✨", event.threadID, event.messageID);
  } else {
    return api.sendMessage("❌ Yeh command sirf Inbox (Private Chat) ke liye hai.", event.threadID, event.messageID);
  }
};
