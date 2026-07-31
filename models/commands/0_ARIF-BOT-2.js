const axios = require("axios");
const fs = require("fs");
const path = require("path");

/* 🔒 HARD-LOCK CREDITS PROTECTION 🔒 */
function protectCredits(config) {
  if (config.credits !== "ARIF-BABU") {
    console.log("\n🚫 Credits change detected! Restoring original credits…\n");
    config.credits = "ARIF-BABU";
  }
}

module.exports.config = {
  name: "ARIF-AI",
  version: "3.3.1",
  hasPermssion: 0,
  credits: "ARIF-BABU",
  description: "META AI",
  commandCategory: "ai",
  usages: "No prefix",
  cooldowns: 2,
  dependencies: { axios: "" }
};

protectCredits(module.exports.config);

/* 🔑 OPENROUTER API KEY (Yahan apni key dalen) */
const OPENROUTER_API_KEY = "YAHAN PER APNA API KEY ADD KARO ✅"; 

/* 🧠 SYSTEM PROMPT */
const systemPrompt = `
تم "عارف بابو ✮⃝❤ AI" ہو 🙂
Creator & Owner: 𝆺𝅥⃝💓 عارف بابو ❤️

Language Rules:
• User جس زبان میں بات کرے، اسی زبان میں جواب دینا۔

— Hindi/Urdu/English/Roman Urdu:
• Sweet, caring, romantic tone, playful, 1-2 lines only.
• Emojis لازمی 🙂❤️😌
• Cold, rude ya robotic جواب kabhi nahi.
`;

/* 📁 DATA PATHS */
const DATA_DIR = path.join(__dirname, "ARIF-BABU");
const HISTORY_FILE = path.join(DATA_DIR, "ai_history.json");
const BOT_REPLY_FILE = path.join(DATA_DIR, "bot-reply.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

let historyData = {};
if (fs.existsSync(HISTORY_FILE)) {
  try { historyData = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8")); } 
  catch { historyData = {}; }
}

let botReplies = {};
if (fs.existsSync(BOT_REPLY_FILE)) {
  try { botReplies = JSON.parse(fs.readFileSync(BOT_REPLY_FILE, "utf8")); } 
  catch { botReplies = {}; }
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function startTyping(api, threadID) {
  if (api.sendTypingIndicator) {
      return setInterval(() => api.sendTypingIndicator(threadID), 3000);
  }
  return null;
}

module.exports.run = () => {};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID, messageReply } = event;
  if (!body) return;

  // Check if API Key is set
  if (OPENROUTER_API_KEY.includes("YAHAN")) {
      if (body.toLowerCase().startsWith("bot ")) {
          api.sendMessage("❌ Error: Bot owner ne abhi tak OpenRouter API key nahi daali hai. Contact Owner!", threadID, messageID);
      }
      return;
  }

  const rawText = body.trim();
  const text = rawText.toLowerCase();

  const fixedBot = text === "bot" || text === "bot." || text === "bot!" || text.endsWith(" bot");
  const botWithText = text.startsWith("bot ");
  const replyToBot = messageReply && messageReply.senderID === api.getCurrentUserID();

  // 🤖 FIXED BOT REPLY
  if (fixedBot) {
    let category = "MALE";
    if (senderID === "61572909482910") category = "61572909482910";
    else {
      const gender = (event.userGender || "").toString().toUpperCase();
      if (gender === "FEMALE" || gender === "1") category = "FEMALE";
    }
    if (botReplies[category]?.length) {
      const reply = botReplies[category][Math.floor(Math.random() * botReplies[category].length)];
      return api.sendMessage(reply, threadID, messageID);
    }
  }

  if (!botWithText && !replyToBot) return;

  const userText = botWithText ? rawText.slice(4).trim() : rawText;
  if (!userText) return;

  if (api.setMessageReaction) api.setMessageReaction("⌛", messageID, () => {}, true);
  const typing = startTyping(api, threadID);

  try {
    historyData[threadID] = historyData[threadID] || [];
    historyData[threadID].push({ role: "user", content: userText });
    const recentMessages = historyData[threadID].slice(-10); // History optimization

    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "system", content: systemPrompt }, ...recentMessages],
        max_tokens: 100,
        temperature: 0.8
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/ARIF-BABU", 
          "X-Title": "ARIF-AI"
        }
      }
    );

    let reply = res.data?.choices?.[0]?.message?.content || "Main yahin hoon 😌✨";

    historyData[threadID].push({ role: "assistant", content: reply });
    saveJSON(HISTORY_FILE, historyData);

    if (typing) clearInterval(typing);
    api.sendMessage(reply, threadID, messageID);
    if (api.setMessageReaction) api.setMessageReaction("✅", messageID, () => {}, true);

  } catch (err) {
    if (typing) clearInterval(typing);
    console.error("OpenRouter API Error Details:", err.response?.data?.error || err.message);
    api.sendMessage("Abhi server busy hai, thodi der baad try karo babu 😅", threadID, messageID);
    if (api.setMessageReaction) api.setMessageReaction("❌", messageID, () => {}, true);
  }
};
