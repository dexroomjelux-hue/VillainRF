module.exports = {
  config: {
    name: "antiunsend",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Uzair", 
    description: "Detects and resends unsent/deleted messages.",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event, client }) {
    // 1. Message Cache Store karna
    if (!global.antiUnsend) global.antiUnsend = new Map();

    if (event.type === "message" || event.type === "message_reply") {
      global.antiUnsend.set(event.messageID, {
        body: event.body,
        senderID: event.senderID,
        threadID: event.threadID,
        timestamp: event.timestamp
      });
    }

    // 2. Unsend Detect karna
    if (event.type === "message_unsend") {
      const data = global.antiUnsend.get(event.messageID);
      if (!data) return;

      const userInfo = await api.getUserInfo(data.senderID);
      const name = userInfo[data.senderID].name;

      const msg = `⚠️ Unsent Message Detected!\n\n👤 User: ${name}\n💬 Message: ${data.body}`;
      
      api.sendMessage(msg, data.threadID);
      global.antiUnsend.delete(event.messageID);
    }
  },

  run: async function () {}
};
