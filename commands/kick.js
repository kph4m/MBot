const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.deletable) {
        message.delete();
    }
    //If command is run on right channel
    if (!message.member.permissions.has("KICK_MEMBERS")) {
        return message.channel
            .send("You do not have kick permissions")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    //First argument: user you want to kick
    if (!args[0]) {
        return message.channel
            .send("Please specify who you want to kick")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    //Kick user by id or ping
    let Member =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first();

    //If member doesn't exist in server
    if (!Member) {
        return message.channel.send("Invalid user").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    let Reason = args.slice(1).join(" ");

    //Second argument: reason for kick
    if (!args[1]) {
        return message.channel.send("Please include a reason").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    if (!Reason) {
        return message.channel.send("Please include a reason").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    if (!Member.kickable) {
        return message.channel
            .send("Cannot kick user, they may have a higher role than me")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    Member.kick(Reason);
    let Embed = new Discord.MessageEmbed()
        .setTitle(`Member has been kicked`)
        .setDescription(
            `You have kicked user **${Member}** from this server for: **${Reason}**`
        )
        .setColor(`#00f9ff`);
    message.channel.send(Embed);
};

module.exports.config = {
    name: "kick",
    description: "Kicks specified user and gives reason",
    usage: "$kick <member id> <reason>",
    accessibility: "Admin",
    aliases: ["kick"],
};
