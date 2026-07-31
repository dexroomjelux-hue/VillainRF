module.exports = {
  config: {
    name: "autoreact_event",
    eventType: ["message"], // Har message par trigger hoga
    version: "1.0.0",
    credits: "SARDAR RDX",
    description: "Auto react logic"
  },

  async handleEvent({ api, event, Threads }) {
    const { threadID, messageID } = event;

    // 1. Check karein ki settings mein autoreact ON hai ya nahi
    const settings = await Threads.getSettings(threadID);
    if (!settings || !settings.autoreact) return;

    // 2. React karne ke liye emojis ki list
    const emojis = ["❤️", "😆", "😮", "😢", "😠", "👍", "🔥"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // 3. React karein
    api.setMessageReaction(randomEmoji, messageID, () => {}, true);
  }
};
