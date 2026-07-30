/* ========= HARD CREATOR LOCK ========= */
const CREATOR_NAME = "ARIF BABU";

module.exports.config = {
  name: "uns",
  version: "1.0.5", // Version update
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Unsend bot messages",
  commandCategory: "system",
  usages: "reply + uns",
  cooldowns: 0,
  usePrefix: false // Prefix hataya taake simple message se bhi chale
};

if (module.exports.config.credits !== CREATOR_NAME) {
  throw new Error("Credits changed! Command locked by ARIF BABU.");
}

module.exports.languages = {
  en: {
    returnCant: "⚠️ Aap sirf meri bheji hui messages ko unsend kar sakte hain.",
    missingReply: "⚠️ Reply karen us message par jise unsend karna hai."
  }
};

/* ========= HANDLE EVENT (No Prefix) ========= */
module.exports.handleEvent = async function ({ api, event, getText }) {
  // Check agar message reply hai aur body exist karti hai
  if (!event.messageReply || !event.body) return;

  const body = event.body.toLowerCase().trim();
  const triggerWords = ["uns", "unsend", ".", "delete"]; // Aap yahan aur words daal sakte hain

  if (triggerWords.includes(body)) {
    // Check: Kya reply wala message bot ka hai?
    if (event.messageReply.senderID !== api.getCurrentUserID()) {
      return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    }

    try {
      return api.unsendMessage(event.messageReply.messageID);
    } catch (e) {
      console.error("UNSEND ERROR:", e);
    }
  }
};

/* ========= PREFIX COMMAND (Run) ========= */
module.exports.run = async function ({ api, event, getText }) {
  if (!event.messageReply) {
    return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
  }

  if (event.messageReply.senderID !== api.getCurrentUserID()) {
    return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
  }

  try {
    return api.unsendMessage(event.messageReply.messageID);
  } catch (e) {
    console.error("UNSEND ERROR:", e);
    api.sendMessage("❌ Error: Message unsend nahi ho saka.", event.threadID, event.messageID);
  }
};
