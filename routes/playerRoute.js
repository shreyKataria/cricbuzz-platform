const { AddPlayer, PlayerStat } = require("../controllers/playerController");
const adminAuth = require("../middlewares/adminAuth");

const router = require("express").Router();

router.post("/teams/:team_id/squad", adminAuth, AddPlayer);
router.get("players/:player_id/stats", PlayerStat);

module.exports = router;
