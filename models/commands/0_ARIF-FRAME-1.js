module.exports.config = {
    name: "fram",
    version: "7.3.2",
    hasPermssion: 0,
    credits: "ARIF BABU", 
    description: "FIXED VERSION",
    commandCategory: "PROFILE DP FRAME",
    usages: "PREFIX MENTIONS or REPLY",
    cooldowns: 5,
    dependencies: {
        "axios": "latest",
        "fs-extra": "latest",
        "path": "latest",
        "jimp": "latest"
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'frame.jpeg');
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/jcoNOZ2.jpg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let batgiam_img = await jimp.read(__root + "/frame.jpeg");
    let pathImg = __root + `/batman${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    // Direct URL se image fetch kar rahe hain
    const getAvatar = async (uid) => {
        const url = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    };

    fs.writeFileSync(avatarOne, Buffer.from(await getAvatar(one)));
    fs.writeFileSync(avatarTwo, Buffer.from(await getAvatar(two)));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    
    batgiam_img.composite(circleOne.resize(230, 230), 540, 120).composite(circleTwo.resize(350, 350), 65, 65);
    
    await batgiam_img.writeAsync(pathImg);
    
    if(fs.existsSync(avatarOne)) fs.unlinkSync(avatarOne);
    if(fs.existsSync(avatarTwo)) fs.unlinkSync(avatarTwo);
    
    return pathImg;
}

async function circle(image) {
    const jimp = require("jimp");
    const img = await jimp.read(image);
    img.circle();
    return await img.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {    
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    
    const mention = Object.keys(event.mentions);
    const replyID = event.messageReply ? event.messageReply.senderID : null;

    const targetID = mention[0] || replyID;

    if (!targetID) {
        return api.sendMessage("❌ Please kisi ko mention karo ya phir kisi ke message par reply karo.", threadID, messageID);
    }

    try {
        const path = await makeImage({ one: senderID, two: targetID });
        api.sendMessage({ attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (e) {
        console.error("Error in Fram Command:", e);
        api.sendMessage("❌ Error: Image nahi ban payi. Shayad ID invalid hai ya API limit khatam ho gayi hai.", threadID, messageID);
    }
}
