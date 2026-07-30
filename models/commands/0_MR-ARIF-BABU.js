module.exports.config = {
  name: "babu",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Arif dp",
  usePrefix: true,
  commandCategory: "Random-IMG",
  usages: "arif babu",
  cooldowns: 2,
  dependencies: {
    "axios":"",
    "fs-extra":""
  }
};

module.exports.run = async({api, event}) => {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  
  // Create a unique filename based on the current timestamp to avoid collisions
  const path = __dirname + `/cache/${Date.now()}.jpg`;
  
  var link = [
    "https://i.imgur.com/A1Qift2.jpg","https://i.imgur.com/8WUF7HJ.jpg","https://i.imgur.com/mLJw7tc.jpg",
    "https://i.imgur.com/a1NPl9F.jpg","https://i.imgur.com/nBYDoNT.jpg","https://i.imgur.com/coGeSau.jpg",
    "https://i.imgur.com/2JjkK0l.jpg","https://i.imgur.com/7qIldX1.jpg","https://i.imgur.com/YpDPpq5.jpg",
    "https://i.imgur.com/c1aaVpd.jpg","https://i.imgur.com/U4eQKKS.jpg","https://i.imgur.com/R9W8CgK.jpg",
    "https://i.imgur.com/xXGtR1H.jpg","https://i.imgur.com/4l2CyaF.jpg","https://i.imgur.com/GZyFV0o.jpg"
  ];
  
  const selectedLink = link[Math.floor(Math.random() * link.length)];
  
  try {
    const response = await axios.get(selectedLink, { responseType: 'stream' });
    const writer = fs.createWriteStream(path);
    
    response.data.pipe(writer);
    
    writer.on('finish', () => {
      api.sendMessage({
        body: `┏━━━━━┓\n     ARIF-BABU                    ✧═══•❁😛❁•═══✧\n┗━━━━━┛\n\nDEKH LO MARA BOSS ARIF BABU KO SABSE ALAG MASOOM SA CHEHRA BHOLE SE SURAT AANKH ME PYAR DIL ME BUKHAR ♥️`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path));
    });
    
  } catch (err) {
    console.error("Error downloading image:", err);
    api.sendMessage("Image load hone mein error aaya, dobara koshish karein.", event.threadID);
  }
};
