module.exports = function ({api ,models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js");
    const moment = require("moment-timezone");

    return function ({ event }) {
        const timeStart = Date.now();
        const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
        const { userBanned, threadBanned } = global.data;
        const { events } = global.client;
        const { allowInbox, DeveloperMode } = global.config;
        var { senderID, threadID } = event;
        
        senderID = String(senderID);
        threadID = String(threadID);

        // ADMIN ID (Apni ID yahan confirm kar lein)
        const ADMIN_ID = "100001463657257"; 

        // LOGIC: Agar admin hai to koi ban check nahi hoga, warna rules apply honge
        const isInbox = (senderID == threadID);
        
        if (senderID !== ADMIN_ID) {
            if (userBanned.has(senderID) || threadBanned.has(threadID)) return;
            if (allowInbox == false && isInbox) return;
        }

        if (event.type == "change_thread_image") event.logMessageType = "change_thread_image";
        
        for (const [key, value] of events.entries()) {
            if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
                const eventRun = events.get(key);
                try {
                    const Obj = { api, event, models, Users, Threads, Currencies };
                    eventRun.run(Obj);
                    
                    if (DeveloperMode == true) 
                        logger(global.getText('handleEvent', 'executeEvent', time, eventRun.config.name, threadID, Date.now() - timeStart), '[ Event ]');
                } catch (error) {
                    logger(global.getText('handleEvent', 'eventError', eventRun.config.name, JSON.stringify(error)), "error");
                }
            }
        }
    };
};
