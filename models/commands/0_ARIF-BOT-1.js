const fs = global.nodemodule["fs-extra"];

module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "MADE BY ARIF BABU",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const input = body.toLowerCase();

  // Optimized response function
  const sendMessage = (msg) => api.sendMessage(msg, threadID);

  // Main logic for triggers
  if (["chutiya bot", "chutiye bot", "chumtiya bot", "chumtiye bot"].includes(input)) {
    return sendMessage("Hmm... Tu Chutiya PhLe Ungli Kyun Ki Chomu 😾");
  }

  if (["👍", "👍🏻"].includes(input)) {
    return sendMessage("🌊⚡••Aɽɛɧ Aɗɪ Ɱɑƞɑⱱ ʑɵɵ ꌗɛ Ɓɒɧɒɽ Ƙɑɪʂɛ ••😹💨Agɣɑ Ƭu→Fɪɽʂɛ ʑɵɵ Ɱ Jɒ Ɓɑɧɒɽ Ƙɣɑ Ƙɒɽ Ɽɧɑ Ɦɑɪ↗↘••🏔️🍁");
  }

  if (input === "😴") return sendMessage("So jao, sapno mein main aaunga! 🌙✨");
  if (["aruh", "aru"].includes(input)) return sendMessage("Aruh Teri Baji Hai Ussy Door Raha Karo Bachy 🤫");
  if (input === "🤡") return sendMessage("Mujhe joker mat samjho, kaam pe dhyan do! 🎭");
  if (input === "🔥") return sendMessage("Aag laga di! Aur kya haal-chaal hain? 😎");
  if (input === "😎") return sendMessage("Style toh dekho! 😎 Kaun hai yeh stylish banda?");
  if (input === "🥺") return sendMessage("Itni masoomiyat? Kya chahiye tumhe mujhse? 😇");
  if (input === "✨") return sendMessage("Sparkle lekar aaye ho? Bilkul meri tarah! 🌟");
  if (input === "👻") return sendMessage("Boo! Dar gaye kya? Main toh bas check kar raha tha! 👻");
  if (input === "🙌") return sendMessage("Bilkul sahi baat kahi hai! High-five! 🙌");
  if (input === "💪") return sendMessage("Dum hai toh dikhao! Aur kya chal raha hai? 💪🔥");
  if (input === "❄️") return sendMessage("Itni thand? Lagta hai ab garma-garam chai chahiye! ☕❄️");
  if (input === "🎮") return sendMessage("Game shuru karein? Controller uthao! 🎮🕹️");
  if (input === "🎉") return sendMessage("Party time! Kya khushi ka mauka hai? 🎉🥳");
  if (input === "💔") return sendMessage("Dil mat todo yaar, sab thik ho jayega! 🩹❤️");
  if (input === "🤫") return sendMessage("Chup raho, koi sun lega toh raaz khul jayega! 🤫🤐");
  if (input === "👀") return sendMessage("Kya dekh rahe ho? Kuch naya hua kya? 👀🧐");
  if (input === "✈️") return sendMessage("Kahan ki flight pakad li? Mujhe bhi sath le chalo! ✈️🌍");
  if (input === "🫡") return sendMessage("Jee Sarkar! Hukam kijiye, kya khidmat karun? 🫡👮‍♂️");
  if (input === "🎵") return sendMessage("Sangeet ka mahaul hai! Konsa gana sun rahe ho? 🎧🎶");
  if (input === "🍕") return sendMessage("Pizza ka naam liya? Mere liye bhi ek slice chhodna! 🍕😋");
  if (input === "🚀") return sendMessage("Rocket ki speed se chal rahe ho! Kahan pahunchna hai? 🚀🌌");
  if (input === "🧠") return sendMessage("Dimag ka istemal kiya? Waah, kabhi kabhi kar liya karo! 🧠💡");
  if (input === "🦁") return sendMessage("Sher ki dahad! Aaj toh pura jungle hil gaya! 🦁🔥");
  if (input === "🔋") return sendMessage("Battery low hai? Jaldi charge karo, warna main band ho jaunga! 🔋🔌");
  if (input === "☔") return sendMessage("Baarish ho rahi hai? Chhatri sambhal kar rakho! ☔🌧️");
  if (input === "🥊") return sendMessage("Ring mein aana hai? Pehle gloves pehno! 🥊💥");
  if (input === "📚") return sendMessage("Padhai likhai? Wah! Kitab ka naam toh batao. 📚🤓");
  if (input === "🍹") return sendMessage("Garmi bahut hai, thanda juice pi lo! 🍹🧊");
  if (input === "🎯") return sendMessage("Nishana sahi lagaya hai! Bilkul exact! 🎯🤩");
  if (input === "⏳") return sendMessage("Waqt nikal raha hai, jaldi kaam khatam karo! ⏳⏰");
  if (input === "💎") return sendMessage("Itna chamak rahe ho? Lagta hai diamond mil gaya! 💎✨");
  if (input === "🛠️") return sendMessage("Kuch toot gaya kya? Main hoon na, fix kar denge! 🛠️🔧");
  if (input === "🎈") return sendMessage("Balloon uda rahe ho? Chalo saath mein celebrations karte hain! 🎈🥳");

  if (input === "🤮") return sendMessage("Konsa mahina chal raha hai 😝");
  if (input === "🤗") return sendMessage("Hug me baby ☺️");
  if (["sim", "simsimi"].includes(input)) return sendMessage("Prefix Kon Lagayega? Pehle Prefix Lagao Fir Likho Sim");
  if (["hi", "hello", "hlw", "helo"].includes(input)) return sendMessage("Hello, Hi, Bye bye. Ye sab ke alawa kuch bolna nhi ata Kya tujhe");
  if (input === "bc") return sendMessage("Ye Bc Kya HoTa Hai 🤔 ");
  if (["lol", "lol bot"].includes(input)) return sendMessage("Khud ko Kya LeGend Samjhte Ho 😂");
  if (["morning", "good morning"].includes(input)) return sendMessage("Ꮆɵɵɗ Ɱ❍ɽƞɪɪƞɠ Ɛⱱɛɽɣ❍ƞɛ🌅, Ƭɽɣ ꌗɵɱɛ Cɵffɛɛ ❍ɽ Ƭɛɑ Ƭ❍ Ꮗɑҡɛ Uƥ☕✨💫");
  if (["anyone", "any"].includes(input)) return sendMessage("Main Hun Naw Jaaneman ❤️");
  if (["max", "owner max", "owner"].includes(input)) return sendMessage("Busy HoGa Work Me Main t0o Hun Naw 😘");
  if (input === "owner") return sendMessage("༻𝐎𝐖𝐍𝐄𝐑:- ☞OWNER-MAX☜ ༺ ༒𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 〠 𝓟𝓾𝓻𝓿 〠.༒ ༒𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝༒:- ☞https://www.facebook.com/profile.php?id=61553634015672&mibextid=kFxxJD☜");
  if (["tumhe banaya kon hai", "tumko banaya kisne"].includes(input)) return sendMessage("Owner max  ♥️ My Creator. He loves me & Edit Me Daily. Ye Bot Sirf Owner k Liye h. Mujhe Aap logo ko Hasane k liye banya gya h Toh Muh Ladkaye Mat Rakkha Karo. Har Waqt Haste Raho.");
  if (["bot admin", "bot ka admin kon ha"].includes(input)) return sendMessage("He is OWNER-MAX. He Gives his name Arif everywhare");
  if (["joya bhabhi", "chudail"].includes(input)) return sendMessage("🤍✨Ɣɑɧ Ƭ❍ Ɱɛɽɪ ꌗɧɛɦʐɑɑɗɪ Ɦɑɪ🦢🌸 Ɱɛɽɪ Jɑɑɳ Ɦɑɪ💞🌿 Ɱɛɽɪ Ɗɪɭ Ƙɪ Ɗɧɑɗƙɑɳ ɧɑɪ....😍♥️");
  if (["shadi karoge", "mujhse shadi karoge?"].includes(input)) return sendMessage("hanji, karunga lekin baccha. apke pet m hoga. manjur h?");
  if (["chup", "stop", "chup ho ja", "chup kar"].includes(input)) return sendMessage("Nhi rahunga. 😼 Mujhe Bolna H. Tumhe Koi Haq nhi Mujhe Chup Karane ka. Mera Zuban. M Bolungi");
  if (["bts", "btc"].includes(input)) return sendMessage("Tu H Btc. Bhos DK");
  if (["malik se bakchodi", "malik se backchodi", "malkin se bakchodi", "malkin se backchodi"].includes(input)) return sendMessage("srry malik maaf kr do ab nhi kruga 🥺🙏");
  if (["gand", "gandu", "lund", "land"].includes(input)) return sendMessage("Gand m jyada khujli h toh banana 🍌 under le le. :))))");
  if (["chumma de", "kiss me"].includes(input)) return sendMessage("️Kis khushi me, Me sirf Apni gf ko kiss karta hu");
  if (["nice", "thank you", "thank you bot", "thank you maliha"].includes(input)) return sendMessage("️M hu hi itni Accha. sab log Tarref karte hai meri.");
  
  // Emotional triggers
  if (["😡", "😤", "😠", "🤬", "😾"].includes(input)) return sendMessage("️🥺 M toh Sirf Mazak Kr Rhi Thi🥺. Gussa Mat Karo. Ek Chummi Lo aur Shant Raho 😘");
  if (["😞", "😔", "😣", "☹️", "😟", "😩", "😖", "😫", "😦", "😧", "😥", "😓", "😰"].includes(input)) return sendMessage("️Kya huva, Sad kyu ho, Mujhe batao");
  if (["hm", "hmm"].includes(input)) return sendMessage("️Hmm Hmm Na Karke Sidha Sidha bolo. Hey Marry Me🙈");
  if (["😢", "😭", "🥺", "🥹"].includes(input)) return sendMessage("️Kya huva, Ro kyu rahe ho, Me huna to phir kyu rona. Ruko me abhi chocolate 🍫 deta hu likho ☞Chocolate☜");
  if (["😷", "🤕", "🤧", "🤒"].includes(input)) return sendMessage("️Kya huva, Tabiyat kharab hai kya, Mujhe batao me abhi medicine 💊💉 le aata hu😇");
  if (["name", "naam", "nam"].includes(input)) return sendMessage("️Name m kya rakkha h. tum kam pe dhyan do.");
  if (["bot k bacche", "bot ke bacche"].includes(input)) return sendMessage("️meri baccha toh Tumhare Pet Me Hai.");
  if (["pic do", "photo do"].includes(input)) return sendMessage("️Me toh Andha Hu Dekh nhi sakta");
  if (["kya hua", "kya hua", "kya hua"].includes(input)) return sendMessage("️KUCH NHI BABU 😇");
  if (["shahzan kon h", "cp tatta kon h"].includes(input)) return sendMessage("️Chudi Hui Randi ha Sbse Chudwati ha🤣");
  if (["bot banake do", "mujhe bhi chaiye"].includes(input)) return sendMessage("️Khud hi karlona. tumhe kya kuch nhi ata h?");
  if (["🙂", "🙃"].includes(input)) return sendMessage("️Man Toh Accha H Nhi. Kam  Se Kam Shakal Toh Accha Karlo Meri Jaan");
  if (input === "🤥") return sendMessage("️Bhai teri to naak hi etni lambi hai uski jarurat hi nahi padti hogi tujhe to🤭🤭🤭🤭");
  if (["🤔", "🤨"].includes(input)) return sendMessage("️Kya soch rahe ho etna 🤨");
  if (input === "🥴") return sendMessage("️Oye nashedi 😂😂😂");
  if (input === "😶") return sendMessage("️Are are lips kaha gaye gf/bf ke sath kiss karte time usi ne to nahi kha liye 😜😜");
  if (input === "😉") return sendMessage("️Aankh kyu maar rahe ho, Me bahut shareef hu🥺");
  if (["😱", "😨"].includes(input)) return sendMessage("️Kya huva bhoot dekh liya kya 👻👻");
  if (["😒", "🙄"].includes(input)) return sendMessage("️️𝐓𝐢𝐫𝐜𝐡𝐢 𝐧𝐚𝐳𝐚𝐫𝐢𝐲𝐚 𝐦𝐨𝐫𝐢 𝐡𝐚𝐚𝐲𝐞 𝐡𝐚𝐚𝐲𝐞 𝐡𝐚𝐚𝐲𝐞 🙈");
  if (["nobody loves me", "nobody love me", "koi pyar nhi karta"].includes(input)) return sendMessage("️Me huna baby mere pass aao 🥰🤗. Me karunga na aapko payar 🙈 (londo tum dur hi rahna saalo 😑)");
  if (["🤦🏻‍♂", "🤦🏻‍♀"].includes(input)) return sendMessage("Are apne muh pe kyu maar rahe ho, Mujhe batao kya huva?😬");
  if (["😂", "😁", "😆", "🤣", "😸", "😹"].includes(input)) return sendMessage("Enni hasi kyu aa rahi hai🤣, Es hasi ke piche ka raaz kya hai batao");
  if (["🥰", "😍", "😻", "❤️"].includes(input)) return sendMessage("🦋🌿Aƞƙɧ❍ Ɱɛ Ƥɣɑɽ͢  Ɗɪɭɱɛ Ƙɧuɱɑɽ🌬️🌍 ••Ƥɣɑɽ Ƭ❍ɧ Ƞɧɪ Ƙɒɽ ɭɪɣɑ Ɱuȷɧʂɛ>³••🕊️🍎😍");
  if (["kese ho", "kaise ho", "kese ho ji", "how are you", "kesy ho ap?", "how are you?"].includes(input)) return sendMessage("M Tabhi Accha hota hu, Jab Apko Hasta Huye Dekhta hu☺️");
  if (input === "is the bot sad") return sendMessage("Why can't I be sad because of everyone <3 love you <3");
  if (input === "does the bot love you") return sendMessage("Yes I love you and everyone so much");
  if (input === "bot goes to sleep") return sendMessage("I'm a bot, you're the one who should go to sleep <3");
  if (input === "🤖") return sendMessage("Saalo chidda rahe ho mujhe");
  if (["has the bot eaten yet", "bot an comrade"].includes(input)) return sendMessage("I'm full when I see you eat <3");
  if (["lob you", "i lob you"].includes(input)) return sendMessage("Lob You too");
  if (input === "does the bot love me") return sendMessage("Yes <3");
  if (["&fuck", "&fuck"].includes(input)) return sendMessage("🏔️🏝️Max Ƞɛ ꌗƥɛçɪɑɭɭɣ Ƭuɱ 🌊🪺Jɑɪʂɛ Ƭɧɑɽƙɪɣɵ Ƙɛ Ɬɪɣɛ•• 🏞️🌬️Ɣɑɧ çɵɱɱɑƞɗ Ɦɑʈɑ Ɗɪɣɑ Ɦɑɪ↗↘ Sɵɽɽɣ Ɠɣuʂ••😹🫶");
  if (["ami max", "ami diya", "main amrita", "main max", "main diya"].includes(input)) return sendMessage("🕊️🍎...Aɭɛ Ɱɛɹɛ Ɓɑɓɣ Ƙɛʂɛ Ɦɵ ɑɑp😚🍒");
}

module.exports.run = function({ api, event, client, __GLOBAL }) { };
