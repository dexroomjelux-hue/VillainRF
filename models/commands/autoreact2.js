module.exports.config = {
    name: "autoreact",
    version: "1.0.0",
    hasPermission: 0,
    credits: "AI Collaborator",
    description: "Auto react to specific emoji",
    commandCategory: "Noprefix",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = async function({ event, api }) {
    const { body, messageID } = event;

    // Check agar message mein 🙂 emoji hai
    if (body && body.includes("🙂")) {
        try {
            api.setMessageReaction("😆", messageID, () => {}, true);
        } catch (e) {
            console.error("AutoReact Error:", e);
        }
    }
};

module.exports.run = async function({ api, event }) {};
