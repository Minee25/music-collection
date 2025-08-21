const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/admin/login", authMiddleware.isAuthenticated, authController.loginForm);
router.post("/admin/login", authMiddleware.isAuthenticated, authController.login);
router.post("/admin/logout", authMiddleware.authMiddleware, authController.logout);

module.exports = router;