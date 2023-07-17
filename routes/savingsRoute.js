const express = require("express");
const { createSavings, getSavings, getUserAccount } = require("../controllers/savingsController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/accountinfo', getUserAccount);
router.post('/', authMiddleware, createSavings);
router.get('/', authMiddleware, getSavings);

module.exports = router;