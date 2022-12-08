const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //Poll
    if (message.deletable) {
        message.delete();
    }
    let pollQues = args.slice(0).join(" ");
    //If no argument
    if (!pollQues[1]) {
        return message.channel.send("Please specify what you want to ask");
    } else {
        let Embed = new Discord.MessageEmbed()
            .setTitle("Poll")
            .setColor("#00f9ff")
            .setDescription(pollQues);
        let msgEmbed = await message.channel.send(Embed);
        msgEmbed.react("👍");
        msgEmbed.react("👎");
    }
};

module.exports.config = {
    name: "poll",
    description: "Replies with picture of topic",
    usage: "$poll <topic>",
    accessibility: "Member",
    aliases: ["poll"],
};
