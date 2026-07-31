module.exports = {
  config: {
    name: "antiunsend",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Uzair",
    description: "Detects and resends unsent messages (Text & Media).",
    commandCategory: "Utilities",
    usages: "",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const fs = require("fs-extra");
    const axios = require("axios");

    if (!global.antiUnsend) global.antiUnsend = new Map();

    // 1. Message Store karna
    if (event.type === "message" || event.type === "message_reply") {
      global.antiUnsend.set(event.messageID, {
        body: event.body,
        senderID: event.senderID,
        threadID: event.threadID,
        attachments: event.attachments
      });
    }

    // 2. Unsend Detect karna
    if (event.type === "message_unsend") {
      const data = global.antiUnsend.get(event.messageID);
      if (!data) return;

      const userInfo = await api.getUserInfo(data.senderID);
      const name = userInfo[data.senderID].name;
      let msg = `⚠️ Unsent Message Detected!\n👤 User: ${name}`;

      // Agar attachments hain (Pics/Video/Audio)
      if (data.attachments && data.attachments.length > 0) {
        let paths = [];
        for (let i = 0; i < data.attachments.length; i++) {
          const path = __dirname + `/cache/unsend_${i}.png`; // Extension file type ke hisaab se adjust hogi
          const res = await axios.get(data.attachments[i].url, { responseType: "arraybuffer" });
          fs.writeFileSync(path, Buffer.from(res.data, "binary"));
          paths.push(fs.createReadStream(path));
        }

        api.sendMessage({ body: `${msg}\n💬 Text: ${data.body || "None"}`, attachment: paths }, data.threadID, () => {
          paths.forEach(p => fs.unlinkSync(p.path)); // Send hone ke baad cache clear
        });
      } else {
        // Sirf Text ke liye
        api.sendMessage(`${msg}\n💬 Message: ${data.body}`, data.threadID);
      }

      global.antiUnsend.delete(event.messageID);
    }
  },

  run: async function () {}
};
