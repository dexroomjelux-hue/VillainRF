module.exports.config = {
    name: "botreply",
    version: "1.4.0",
    hasPermission: 0,
    credits: "AI Collaborator",
    description: "Auto reply from OWNER-MAX/reply.json",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = async function({ event, api, Users }) {
    const fs = require('fs');
    // Updated File Name: reply.json
    const path = __dirname + '/../OWNER-MAX/reply.json';
    const { body, senderID, threadID, messageID } = event;

    if (!body || senderID == api.getCurrentUserID()) return;

    // Trigger check
    const trigger = body.toLowerCase();
    if (!trigger.includes("bot") && !trigger.includes("janu")) return;

    // 1. File Check
    if (!fs.existsSync(path)) {
        return api.sendMessage("⚠️ Error: 'reply.json' file nahi mili OWNER-MAX folder mein.", threadID, messageID);
    }

    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        let response = "";

        // 2. Data Logic
        if (data[senderID]) {
            const msgs = data[senderID];
            response = msgs[Math.floor(Math.random() * msgs.length)];
        } else {
            // gender fetch karne ke liye safe check
            const userInfo = await Users.getData(senderID) || {};
            const gender = userInfo.gender; 
            
            if (gender == 1 && data["MALE"]) {
                response = data["MALE"][Math.floor(Math.random() * data["MALE"].length)];
            } else if (gender == 2 && data["FEMALE"]) {
                response = data["FEMALE"][Math.floor(Math.random() * data["FEMALE"].length)];
            }
        }

        // 3. Send Response
        if (response) {
            api.sendMessage(response, threadID, messageID);
        }

    } catch (e) {
        api.sendMessage("❌ reply.json file mein error hai: " + e.message, threadID, messageID);
        console.error("BotReply Error:", e);
    }
};

module.exports.run = async function({ api, event }) {};
