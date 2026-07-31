module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2, // 2 matlab sirf Bot Owner (Admin)
    credits: "ARIF BABU",
    description: "Bot ko group se bahar nikalne ke liye",
    commandCategory: "Admin",
    usages: "out [threadID]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const threadID = args[0] ? args[0] : event.threadID;

    // Pehle message bhejein
    await api.sendMessage("⚠️ OWNER-MAX Ka Bot Leave Hogaya Hai!", threadID);

    // Phir bot ko group se remove karein
    return api.removeUserFromGroup(api.getCurrentUserID(), threadID);
}
