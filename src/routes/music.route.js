const router = require("express").Router();
const musicController = require("../controllers/music.controller");

router.get("/", musicController.home);
router.get("/music/:id", musicController.musicPlayer);

module.exports = router;