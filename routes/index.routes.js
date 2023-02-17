const express = require('express');
const router = express.Router();

/* GET home page => renderizar PLANNERLY y boton de acceder */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Authentication

router.use("/auth", require("./auth.routes"))

// Event routes

router.use("/events", require("./events.routes"))

module.exports = router;
