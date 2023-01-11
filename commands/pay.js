const Profile = require("../models/profile.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.run = async (bot, message, args) => {
    //Check if argument is given
    if (!args[0]) {
        return message.reply("Please specify who you want to pay and how much");
    }

    //Check if argument is given
    if (!args[1]) {
        return message.reply(
            "Please specify how much you want to pay the user"
        );
    }

    //Get info of person we're paying (either through ping or id)
    let pUser =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first();
    let sUser = message.author.id;
    console.log(`sUser is ${sUser}`);

    //Subtract money from sUser -- Mongodb
    Profile.findOne(
        {
            userID: sUser,
            serverID: message.guild.id,
        },
        (err, profile) => {
            if (err) console.log(err);
            if (profile.money < args[1]) {
                return message.reply("You don't have enough coins to pay");
            } else {
                profile.money -= parseInt(args[1]);
                profile.save().catch((err) => console.log(err));
                //Add money to pUser -- Mongodb
                Profile.findOne(
                    {
                        userID: pUser.id,
                        serverID: message.guild.id,
                    },
                    (err, profile) => {
                        if (err) console.log(err);
                        profile.money += parseInt(args[1]);
                        profile.save().catch((err) => console.log(err));
                    }
                );
                //Send message
                message.channel.send(
                    `${message.author.username} has sent ${args[1]} coins to ${pUser}`
                );
            }
        }
    );
};

module.exports.config = {
    name: "pay",
    description: "Transfers coins to of author to specified user",
    usage: "$pay <user> <amount of coins>",
    accessibility: "Member",
    aliases: ["pay"],
};
