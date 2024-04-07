const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  match_id: {
    type: Number,
    unique: true,
    required: true,
  },
  team_1: String,
  team_2: String,
  date: Date,
  venue: String,
  status: String,
  squads: {
    team_1: [{ player_id: String, name: String }],
    team_2: [{ player_id: String, name: String }],
  },
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
