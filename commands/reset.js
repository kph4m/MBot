const Discord = require("discord.js");
const Profile = require("../models/profile.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) => {
    const filter = (m) => m.author.id === message.author.id;
    let Embed = new Discord.MessageEmbed()
        .setColor("#00f9ff")
        .setTitle("Are you sure you want to reset your coins to 0?")
        .addField("Yes", "y", true)
        .addField("No", "n", true)
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
        );
    message.channel.send(Embed);
    //message.reply("Are you sure you want to reset your coins? (y/n)")
    message.channel
        .awaitMessages(filter, {
            max: 1,
            time: 10000,
        })
        .then((collected) => {
            //Cancel if user replies no
            if (collected.first().content === "n") {
                return message.reply("Canceled!");
            }
            //Reset if user replies yes
            if (collected.first().content === "y") {
                let Embed = new Discord.MessageEmbed()
                    .setTitle(
                        `${message.author.username} has reset their coins`
                    )
                    .setColor("#00f9ff");
                message.channel.send(Embed);

                Profile.findOne(
                    {
                        userID: message.author.id,
                        serverID: message.guild.id,
                    },
                    (err, profile) => {
                        if (err) console.log(err);
                        profile.money -= profile.money;
                        profile.save().catch((err) => console.log(err));
                    }
                );
            }
            //If they respond with unidentified characters
            else {
                message.reply("Please respond with y or n");
                message.channel
                    .awaitMessages(filter, {
                        max: 1,
                        time: 10000,
                    })
                    .then((collected) => {
                        //Cancel if user replies no
                        if (collected.first().content === "n") {
                            return message.reply("Canceled!");
                        }
                        //Reset if user replies yes
                        if (collected.first().content === "y") {
                            let Embed = new Discord.MessageEmbed()
                                .setTitle(
                                    `${message.author.username} has reset their coins`
                                )
                                .setColor("#00f9ff");
                            message.channel.send(Embed);

                            Profile.findOne(
                                {
                                    userID: message.author.id,
                                    serverID: message.guild.id,
                                },
                                (err, profile) => {
                                    if (err) console.log(err);
                                    profile.money -= profile.money;
                                    profile
                                        .save()
                                        .catch((err) => console.log(err));
                                }
                            );
                        }
                    });
            }
        });
};
module.exports.config = {
    name: "reset",
    description: "Resets users coins if they respond y, cancels if no",
    usage: "$reset",
    accessibility: "Member",
    aliases: ["reset"],
};
