module.exports.config = {
    name: "funny",
    version: "1.2.1",
    hasPermssion: 0,
    credits: "AI Collaborator",
    description: "Specific user ko reply ke saath auto-reply karne ke liye",
    commandCategory: "FUN",
    usages: "Automatic on reply",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, senderID, messageID } = event;
    const targetID = "100001463657257"; 

    if (senderID === targetID) {
        const specialMsgs = [
            "Oh ho! 61591532501919 ji, phir aa gaye? 😂",
            "Aapka reply toh aise aata hai jaise koi VIP aa gaya ho! 🤡",
            "61591532501919, aapka fan club abhi tak nahi khula? ✍️",
            "Baat toh aise kar rahe ho jaise group aapke baap ka hai! 😜",
            "Bhai, thoda rest karlo, itna mat bolo! 😂"
        ];

        const randomMsg = specialMsgs[Math.floor(Math.random() * specialMsgs.length)];
        
        // Yeh line wahi messageID use karegi jo usne bheja hai, isliye yeh seedha reply jayega
        api.sendMessage({ 
            body: randomMsg 
        }, threadID, (err, info) => {}, messageID); 
    }
};

module.exports.run = async function ({ event, api }) {
    api.sendMessage("Auto-reply mode active hai! Ab bot us user ke message ka reply dega.", event.threadID);
}
