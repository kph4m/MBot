const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    xp: Number,
    default: 0,
});

module.exports = mongoose.model("XP", xpSchema);
