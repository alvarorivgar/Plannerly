const express = require('express');
const { updateLocals } = require("../middlewares/auth-middlewares");
const router = express.Router();


// Ejecuta el middleware que actualiza las variables de si el usuario esta loggeado o no
router.use(updateLocals)


/* GET home page => renderizar PLANNERLY y boton de acceder */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Authentication

router.use("/auth", require("./auth.routes"))

// Event routes

router.use("/events", require("./events.routes"))

module.exports = router;
