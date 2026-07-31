module.exports = function ({ api, models }) {
    const fs = require("fs");
    const Users = require("./controllers/users")({ models, api });
    const Threads = require("./controllers/threads")({ models, api });
    const Currencies = require("./controllers/currencies")({ models });
    const logger = require("../utils/log.js");
    const moment = require("moment-timezone");

    const box = (title, body) =>
`╭─── ${title} ───╮

${body}

╰─────────────────╯`;

    let day = moment.tz("Asia/Karachi").day();
    const checkttDataPath = __dirname + '/../models/commands/checktuongtac/';

    /* ================= DAILY / WEEKLY TOP ================= */

    setInterval(async () => {
        const day_now = moment.tz("Asia/Kolkata").day();
        const _ADMINIDs = [...global.config.NDH, ...global.config.ADMINBOT];

        try {
            if (day !== day_now) {
                day = day_now;

                const checkttData = fs.readdirSync(checkttDataPath).filter(file => {
                    const id = file.replace('.json', '');
                    return _ADMINIDs.includes(id) || global.data.allThreadID.includes(id);
                });

                for (const checkttFile of checkttData) {
                    const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                    let storage = [], count = 1;

                    for (const item of checktt.day) {
                        const name = await Users.getNameUser(item.id) || "Unknown";
                        storage.push({ ...item, name });
                    }

                    storage.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

                    const body = storage.slice(0, 10).map(i => `${count++}. ${i.name} → ${i.count} msgs`).join("\n");

                    api.sendMessage(box("🔥 DAILY TOP CHAT", body), checkttFile.replace(".json", ""));

                    checktt.day.forEach(e => e.count = 0);
                    checktt.time = day_now;
                    fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                }

                if (day_now === 1) {
                    for (const checkttFile of checkttData) {
                        const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                        let storage = [], count = 1;

                        for (const item of checktt.week) {
                            const name = await Users.getNameUser(item.id) || "Unknown";
                            storage.push({ ...item, name });
                        }

                        storage.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

                        const body = storage.slice(0, 10).map(i => `${count++}. ${i.name} → ${i.count} msgs`).join("\n");

                        api.sendMessage(box("👑 WEEKLY TOP CHAT", body), checkttFile.replace(".json", ""));

                        checktt.week.forEach(e => e.count = 0);
                        fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                    }
                }
                global.client.sending_top = false;
            }
        } catch (e) {
            console.error("Interval Error:", e);
        }
    }, 1000 * 10);

    /* ================= LOAD DATABASE ================= */

    (async function () {
        try {
            logger("Loading environment...", "[ SYSTEM ]");
            const threads = await Threads.getAll();
            const users = await Users.getAll(["userID", "name", "data"]);
            const currencies = await Currencies.getAll(["userID"]);

            for (const t of threads) {
                const id = String(t.threadID);
                global.data.allThreadID.push(id);
                global.data.threadData.set(id, t.data || {});
                global.data.threadInfo.set(id, t.threadInfo || {});
            }
            for (const u of users) {
                const id = String(u.userID);
                global.data.allUserID.push(id);
                if (u.name) global.data.userName.set(id, u.name);
            }
            for (const c of currencies)
                global.data.allCurrenciesID.push(String(c.userID));
            logger("Environment loaded successfully", "[ SYSTEM ]");
        } catch (err) {
            logger("Failed to load environment: " + err, "ERROR");
        }
    })();

    /* ================= HANDLERS ================= */

    const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
    const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
    const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
    const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
    const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
    const handleCreateDatabase = require("./handle/handleCreateDatabase")({ api, Threads, Users, Currencies, models });

    /* ================= EVENT ROUTER ================= */

    return (event) => {
        switch (event.type) {
            case "message":
            case "message_reply":
            case "message_unsend":
                handleCreateDatabase({ event });
                handleCommand({ event });
                handleReply({ event });
                handleCommandEvent({ event });
                break;

            case "event":
                handleEvent({ event });
                break;

            case "message_reaction": {
                try {
                    const ADMIN_IDS = [...(global.config.ADMINBOT || []), ...(global.config.NDH || [])];
                    const ALLOWED_REACTIONS = ["😉", "❤️", "😡", "🙄"];

                    if (event.messageID && event.reaction && ADMIN_IDS.includes(event.userID)) {
                        if (ALLOWED_REACTIONS.includes(event.reaction)) {
                            api.unsendMessage(event.messageID).catch(err => {});
                        }
                    }
                } catch (err) {
                    console.error("Reaction handler error:", err);
                }
                handleReaction({ event });
                break;
            }
        }
    };
};
