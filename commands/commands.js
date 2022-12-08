const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let Embed = new Discord.MessageEmbed()
        .setColor("#00f9ff")
        .setTitle("Commands")
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/722355632283320341/723415815738753074/pngfuel.com.png"
        )
        .setDescription(
            "All commands that can be performed by MBot. Prefix is `$`. Parenthesis indicates alternate command (e.g. `$coins` to get message authors' coins, `$coins <@username>` to get coins of specified user)"
        )
        .addField(
            "Game Commands",
            "`$rps` - play rock-paper-scissors \n \n `$flip` - play heads-or-tails",
            true
        )
        .addField(
            "Coin Commands",
            "`$coins (<@username>)` - Shows number of MCoins a user has \n \n `$pay <@username> <amount of coins>` - Allows user to pay another user a specified amount of coins \n \n (Admin) `$generate <amount of coins>` - Add a certain number of coins to a user's account \n \n `$reset` - Sets users coin balance to 0",
            true
        )
        .addField(
            "Admin Commands",
            "`$kick <@user> <reason>` - Kicks a user from the server \n \n `$ban <@user> <reason>` - Bans a user from the server",
            true
        )
        .addField(
            "Miscellaneous Commands",
            "`$userinfo (<@user>)` - Shows stats of specified user \n \n `$hello` - Greets you \n \n (Admin) `$clear <amount of message>` - Deletes specified number of messages in channel \n \n `$tuturu` - tuturu! \n \n `$report <@username> <reason>` - Reports a user with a reason \n \n `$lvl (<@username>)` - Shows level card for user \n \n `$rating <attachment>` - Adds 👍 and 👎 to attachment \n \n `$poll <sentence>` - Adds 👍 and 👎 to poll \n \n  `$remind <message>` - Reminds the user of a message after a specifed period of time",
            true
        );
    message.channel.send(Embed);
};

module.exports.config = {
    name: "cmds",
    description: "Shows all commands",
    usage: "$cmds",
    accessibility: "Member",
    aliases: ["commands", "cmds"],
};
