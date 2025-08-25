const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router.post("/music/:musicId/comments", commentController.createComment);

module.exports = router;