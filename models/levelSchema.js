const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
    guildId: String,
    userId: String,
    xp: Number,
    level: Number,
});

module.exports = mongoose.model("Levels", levelSchema);
