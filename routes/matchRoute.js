const {
  CreateMatch,
  GetAllMatches,
  GetMatchById,
} = require("../controllers/matchController");
const adminAuth = require("../middlewares/adminAuth");

const router = require("express").Router();

router.post("/matches", adminAuth, CreateMatch);
router.get("/matches", GetAllMatches);
router.get("/matches/:match_id", GetMatchById);

module.exports = router;
