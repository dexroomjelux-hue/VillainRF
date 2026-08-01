module.exports.config = {
    name: "fram",
    version: "7.3.1",
    hasPermssion: 0,
    credits: "ARIF BABU", 
    description: "THIS BOT WAS MADE BY MR ARIF BABU",
    commandCategory: "PROFILE DP FRAME",
    usages: "PREFIX MENTIONS or REPLY",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
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
    let pathImg = __root + `/batman${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.jpeg`;
    let avatarTwo = __root + `/avt_${two}.jpeg`;
    
    // WARNING: Apka Access Token yahan hardcoded hai, ise secure rakhein!
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    
    batgiam_img.composite(circleOne.resize(230, 230), 540, 120).composite(circleTwo.resize(350, 350), 65, 65);
    
    let raw = await batgiam_img.getBufferAsync("image/jpeg");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
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
    
    // Check if mention OR reply
    const mention = Object.keys(event.mentions);
    const replyID = event.messageReply ? event.messageReply.senderID : null;

    let targetID;

    if (mention.length > 0) {
        targetID = mention[0];
    } else if (replyID) {
        targetID = replyID;
    } else {
        return api.sendMessage("❌ Please kisi ko mention karo ya phir kisi ke message par reply karo.", threadID, messageID);
    }

    const one = senderID;
    const two = targetID;
    
    return makeImage({ one, two }).then(path => 
        api.sendMessage({ body: "♥️♥️♥️", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID)
    ).catch(e => {
        console.log(e);
        api.sendMessage("Error a raha hai, shayad user ki profile private hai.", threadID, messageID);
    });
}
