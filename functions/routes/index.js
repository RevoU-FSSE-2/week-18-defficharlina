const { Router } = require("express");
const taskRoutes = require("./taskRoutes");
const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
//const preventAttackController = require("./preventAttackRoutes")

const router = Router();

router.use("/", dashboardRoutes);
router.use("/api/v1/auth", authRoutes);
//router.use("/api/v1/attack", preventAttackController);
router.use("/api/v1/tasks", taskRoutes);

module.exports = router;
