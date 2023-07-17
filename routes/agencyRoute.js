const express = require("express");
const { createAgency, addSavings } = require("../controllers/agencyController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.patch('/savings/:accountNo', authMiddleware, addSavings);
router.post('/', authMiddleware, createAgency);

module.exports = router;