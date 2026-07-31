module.exports.config = {
  name: "ignoreall",
  version: "1.0.0",
  hasPermssion: 2, // 2 ka matlab Admin/Owner hi use kar sakta hai
  credits: "OWNER-MAX",
  description: "Sabhi users ko ignore karne ke liye",
  commandCategory: "Admin",
  usages: "ignoreall [on/off]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID } = event;
  const input = args[0] ? args[0].toLowerCase() : "";

  if (input === "on") {
    // Thread data mein ignoreAll true save kar rahe hain
    await Threads.setData(threadID, { ignoreAll: true });
    return api.sendMessage("✅ Ignore All Mode ON ho gaya hai. Ab sabhi users ignore honge.", threadID);
  } 
  else if (input === "off") {
    // Thread data mein ignoreAll false save kar rahe hain
    await Threads.setData(threadID, { ignoreAll: false });
    return api.sendMessage("❌ Ignore All Mode OFF ho gaya hai.", threadID);
  } 
  else {
    return api.sendMessage("Syntax sahi nahi hai! Use: ignoreall on / off", threadID);
  }
};
