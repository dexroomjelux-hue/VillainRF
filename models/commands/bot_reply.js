module.exports.config = {
    name: "botreply",
    version: "1.3.0",
    hasPermission: 0,
    credits: "AI Collaborator",
    description: "Robust Auto Reply with Error Handling",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = async function({ event, api, Users }) {
    const fs = require('fs');
    const path = __dirname + '/../OWNER-MAX/bot-reply.json';
    const { body, senderID, threadID, messageID } = event;

    if (!body || senderID == api.getCurrentUserID()) return;

    // Trigger check
    const trigger = body.toLowerCase();
    if (!trigger.includes("bot") && !trigger.includes("janu")) return;

    // 1. File Check (Error Reporting)
    if (!fs.existsSync(path)) {
        return api.sendMessage("⚠️ Error: 'bot-reply.json' file nahi mili. Path check karein: OWNER-MAX folder.", threadID, messageID);
    }

    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        let response = "";

        // 2. Data Logic
        if (data[senderID]) {
            const msgs = data[senderID];
            response = msgs[Math.floor(Math.random() * msgs.length)];
        } else {
            const userInfo = await Users.getData(senderID) || {};
            const gender = userInfo.gender; 
            
            if (gender == 1 && data["MALE"]) {
                response = data["MALE"][Math.floor(Math.random() * data["MALE"].length)];
            } else if (gender == 2 && data["FEMALE"]) {
                response = data["FEMALE"][Math.floor(Math.random() * data["FEMALE"].length)];
            }
        }

        // 3. Response Validation
        if (response) {
            api.sendMessage(response, threadID, messageID);
        } else {
            api.sendMessage("❌ JSON file mil gayi, lekin usmein aapka data ya gender category sahi se set nahi hai.", threadID, messageID);
        }

    } catch (e) {
        api.sendMessage("❌ JSON file corrupted hai ya code mein issue hai. Fix karein: " + e.message, threadID, messageID);
        console.error("BotReply Error:", e);
    }
};

module.exports.run = async function({ api, event }) {};
