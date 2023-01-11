// const Report = require('../models/report.js')
const Discord = require("discord.js");

//Open connection
const mongoose = require("mongoose");
/*
mongoose.connect('mongodb://localhost:27017/reports')
*/

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) => {
    if (message.deletable) {
        message.delete();
    }
    if (!args[0]) {
        return message.channel
            .send("Please specify a valid member")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    let rUser =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first();
    if (!rUser) {
        return message.channel.send("Can't find that member").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    if (!args[1]) {
        return message.channel.send("Please specify a reason").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    let rReason = args.slice(1).join(" ");
    if (!rReason) {
        return message.channel.send("Please give a reason").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }

    /*
    const report = new Report({
      _id: mongoose.Types.ObjectId(),
      username: rUser.user.username,
      userID: rUser.id,
      reason: rReason,
      rUsername: message.author.username,
      rID: message.author.id,
      time: message.createdAt
    })
    */

    let Embed = new Discord.MessageEmbed()
        .setTitle(`Member Reported`)
        .setDescription(`**${rUser}** has been reported for: **${rReason}**`)
        .setColor(`#00f9ff`);
    message.channel.send(Embed);
};

module.exports.config = {
    name: "report",
    description: "Report to database",
    usage: "$report <user> <reason>",
    accessibility: "Member",
    aliases: ["report"],
};
