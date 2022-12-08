const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const filter = (m) => m.author.id === message.author.id;
    let ReminderReason = args.slice(0).join(" ");
    if (!ReminderReason) {
        message.reply("Please specify what you want to be reminded of");
    } else {
        message.reply("When should I remind you? (in minutes)");
        message.channel
            .awaitMessages(filter, {
                max: 1,
                //time: 10000
            })
            .then((collected) => {
                let Time = collected.first().content;
                if (!Time) {
                    message.reply(
                        "Please specify when you would like to be reminded"
                    );
                }
                if (isNaN(Time)) {
                    message.reply("Please specify a number");
                } else {
                    message
                        .reply("I will remind you in " + Time + " minutes!")
                        .then(
                            setTimeout(function () {
                                message.reply(
                                    `Here's a reminder to: **${ReminderReason}**`
                                );
                            }, Time * 1000 * 60)
                        );
                }
            });
    }
};

module.exports.config = {
    name: "remind",
    description: "Reminds a user of a message after a certain period of time",
    usage: "$remind",
    accessibility: "Member",
    aliases: ["reminder", "remind"],
};
