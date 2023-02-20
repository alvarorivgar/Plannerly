const express = require("express");
const { isOrganiser, isLoggedIn } = require("../middlewares/auth-middlewares");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { _id } = req.session.activeUser;
  try {
    const createdEvents = await Event.find({ creator: _id });
    const favEvents = await User.findById(_id).select({ favouriteEvents: 1 }).populate("favouriteEvents");
    const attendedEvents = await User.findById(_id).select({
      attendedEvents: 1,
    });
    res.render("profile/profile.hbs", {
      currentUser: req.session.activeUser,
      createdEvents,
      favEvents,
      attendedEvents,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
