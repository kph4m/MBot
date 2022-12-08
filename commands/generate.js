const Discord = require("discord.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
});

const Profile = require("../models/profile.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send("You do not have admin permissions");
    }
    if (!args[0]) {
        return message.reply(
            "Please specify how many coins you want generated"
        );
    }

    let coinsGen = parseInt(args[0]);

    //Updates mongodb
    Profile.findOne(
        {
            userID: message.author.id,
            serverID: message.guild.id,
        },
        (err, profile) => {
            if (err) console.log(err);
            profile.money += coinsGen;
            profile.save().catch((err) => console.log(err));
        }
    );

    let Embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} has generated ${coinsGen} coins`)
        .setColor("#00f9ff");
    message.channel.send(Embed);
};

module.exports.config = {
    name: "generate",
    description: "Generates coins to a user",
    usage: "$generate <amount of coins>",
    accessibility: "Admin",
    aliases: ["generate"],
};
