module.exports.run = async (bot, message, args) => {
    //Delete command message so it doesn't mess with command
    if (message.deletable) {
        message.delete();
    }
    //Check if member has permissions to clear
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message
            .reply("You cannot manage messages")
            .then((msg) => msg.delete(5000));
    } else {
        //Check if argument is number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message
                .reply("Please specify a valid number")
                .then((msg) => msg.delete(5000));
        }
        //Setting default delete amount
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel
            .bulkDelete(deleteAmount, true)
            .catch((err) => message.reply(`Something went wrong - ${err}`));
        return message.channel
            .send(`Deleted ${deleteAmount} messages!`)
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
    }
};

module.exports.config = {
    name: "clear",
    description: "clears certain amount of messages",
    usage: "$clear <number>",
    accessibility: "Member",
    aliases: ["clr"],
};
