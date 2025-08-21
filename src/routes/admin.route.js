const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/admin/music-list", authMiddleware.authMiddleware, adminController.musicList);
router.get("/admin/add-music", authMiddleware.authMiddleware, adminController.addMusic);
router.post("/admin/add-music", authMiddleware.authMiddleware, adminController.addMusicPost);
router.get("/admin/edit-music/:id", authMiddleware.authMiddleware, adminController.editMusic);
router.put("/admin/edit-music/:id", authMiddleware.authMiddleware, adminController.editMusicPost);
router.delete("/admin/delete-music/:id", authMiddleware.authMiddleware, adminController.deleteMusic);

module.exports = router;