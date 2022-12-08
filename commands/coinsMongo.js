const Discord = require("discord.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Profile = require("../models/profile.js");

module.exports.run = async (bot, message, args) => {
    let member =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.member;

    Profile.findOne(
        {
            userID: member.id,
            serverID: member.guild.id,
        },
        (err, profile) => {
            if (err) console.log(err);

            let Embed = new Discord.MessageEmbed()
                .setAuthor(member.user.username)
                .setColor("#00f9ff")
                .setThumbnail(member.displayAvatarURL);

            Embed.setDescription("You have " + profile.money + " coins!");
            return message.channel.send(Embed);
        }
    );
};

module.exports.config = {
    name: "coins",
    description: "Shows coins in mongodb",
    usage: "$coins",
    accessibility: "Member",
    aliases: ["coins"],
};
