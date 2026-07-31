module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "2.1.0",
  credits: "ARIF BABU",
  description: "Join notification with Imgur image",
  dependencies: {
    "fs-extra": "",
    "request": ""
  }
};

module.exports.run = async function ({ api, event }) {
  try {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const { threadID, logMessageData } = event;

    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Karachi"
    });

    const botName = global.config.BOTNAME || "ARIF BABU BOT";

    /* 🖼️ IMGUR LINKS */
    const imgurLinks = [
      "https://i.ibb.co/7NR8XTX9/20260731-020746.jpg",
      "https://i.ibb.co/r2kFyvZ9/20260731-020808.jpg",
      "https://i.ibb.co/V0Yg6HdT/20260731-020832.jpg",
      "https://i.ibb.co/mVJDWNxc/20260731-020843.jpg",
      "https://i.ibb.co/3mrx7ZHf/20260731-020903.jpg",
      "https://i.ibb.co/27CcM1vc/20260731-020923.jpg",
      "https://i.ibb.co/twnsg9Fs/20260731-020938.jpg",
      "https://i.ibb.co/0RyJ1t5S/20260731-020953.jpg"
    ];

    const imgPath = __dirname + "/cache/join.jpg";
    const randomImg = imgurLinks[Math.floor(Math.random() * imgurLinks.length)];

    /* 🤖 BOT ADDED */
    if (logMessageData.addedParticipants.some(
      i => i.userFbId == api.getCurrentUserID()
    )) {

      api.changeNickname(
        `${botName} 【 ${global.config.PREFIX} 】`,
        threadID,
        api.getCurrentUserID()
      );

      return request(randomImg)
        .pipe(fs.createWriteStream(imgPath))
        .on("close", () => {
          api.sendMessage(
            {
              body:
`🤖 Bot Connected Successfully 🙂

┏━━━━━━━━━━━━━━━┓
┃ 🤖 Bot Name : ${botName}
┃ 🔑 Prefix  : ${global.config.PREFIX}
┃ ⏰ Time    : ${time}
┗━━━━━━━━━━━━━━━┛

Owner : OWNER-MAX 🫰
Type #help`,
              attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => fs.unlinkSync(imgPath)
          );
        });
    }

    /* 👤 USER ADDED */
    const info = await api.getThreadInfo(threadID);
    const threadName = info.threadName || "Group Chat";
    const total = info.participantIDs.length;

    for (const user of logMessageData.addedParticipants) {
      const userID = user.userFbId;
      if (userID == api.getCurrentUserID()) continue;

      const userInfo = await api.getUserInfo(userID);
      const name = userInfo[userID].name;

      return request(randomImg)
        .pipe(fs.createWriteStream(imgPath))
        .on("close", () => {
          api.sendMessage(
            {
              body:
`Welcome, ${name} 🙂  

┏━━━━━━━━━━━━━━━┓
┃ 👤 Member : ${name}
┃ 🏰 Group  : ${threadName}
┃ 👥 Total  : ${total}
┃ ⏰ Time   : ${time}
┗━━━━━━━━━━━━━━━┛

Enjoy your stay 💖`,
              attachment: fs.createReadStream(imgPath),
              mentions: [{ tag: name, id: userID }]
            },
            threadID,
            () => fs.unlinkSync(imgPath)
          );
        });
    }

  } catch (err) {
    console.log("JOIN NOTI ERROR:", err);
  }
};
