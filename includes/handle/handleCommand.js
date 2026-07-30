module.exports = function ({ api, models, Users, Threads, Currencies }) {
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios');
  const moment = require("moment-timezone");

  // Initialize IgnoreAll in global.client if not exists
  if (typeof global.client.ignoreAll === "undefined") global.client.ignoreAll = false;

  return async function ({ event }) {
    const dateNow = Date.now();
    const time = moment.tz("Asia/Kolkata").format("HH:mm:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, ndhOnly, adminPaOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;

    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID);
    var threadID = String(threadID);

    // Convert ADMINBOT and NDH IDs to Strings for reliable matching
    const adminIDs = (ADMINBOT || []).map(id => String(id));
    const ndhIDs = (NDH || []).map(id => String(id));

    // --- 1. IGNORE ALL LOGIC ---
    if (global.client.ignoreAll === true && !adminIDs.includes(senderID)) {
      return; // Non-admin users ke messages silent ignore honge
    }

    // --- 2. ADMIN ONLY / NDH ONLY PERMISSION CHECKS ---
    if (adminOnly === true && !adminIDs.includes(senderID)) {
      return api.sendMessage("MODE » Only admins can use the bot.", threadID, messageID);
    }

    if (ndhOnly === true && !ndhIDs.includes(senderID) && !adminIDs.includes(senderID)) {
      return api.sendMessage("MODE » Only bot support (NDH) can use the bot.", threadID, messageID);
    }

    if (adminPaOnly === true && !global.data.allThreadID.includes(threadID) && !adminIDs.includes(senderID)) {
      return api.sendMessage("MODE » Only admins can use bots in their own inbox.", threadID, messageID);
    }

    // --- 3. PREFIX CHECKING ---
    const threadSetting = threadData.get(threadID) || {};
    const currentPrefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : PREFIX;
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex(currentPrefix)})\\s*`);

    if (!body || !prefixRegex.test(body)) return;

    // --- 4. GROUP ADMIN-ONLY CHECK (data.json) ---
    try {
      const dataAdbox = require('../../models/commands/cache/data.json');
      var threadInf = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
      const isGroupAdmin = threadInf && threadInf.adminIDs ? threadInf.adminIDs.some(el => String(el.id) === senderID) : false;

      if (dataAdbox.adminbox && dataAdbox.adminbox[threadID] === true && !adminIDs.includes(senderID) && !isGroupAdmin && event.isGroup === true) {
        return api.sendMessage('MODE » Only group admins can use the bot in this group.', threadID, messageID);
      }
    } catch (err) {
      // Ignore cache file errors if missing
    }

    // --- 5. BAN CHECKS ---
    if (userBanned.has(senderID) || threadBanned.has(threadID) || (allowInbox === false && senderID === threadID)) {
      if (!adminIDs.includes(senderID)) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(global.getText("handleCommand", "userBanned", reason, dateAdded), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else if (threadBanned.has(threadID)) {
          const { reason, dateAdded } = threadBanned.get(threadID) || {};
          return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        }
      }
    }

    // --- 6. COMMAND PARSING ---
    const [matchedPrefix] = body.match(prefixRegex);
    const args = body.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);

    if (!command) {
      var allCommandName = Array.from(commands.keys());
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.5) {
        command = commands.get(checker.bestMatch.target);
      } else {
        return api.sendMessage(global.getText("handleCommand", "commandNotExist", checker.bestMatch.target), threadID);
      }
    }

    // --- 7. COMMAND BAN CHECK ---
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!adminIDs.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [];
        const banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name)) {
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        }
        if (banUsers.includes(command.config.name)) {
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        }
      }
    }

    // --- 8. NSFW CHECK ---
    if (command.config.commandCategory && command.config.commandCategory.toLowerCase() === 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !adminIDs.includes(senderID)) {
      return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return api.unsendMessage(info.messageID);
      }, messageID);
    }

    // --- 9. PERMISSION LEVEL CHECK ---
    var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const findGroupAdmin = threadInfoo && threadInfoo.adminIDs ? threadInfoo.adminIDs.some(el => String(el.id) === senderID) : false;

    if (ndhIDs.includes(senderID)) permssion = 2;
    if (adminIDs.includes(senderID)) permssion = 3;
    else if (!adminIDs.includes(senderID) && !ndhIDs.includes(senderID) && findGroupAdmin) permssion = 1;

    if (command.config.hasPermssion > permssion) {
      return api.sendMessage(global.getText("handleCommand", "permssionNotEnough", command.config.name), threadID, messageID);
    }

    // --- 10. COOLDOWN CHECK ---
    if (!cooldowns.has(command.config.name)) cooldowns.set(command.config.name, new Map());
    const timestamps = cooldowns.get(command.config.name);
    const expirationTime = (command.config.cooldowns || 1) * 1000;

    if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) {
      const timeLeft = ((timestamps.get(senderID) + expirationTime - dateNow) / 1000).toFixed(1);
      return api.sendMessage(`You are on cooldown! Please wait ${timeLeft} seconds before using '${command.config.name}' again.`, threadID, messageID);
    }

    // --- 11. GET TEXT FUNCTION ---
    var getText2;
    if (command.languages && typeof command.languages === 'object' && command.languages.hasOwnProperty(global.config.language)) {
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0; i--) {
          const expReg = new RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    } else {
      getText2 = () => {};
    }

    // --- 12. RUN COMMAND ---
    try {
      const Obj = {
        api,
        event,
        args,
        models,
        Users,
        Threads,
        Currencies,
        permssion,
        getText: getText2
      };

      command.run(Obj);
      timestamps.set(senderID, dateNow);

      if (DeveloperMode === true) {
        logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), Date.now() - dateNow), "[ DEV MODE ]");
      }
      return;
    } catch (e) {
      return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
    }
  };
};
