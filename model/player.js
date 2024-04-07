const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  player_id: {
    type: String,
    unique: true,
  },
  team_id: { String },
  name: String,
  role: String,
  matches_played: Number,
  runs: Number,
  average: Number,
  strike_rate: Number,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
