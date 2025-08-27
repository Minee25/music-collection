const router = require("express").Router();
const likeController = require("../controllers/like.controller");

router.post("/music/:musicId/add-like", likeController.addLike);
router.post("/music/:musicId/unlike", likeController.unlike);

module.exports = router;