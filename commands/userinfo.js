const Discord = require("discord.js");
const moment = require("moment");
const Profile = require("../models/profile.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
});

module.exports.run = async (bot, message, args) => {
    const Presence = {
        online: "Online",
        dnd: "Do Not Disturb",
        idle: "Idle",
        offline: "Offline",
    };
    //If no argument
    if (!args[0]) {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.guild.members.cache.get(args[0]) || message.member;

        //Status
        let status = Presence[member.presence.status];
        console.log(status);

        //Profile
        Profile.findOne(
            {
                userID: member.id,
                serverID: message.guild.id,
            },
            (err, profile) => {
                if (err) console.log(err);
                if (!profile) {
                    const newProfile = new Profile({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: 0,
                        xp: 0,
                        level: 1,
                    });
                    newProfile.save().catch((err) => console.log(err));
                }
                const Embed = new Discord.MessageEmbed()
                    .setAuthor(member.user.tag)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor("#00f9ff")
                    .addField("Member ID", member.id)
                    .addField("Status", status)
                    .addField("Level", profile.level)
                    .addField(
                        "Creation",
                        `**Date:** ${moment(
                            member.user.createdTimestamp
                        ).format("LL")} \n **Time:** ${moment(
                            member.user.createdTimestamp
                        ).format("LT")} \n **How long ago:** ${moment(
                            member.user.createdTimestamp
                        ).fromNow()}`
                    )
                    .addField("Roles", `<@&${member._roles.join("> <@&")}>`)
                    .addField("Coins", profile.money);
                message.channel.send(Embed);
            }
        );
    }
    //If user is specified
    if (args[0]) {
        let member = message.mentions.members.first();
        let memberID = member.id;

        //Status
        let status = Presence[member.presence.status];
        console.log(status);
        let game = member.presence.game;

        //MongoDB coins
        Profile.findOne(
            {
                userID: memberID,
                serverID: message.guild.id,
            },
            (err, profile) => {
                if (err) console.log(err);
                if (!profile) {
                    const newProfile = new Profile({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: 0,
                        xp: 0,
                        level: 1,
                    });
                    newProfile.save().catch((err) => console.log(err));
                }
                const Embed = new Discord.MessageEmbed()
                    .setAuthor(member.user.tag)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor("#00f9ff")
                    .addField("Member ID", member.id)
                    .addField("Status", status)
                    .addField("Level", profile.level)
                    .addField(
                        "Creation",
                        `**Date:** ${moment(
                            member.user.createdTimestamp
                        ).format("LL")} \n **Time:** ${moment(
                            member.user.createdTimestamp
                        ).format("LT")} \n **How long ago:** ${moment(
                            member.user.createdTimestamp
                        ).fromNow()}`
                    )
                    .addField("Roles", `<@&${member._roles.join("> <@&")}>`)
                    .addField("Coins", profile.money);
                message.channel.send(Embed);
            }
        );
    }
};

module.exports.config = {
    name: "userinfo",
    description: "Shows stats of specified user",
    usage: "$userinfo <user>",
    accessibility: "Member",
    aliases: ["userinfo"],
};
