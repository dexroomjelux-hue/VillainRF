module.exports.config = {
  name: "ARIF-RANKUP-CARD",
  version: "10.1.0-HD-WHITE",
  hasPermssion: 1,
  credits: "ARIF BABU",
  description: "HD VIP Rankup Card (White Text)",
  commandCategory: "LEVEL UP",
  dependencies: {
    "canvas": "",
    "axios": "",
    "fs-extra": ""
  },
  cooldowns: 2
};

module.exports.handleEvent = async function ({ api, event, Currencies, Users, Threads }) {
  const { threadID, senderID } = event;
  
  // 1. Thread check: Kya rankup is thread mein ON hai?
  const threadData = (await Threads.getData(threadID)).data || {};
  if (threadData.rankup === false) return;

  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const { createCanvas, loadImage } = require("canvas");

  // 2. EXP Update logic
  let dataExp = (await Currencies.getData(senderID)) || {};
  let exp = dataExp.exp || 0;
  exp += 1;
  
  const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3)) + 1) / 2);
  const oldLevel = Math.floor((Math.sqrt(1 + (4 * (exp - 1) / 3)) + 1) / 2);

  // Sirf tabhi photo bhejein agar level badha ho
  if (curLevel > oldLevel) {
    const name = await Users.getNameUser(senderID);
    
    // Avatar fetch
    const info = await api.getUserInfo(senderID);
    const avatarURL = info[senderID].profileUrl;
    const avatarData = await axios.get(avatarURL, { responseType: "arraybuffer" });
    const avatar = await loadImage(Buffer.from(avatarData.data));

    // Canvas Draw
    const canvas = createCanvas(1200, 500);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#020b0a"; // Background
    ctx.fillRect(0, 0, 1200, 500);
    
    // Draw Avatar
    ctx.beginPath();
    ctx.arc(240, 250, 130, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 110, 120, 260, 260);
    ctx.restore();

    // Text
    ctx.font = "bold 72px Sans";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("LEVEL UP!", 430, 150);
    ctx.font = "bold 48px Sans";
    ctx.fillStyle = "#22ff88";
    ctx.fillText(name, 430, 225);
    ctx.font = "38px Sans";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Aap level ${curLevel} par pohanch gaye hain!`, 430, 290);

    const imgPath = __dirname + "/cache/rankup.png";
    fs.writeFileSync(imgPath, canvas.toBuffer());

    api.sendMessage(
      { body: `🎉 CONGRATS ${name}! Aapka Level ${curLevel} ho gaya hai! 🔥`, attachment: fs.createReadStream(imgPath) },
      threadID,
      () => fs.unlinkSync(imgPath)
    );
  }

  // Database update
  await Currencies.setData(senderID, { exp });
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID } = event;
  let data = (await Threads.getData(threadID)).data || {};
  
  data.rankup = data.rankup === false ? true : false;
  await Threads.setData(threadID, { data });
  
  return api.sendMessage(
    data.rankup ? "👑 VIP Rankup Card ON ho gaya!" : "❌ VIP Rankup Card OFF ho gaya!",
    threadID
  );
};
