const Profile = require("../models/profile.js");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");
const { join } = require("path");
const { createIndexes } = require("../models/profile.js");

module.exports.run = async (bot, message, args) => {
    //Level Checker
    let member =
        message.guild.members.cache.get(args[0]) ||
        message.mentions.members.first() ||
        message.member;

    Profile.findOne(
        {
            userID: member.id,
            serverID: member.guild.id,
        },
        (err, profile) => {
            if (err) console.log(err);
            async function creationCanvas() {
                //Create canvas
                const canvas = createCanvas(1000, 333);
                const ctx = canvas.getContext("2d");
                const background = await loadImage(
                    "https://cdn.discordapp.com/attachments/722355632283320341/724878087325745192/blue-gradient-background.png"
                );
                ctx.drawImage(background, 0, 0, 1000, 333);

                //XP Bar
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#000000";
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = "#000000";
                ctx.fillRect(180, 216, 770, 65);
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.strokeRect(180, 216, 770, 65);
                ctx.stroke();

                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = 0.6;
                ctx.lineWidth = 8;
                ctx.fillRect(
                    180,
                    218,
                    (100 / (profile.level * 100)) * profile.xp * 7.7,
                    60
                );
                ctx.fill();
                ctx.globalAlpha = 1;

                //XP Rectangle Text
                ctx.font = "30px Comic Sans";
                ctx.textAlign = "center";
                ctx.fillStyle = "#000000";
                ctx.fillText(
                    `${profile.xp} / ${profile.level * 100} XP`,
                    600,
                    260
                );
                ctx.lineWidth = 3;
                ctx.strokeText = "rgba(0,0,0,1)";
                ctx.stroke();

                //Name Stuff
                ctx.textAlign = "left";
                ctx.fillText(member.user.tag, 320, 130);

                //Level
                ctx.font = "30px Comic Sans";
                ctx.fillText(`Level: ${profile.level}`, 320, 170);

                //Profile Pic
                ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
                ctx.lineWidth = 10;
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.closePath();
                ctx.clip();
                const avatar = await loadImage(
                    member.user.displayAvatarURL({ format: "jpg" })
                );
                ctx.drawImage(avatar, 40, 40, 250, 250);

                const attachment = new MessageAttachment(
                    canvas.toBuffer(),
                    "rank.png"
                );
                message.channel.send(
                    `Level card for **${member.user.username}**`,
                    attachment
                );
            }

            creationCanvas();
        }
    );
};

module.exports.config = {
    name: "lvl",
    description: "Checks users level",
    usage: "$lvl",
    accessibility: "Member",
    aliases: ["lvl", "level"],
};
