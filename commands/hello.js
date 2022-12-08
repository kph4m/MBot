module.exports.run = async (bot, message, args) => {
    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }
    //Get random num between 1-2
    let cpuMove = randomNumber(0, 2);
    //Round
    let cpuMoveRounded = Math.ceil(cpuMove);

    if (cpuMoveRounded == 1) {
        message.reply("Hi!");
    } else {
        if (cpuMoveRounded == 2) {
            message.reply("Hello!");
        }
    }
};

module.exports.config = {
    name: "hello",
    description: "Answers hi",
    usage: "$hello",
    accessibility: "Member",
    aliases: ["hello" || "hi"],
};
