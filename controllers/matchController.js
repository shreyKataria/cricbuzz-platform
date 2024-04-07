const Match = require("../model/match");

const CreateMatch = async (req, res) => {
  try {
    const { team_1, team_2, date, venue } = req.body;

    const count = await Match.countDocuments();

    const match_id = count + 1;
    // Create match
    const match = await Match.create({
      match_id: (_id = match_id),
      team_1,
      team_2,
      date,
      venue,
    });

    await match.save(match_id);
    res.json({ message: "Match created successfully", match_id: match_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllMatches = async (req, res) => {
  try {
    const matches = await Match.find({}, "match_id team_1 team_2 date venue");
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.match_id)
      .populate("squads.team_1", "name")
      .populate("squads.team_2", "name");
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  CreateMatch,
  GetAllMatches,
  GetMatchById,
};
