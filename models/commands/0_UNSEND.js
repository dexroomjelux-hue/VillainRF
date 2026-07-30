* ========= HARD CREATOR LOCK ========= */
const CREATOR_NAME = "ARIF BABU";

module.exports.config = {
  name: "uns",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "मैसेज को अनसेंड करें (prefix + no prefix)",
  commandCategory: "system",
  usages: "reply + uns / 👍 / unsend / #uns",
  cooldowns: 0,
  usePrefix: true // ✅ IMPORTANT (PREFIX FIX)
};

// 🔒 CREDIT PROTECTION
if (module.exports.config.credits !== CREATOR_NAME) {
  throw new Error("❌ Credits changed! Command locked by ARIF BABU.");
}

module.exports.languages = {
  hi: {
    returnCant: "📌 aap Kisi aur ka bheja hua message unsent nahin kar sakte 😉",
    missingReply: "📌 jis message ko unsent karna hai, kripya usi per reply karen 😉"
  }
};

/* ========= NO PREFIX ========= */
async run({ api, event, send }) {
    const { messageReply } = event;
    
    if (!messageReply) {
      return send.reply('Please reply to a message to unsend.');
    }
    
    const botID = api.getCurrentUserID();
    
    if (messageReply.senderID !== botID) {
      return send.reply('I can only unsend my own messages.');
    }
    
    try {
      await api.unsendMessage(messageReply.messageID);
    } catch (error) {
      return send.reply('Failed to unsend message.');
    }
  }
};
