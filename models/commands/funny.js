module.exports.config = {
    name: "funny",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "AI Collaborator",
    description: "Specific user ko auto-reply karne ke liye",
    commandCategory: "FUN",
    usages: "Automatic on reply",
    cooldowns: 5
};

// Yeh function har msg par check karega
module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, senderID, messageID } = event;
    const targetID = "100001463657257"; // Jis user ko tang karna hai

    // Agar message us target user ka hai
    if (senderID === targetID) {
        const specialMsgs = [
            "Oh ho! 61591532501919 ji, phir aa gaye? 😂",
            "Aapka reply toh aise aata hai jaise koi VIP aa gaya ho! 🤡",
            "61591532501919, aapka fan club abhi tak nahi khula? ✍️",
            "Baat toh aise kar rahe ho jaise group aapke baap ka hai! 😜",
            "Bhai, thoda rest karlo, itna mat bolo! 😂"
        ];

        const randomMsg = specialMsgs[Math.floor(Math.random() * specialMsgs.length)];
        
        // Cooldown check (taaki bot har millisecond spam na kare)
        // Yahan aap `api.sendMessage` use karein
        api.sendMessage(randomMsg, threadID, messageID);
    }
};

module.exports.run = async function ({ event, api }) {
    api.sendMessage("Auto-reply mode active hai! Jab woh user msg karega, bot reply dega.", event.threadID);
}
