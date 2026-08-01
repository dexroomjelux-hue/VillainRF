module.exports.config = {
    name: "funny",
    version: "1.2.2",
    hasPermssion: 0,
    credits: "AI Collaborator",
    description: "Target user ke naam ke saath auto-reply",
    commandCategory: "FUN",
    usages: "Automatic on reply",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, senderID, messageID } = event;
    const targetID = "100001463657257"; 

    if (senderID === targetID) {
        // Name fetch karne ka function
        api.getUserInfo(senderID, (err, info) => {
            if (err) return;
            const userName = info[senderID].name;

            const specialMsgs = [
                `Oh ho! ${userName} ji, phir aa gaye? 😂`,
                `Aapka reply toh aise aata hai jaise koi VIP aa gaya ho, ${userName}! 🤡`,
                `${userName}, aapka fan club abhi tak nahi khula? ✍️`,
                `Baat toh aise kar rahe ho jaise group aapke baap ka hai, ${userName}! 😜`,
                `Bhai ${userName}, thoda rest karlo, itna mat bolo! 😂`
            ];

            const randomMsg = specialMsgs[Math.floor(Math.random() * specialMsgs.length)];
            
            api.sendMessage({ 
                body: randomMsg 
            }, threadID, messageID); 
        });
    }
};

module.exports.run = async function ({ event, api }) {
    api.sendMessage("Auto-reply mode active hai! Ab bot user ka naam use karega.", event.threadID);
}
