const Discord = require("discord.js");
const config = require("./config.json");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const Profile = require("./models/profile.js");
const { Z_ASCII } = require("zlib");
const { url } = require("inspector");

//Welcome Message
bot.on("guildMemberAdd", (member) => {
    try {
        const generalChannel = member.guild.channels.cache.find(
            (channel) => channel.name === "general"
        );

        generalChannel.send(`Welcome ${member}! Enjoy your stay! 😊`);
    } catch (error) {
        console.log(error);
    }
});

//Goodbye Message
bot.on("guildMemberRemove", (member) => {
    try {
        const generalChannel = member.guild.channels.cache.find(
            (channel) => channel.name === "general"
        );
        generalChannel.send(`Goodbye ${member} 😔`);
    } catch (error) {
        console.log(error);
    }
});

//Send Message when joining
bot.on("guildCreate", (guild) => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop: for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(
        "Tuturu! Thanks for inviting me! Type `$cmds` to view all my commands!"
    );
});

//Ready bot status
bot.on("ready", async () => {
    let botUsername = `${bot.user.username}`;
    console.log(botUsername + " is online!");
    bot.user.setActivity("tuturu🎶", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=HkGNeN0LGOE",
    });
});

//Command Handler
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach((alias) => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});

bot.on("message", async (message) => {
    if (message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //If message doesn't start with prefix, return nothing
    if (message.content.startsWith(prefix)) {
        let commandfile =
            bot.commands.get(cmd.slice(prefix.length)) ||
            bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
        //If message is a command, run it
        if (commandfile) commandfile.run(bot, message, args);
    }

    //Rating Attachment
    if (cmd === `${prefix}rating`) {
        if (message.attachments.size > 0) {
            message.react("👍");
            message.react("👎");
        }
    }

    //Level and XP starter
    Profile.findOne(
        {
            userID: message.author.id,
            serverID: message.guild.id,
        },
        (err, profile) => {
            if (err) console.log(err);
            //If there currently isnt any on the database, make a new one
            if (!profile) {
                const newProfile = new Profile({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: 0,
                    xp: 0,
                    level: 1,
                });
                newProfile.save().catch((err) => console.log(err));
            }
            //Update if there are stuff in the database
            else {
                // console.log('This is current xp: ' + profile.xp)
                // console.log('This is my current level: ' + profile.level)
                let generatedXP = Math.floor(Math.random() * 20);
                profile.xp += generatedXP;
                //Levels.save().catch(err => console.log(err));
                let neededXp = 100 * profile.level;
                if (profile.xp > neededXp) {
                    ++profile.level;
                    profile.xp = profile.xp - neededXp;
                    message.reply(
                        `You are now level ${profile["level"]} with ${profile.xp} experience!`
                    );
                }
                profile.save().catch((err) => console.log(err));
            }
        }
    );
});

//Add Role from Reaction
bot.on("messageReactionAdd", async (reaction, user, message, args, guild) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;
});

bot.login(process.env.BOT_TOKEN);
