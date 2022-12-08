const Discord = require("discord.js");
//let coins = require("../coins.json");
const mongoose = require("mongoose");

/*
mongoose.connect('mongodb://localhost:27017/Profile', {
  useNewUrlParser: true
})
*/

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
});
const fs = require("fs");
const Profile = require("../models/profile.js");

module.exports.run = async (bot, message, args) => {
    let coinAmt = 1;
    const filter = (m) => m.author.id === message.author.id;
    let Embed = new Discord.MessageEmbed()
        .setColor("#00f9ff")
        .setTitle("Choose your move")
        .addField("Rock", "r", true)
        .addField("Paper", "p", true)
        .addField("Scissors", "s", true)
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
            //If user chose rock
            if (collected.first().content === "r") {
                function randomNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.random() * (max - min) + min;
                }
                //Get random num between 1-3
                let cpuMove = randomNumber(0, 3);
                //Round
                let cpuMoveRounded = Math.ceil(cpuMove);

                //If user and cpu choose rock
                if (cpuMoveRounded == 1) {
                    let rockEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320583237238864/mayuri_rock.png"
                        )
                        .setTitle("I chose rock. It's a tie!");
                    message.channel.send(rockEmbed);
                }
                //If user choose rock and cpu choose paper
                if (cpuMoveRounded == 2) {
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
                    let paperEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320612568006686/mayuri_paper.png"
                        )
                        .setTitle("I chose paper. I win!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(paperEmbed);
                }
                //If user choose rock and cpu choose scissors
                if (cpuMoveRounded == 3) {
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
                    let scissorEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320557861961768/mayuri_scissors.png"
                        )
                        .setTitle("I chose scissors. You win!")
                        .setDescription("(You win **2** MCoin)");
                    message.channel.send(scissorEmbed);
                }
            }
            //If user chose paper
            if (collected.first().content === "p") {
                function randomNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.random() * (max - min) + min;
                }
                //Get random num between 1-3
                let cpuMove = randomNumber(0, 3);
                //Round
                let cpuMoveRounded = Math.ceil(cpuMove);
                //If cpu chose rock
                if (cpuMoveRounded == 1) {
                    //Updates mongodb
                    Profile.findOne(
                        {
                            userID: message.author.id,
                            serverID: message.guild.id,
                        },
                        (err, profile) => {
                            profile.money += 2;
                            profile.save().catch((err) => console.log(err));
                        }
                    );
                    let rockEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320583237238864/mayuri_rock.png"
                        )
                        .setTitle("I chose rock. You win!")
                        .setDescription("You win **2** MCoins");
                    message.channel.send(rockEmbed);
                }

                //If cpu choose scissors
                if (cpuMoveRounded == 3) {
                    //Updates mongodb
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
                    let scissorEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320557861961768/mayuri_scissors.png"
                        )
                        .setTitle("I chose scissors. I win!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(scissorEmbed);
                }

                //If cpu choose paper
                if (cpuMoveRounded == 2) {
                    let paperEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320612568006686/mayuri_paper.png"
                        )
                        .setTitle("I chose paper. It's a tie!");
                    message.channel.send(paperEmbed);
                }
            }

            //If user chose scissors
            if (collected.first().content === "s") {
                function randomNumber(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.random() * (max - min) + min;
                }
                //Get random num between 1-3
                let cpuMove = randomNumber(0, 3);
                //Round
                let cpuMoveRounded = Math.ceil(cpuMove);
                //If cpu chose rock
                if (cpuMoveRounded == 1) {
                    //Updates mongodb
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
                    let rockEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320583237238864/mayuri_rock.png"
                        )
                        .setTitle("I chose rock. I win!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(rockEmbed);
                }

                //If cpu choose paper
                if (cpuMoveRounded == 2) {
                    //Updates mongodb
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
                    let paperEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320612568006686/mayuri_paper.png"
                        )
                        .setTitle("I chose paper. You win! (You win 2 MCoins)")
                        .setDescription("You win **2** MCoins");
                    message.channel.send(paperEmbed);
                }
                //If cpu choose scissors
                if (cpuMoveRounded == 3) {
                    let scissorEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/760320557861961768/mayuri_scissors.png"
                        )
                        .setTitle("I chose scissors. It's a tie!");
                    message.channel.send(scissorEmbed);
                }
            }
        });
};

module.exports.config = {
    name: "rps",
    description: "Answers rps",
    usage: "$rps",
    accessableby: "Member",
    aliases: ["rps"],
};
