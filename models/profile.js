const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    money: Number,
    xp: Number,
    level: Number,
});

module.exports = mongoose.model("Profile", profileSchema);
