module.exports.config = {
    name: "funny",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "AI Collaborator",
    description: "Gender ke hisaab se funny auto-reply",
    commandCategory: "FUN",
    usages: "Automatic",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, senderID, messageID } = event;
    const targetID = "61591532501919"; 

    if (senderID === targetID) {
        api.getUserInfo(senderID, (err, info) => {
            if (err) return;
            
            const userName = info[senderID].name;
            const gender = info[senderID].gender; // 1 = Male, 2 = Female, 0 = Unknown/Other
            
            let specialMsgs = [];

            if (gender === 2) { // Female
                specialMsgs = [
                    `Oh ho! ${userName} behen, phir aa gayi? Itna mat bolo! 😂`,
                    `Aapka reply toh aise aata hai jaise koi VIP aa gayi ho, ${userName}! 🤡`,
                    `${userName} behen, aapka fan club kab khulega? ✍️`,
                    `Baat toh aise kar rahi ho jaise group aapke baap ka hai, ${userName}! 😜`,
                    `Relax karo ${userName} ji, itna stress mat lo! ☕`
                ];
            } else { // Male (ya default)
                specialMsgs = [
                    `Oh ho! ${userName} bhai, phir aa gaye? Itna mat bolo! 😂`,
                    `Aapka reply toh aise aata hai jaise koi VIP aa gaya ho, ${userName}! 🤡`,
                    `${userName} bhai, aapka fan club kab khulega? ✍️`,
                    `Baat toh aise kar rahe ho jaise group aapke baap ka hai, ${userName}! 😜`,
                    `Thoda rest karlo ${userName} bhai, itna mat typo karo! ⌨️`
                ];
            }

            const randomMsg = specialMsgs[Math.floor(Math.random() * specialMsgs.length)];
            
            api.sendMessage({ 
                body: randomMsg 
            }, threadID, messageID); 
        });
    }
};

module.exports.run = async function ({ event, api }) {
    api.sendMessage("Gender-based auto-reply mode active hai!", event.threadID);
}
