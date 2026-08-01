module.exports.config = {
    name: "botreply",
    version: "1.0.0",
    hasPermission: 0,
    credits: "AI Collaborator",
    description: "Auto reply based on JSON file",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = async function({ event, api, Users }) {
    const fs = require('fs');
    const path = __dirname + '/ARIF-BABU/bot-reply.json';
    
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    const { threadID, senderID, messageID } = event;
    if (senderID == api.getCurrentUserID()) return;

    let response = "";

    // 1. Check if sender is Boss (Owner)
    if (data[senderID]) {
        const msgs = data[senderID];
        response = msgs[Math.floor(Math.random() * msgs.length)];
    } 
    // 2. Check Gender
    else {
        const userInfo = await Users.getData(senderID);
        const gender = userInfo.gender; // 1: Male, 2: Female
        
        if (gender == 1 && data["MALE"]) {
            response = data["MALE"][Math.floor(Math.random() * data["MALE"].length)];
        } else if (gender == 2 && data["FEMALE"]) {
            response = data["FEMALE"][Math.floor(Math.random() * data["FEMALE"].length)];
        }
    }

    // Reply bhej rahe hain
    if (response) {
        api.sendMessage({ body: response }, threadID, messageID);
    }
};

module.exports.run = async function({ api, event }) {};
