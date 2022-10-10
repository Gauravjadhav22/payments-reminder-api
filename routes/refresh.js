const express = require("express");
const refreshToken = require("../controllers/refresh");
const router = express.Router();

router.get("/token",refreshToken);

module.exports = router;
