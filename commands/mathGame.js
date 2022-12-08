const Discord = require("discord.js");
const Profile = require("../models/profile.js");

module.exports.run = (bot, message, args) => {
    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }
    //Get random num between 10-100
    const first = randomNumber(10, 100);
    const firstNum = Math.ceil(first);

    //Get random num between 1-10
    const second = randomNumber(0, 10);
    const secondNum = Math.ceil(second);

    const operation = ["mult", "add", "sub"];
    const randomOperation =
        operation[Math.floor(Math.random() * operation.length)];
    console.log(randomOperation);

    //Add problems
    if (randomOperation === "add") {
        const filter = (m) => m.author.id === message.author.id;
        let Embed = new Discord.MessageEmbed()
            .setColor("#00f9ff")
            .setTitle(`${firstNum} + ${secondNum}`)
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
                //If they get the right answer, add 2
                const sum = firstNum + secondNum;
                console.log(sum);
                if (collected.first().content === sum.toString()) {
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

                    let rightEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Correct!")
                        .setDescription("You win **2** MCoin");
                    message.channel.send(rightEmbed);
                }
                //If they get the wrong answer, subtract 1
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
                    let wrongEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Sorry, that is incorrect!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(wrongEmbed);
                }
            })
            .catch((collected) => {
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
                let wrongEmbed = new Discord.MessageEmbed()
                    .setColor("#00f9ff")
                    .setThumbnail(
                        "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                    )
                    .setTitle("Time is up!")
                    .setDescription("You lose **1** MCoin");
                message.channel.send(wrongEmbed);
            });
    }

    //Subtract problems
    if (randomOperation === "sub") {
        const filter = (m) => m.author.id === message.author.id;
        let Embed = new Discord.MessageEmbed()
            .setColor("#00f9ff")
            .setTitle(`${firstNum} - ${secondNum}`)
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
                //If they get the right answer, add 2
                const difference = firstNum - secondNum;
                console.log(difference);
                if (collected.first().content === difference.toString()) {
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
                    let rightEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Correct!")
                        .setDescription("You win **2** MCoin");
                    message.channel.send(rightEmbed);
                }
                //If they get the wrong answer, subtract 1
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
                    let wrongEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Sorry, that is incorrect!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(wrongEmbed);
                }
            })
            .catch((collected) => {
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
                let wrongEmbed = new Discord.MessageEmbed()
                    .setColor("#00f9ff")
                    .setThumbnail(
                        "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                    )
                    .setTitle("Time is up!")
                    .setDescription("You lose **1** MCoin");
                message.channel.send(wrongEmbed);
            });
    }

    //Multiply problems
    if (randomOperation === "mult") {
        const filter = (m) => m.author.id === message.author.id;
        let Embed = new Discord.MessageEmbed()
            .setColor("#00f9ff")
            .setTitle(`${firstNum} * ${secondNum}`)
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
                //If they get the right answer, add 2
                const product = firstNum * secondNum;
                console.log(product);
                if (collected.first().content === product.toString()) {
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
                    let rightEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Correct!")
                        .setDescription("You win **2** MCoin");
                    message.channel.send(rightEmbed);
                }
                //If they get the wrong answer, subtract 1
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
                    let wrongEmbed = new Discord.MessageEmbed()
                        .setColor("#00f9ff")
                        .setThumbnail(
                            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                        )
                        .setTitle("Sorry, that is incorrect!")
                        .setDescription("You lose **1** MCoin");
                    message.channel.send(wrongEmbed);
                }
            })
            .catch((collected) => {
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
                let wrongEmbed = new Discord.MessageEmbed()
                    .setColor("#00f9ff")
                    .setThumbnail(
                        "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
                    )
                    .setTitle("Time is up!")
                    .setDescription("You lose **1** MCoin");
                message.channel.send(wrongEmbed);
            });
    }
};

module.exports.config = {
    name: "math",
    description: "Play a math game",
    usage: "$math",
    accessibility: "Member",
    aliases: ["math"],
};
