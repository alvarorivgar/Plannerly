const express = require("express");
const { isOrganiser, isLoggedIn } = require("../middlewares/auth-middlewares");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id);
    const createdEvents = await Event.find({ creator: id });
    const favEvents = await User.findById(id)
      .select({ favouriteEvents: 1 })
      .populate("favouriteEvents");
    const attendedEvents = await User.findById(id)
      .select({
        attendedEvents: 1,
      })
      .populate("attendedEvents");
    let isMyEvent;
    if (req.session.activeUser._id === createdEvents[0].creator._id.toString()) {
      isMyEvent = true;
    } else {
      isMyEvent = false;
    }
    console.log("ID: " + req.session.activeUser._id);
    console.log("ID2: " + createdEvents[0].creator._id.toString());
    console.log(isMyEvent);
    res.render("profile/profile.hbs", {
      foundUser,
      createdEvents,
      favEvents,
      attendedEvents,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
