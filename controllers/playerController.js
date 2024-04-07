const Match = require("../model/match");
const Player = require("../model/player");
const ErrorResponse = require("../utils/errorResponse");

const AddPlayer = async (req, res, next) => {
  const playerId = Math.floor(Math.random() * 900) + 100;
  const { name, role } = req.body;
  const { team_id } = req.params;
  const player = new Player({
    name,
    role,
    team_id,
  });
  try {
    const savedPlayer = await player.save();
    // Update corresponding match's squads
    const matchUpdates = { $push: { [`squads.${team_id}`]: savedPlayer._id } };
    await Match.updateMany(
      { $or: [{ team_1: team_id }, { team_2: team_id }] },
      matchUpdates
    );
    res.json({
      message: "Player added to squad successfully",
      player_id: playerId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const PlayerStat = async (req, res) => {
  const { player_id } = req.params;
  // Dummy player stats data
  const playerStats = {
    player_id,
    name: "Virat Kohli",
    matches_played: 200,
    runs: 12000,
    average: 59.8,
    strike_rate: 92.5,
  };
  res.json(playerStats);
};
module.exports = {
  AddPlayer,
  PlayerStat,
};
