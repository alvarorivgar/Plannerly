const express = require("express");
const { isOrganiser, isLoggedIn } = require("../middlewares/auth-middlewares");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/my-profile", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.activeUser._id);
    res.render("profile/my-profile.hbs", {
      currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/my-profile/edit", async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.session.activeUser._id);
    res.render("profile/edit-form.hbs", userToUpdate);
  } catch (error) {
    next(error);
  }
});

//EDIT
router.post("/my-profile/edit", async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.session.activeUser._id, req.body);
    res.redirect("profile/my-profile.hbs");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id);

    const createdEvents = await Event.find({ creator: id });

    const favEvents = await User.findById(id)
      .select({ favouriteEvents: 1 })
      .populate("favouriteEvents", "name");

    const attendedEvents = await User.findById(id)
      .select({
        attendedEvents: 1,
      })
      .populate("attendedEvents", "name");

    createdEvents.forEach((event) => {
      if (req.session.activeUser._id === event.creator._id.toString()) {
        event.isMyEvent = true;
      } else {
        event.isMyEvent = false;
      }
    });

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
