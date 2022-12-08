const Discord = require("discord.js");
const Profile = require("../models/profile.js");

module.exports.run = async (bot, message, args) => {
    const filter = (m) => m.author.id === message.author.id;
    let Embed = new Discord.MessageEmbed()
        .setColor("#00f9ff")
        .setTitle("Heads or tails?")
        .addField("Heads", "h", true)
        .addField("Tails", "t", true)
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
        );
    message.channel.send(Embed);
    message.channel
        .awaitMessages(filter, {
            max: 1,
            time: 10000,
        })
        .then((collected) => {
            //If user chose heads
            if (collected.first().content === "h") {
                function randomNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.random() * (max - min) + min;
                }
                //Get random num between 1-2
                let cpuMove = randomNumber(0, 2);
                //Round
                let cpuMoveRounded = Math.ceil(cpuMove);

                //If cpu chose heads, add 2
                if (cpuMoveRounded == 1) {
                    Profile.findOne(
                        {
                            userID: message.author.id,
                            serverID: message.guild.id,
                        },
                        (err, profile) => {
                            if (err) console.log(err);
                            profile.money += 2;
                            profile.save().catch((err) => console.log(err));
                        }
                    );
                    let headEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760688393256173568/mayuri_heads.png"
                        )
                        .setTitle("Congrats! It's heads!")
                        .setDescription("(You win **2** MCoins)");
                    message.channel.send(headEmbed);
                }
                //If cpu chooses tails, subtract 1
                else {
                    Profile.findOne(
                        {
                            userID: message.author.id,
                            serverID: message.guild.id,
                        },
                        (err, profile) => {
                            if (err) console.log(err);
                            profile.money -= 1;
                            profile.save().catch((err) => console.log(err));
                        }
                    );
                    let tailsEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760688415288590336/mayuri_tails.png"
                        )
                        .setTitle("Sorry, it's tails!")
                        .setDescription("(You lose **1** MCoin)");
                    message.channel.send(tailsEmbed);
                }
            }
            //If user chose tails
            if (collected.first().content === "t") {
                function randomNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.random() * (max - min) + min;
                }
                //Get random num between 1-2
                let cpuMove = randomNumber(0, 2);
                //Round
                let cpuMoveRounded = Math.ceil(cpuMove);

                //If cpu choose tails, add 2
                if (cpuMoveRounded == 2) {
                    Profile.findOne(
                        {
                            userID: message.author.id,
                            serverID: message.guild.id,
                        },
                        (err, profile) => {
                            if (err) console.log(err);
                            profile.money += 2;
                            profile.save().catch((err) => console.log(err));
                        }
                    );
                    let tailsEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760688415288590336/mayuri_tails.png"
                        )
                        .setTitle("Congrats! It's tails!")
                        .setDescription("You win **2** MCoins");
                    message.channel.send(tailsEmbed);
                }
                //If cpu chooses heads, subtract 1
                else {
                    Profile.findOne(
                        {
                            userID: message.author.id,
                            serverID: message.guild.id,
                        },
                        (err, profile) => {
                            if (err) console.log(err);
                            profile.money -= 1;
                            profile.save().catch((err) => console.log(err));
                        }
                    );
                    let headsEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760688393256173568/mayuri_heads.png"
                        )
                        .setTitle("Sorry, it's heads!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(headsEmbed);
                }
            }
        });
};

module.exports.config = {
    name: "flip",
    description: "Plays heads or tails",
    usage: "$ht",
    accessibility: "Member",
    aliases: ["ht", "headstails"],
};
