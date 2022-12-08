const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (message.deletable) {
        message.delete();
    }
    //If command is run on correct channel
    if (!message.member.permissions.has("BAN_MEMBERS")) {
        return message.channel
            .send("You do not have ban permissions!")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    //First argument: user to be kicked
    if (!args[0]) {
        return message.channel.send("Please specify who you want to ban!");
    }
    //Ban user by id or ping
    let Member =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first();
    if (!Member) {
        return message.channel.send("Invalid user").then((msg) => {
            msg.delete({ timeout: 5000 });
        });
    }
    let Reason = args.slice(1).join(" ");
    //Second argument: reason for banning
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
    if (!Member.bannable) {
        return message.channel
            .send("Cannot ban user, they may have a higher role than me!")
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
    Member.ban(Reason);
    let Embed = new Discord.MessageEmbed()
        .setTitle(`Member has been banned`)
        .setDescription(
            `You have banned user **${Member}** from this server for: **${Reason}**`
        )
        .setColor(`#00f9ff`);
    message.channel.send(Embed);
};

module.exports.config = {
    name: "ban",
    description: "Bans specified user and gives reason",
    usage: "$ban <member id> <reason>",
    accessibility: "Admin",
    aliases: ["ban"],
};
