const express = require("express");
const { isOrganiser, isLoggedIn } = require("../middlewares/auth-middlewares");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const router = express.Router();
const uploader = require("../middlewares/cloudinary");

//RENDER PRIVATE PROFILE
router.get("/my-profile", async (req, res, next) => {
  const { _id } = req.session.activeUser;
  try {
    const currentUser = await User.findById(_id);

    const createdEvents = await Event.find({ creator: _id });

    const favEvents = await User.findById(_id)
      .select({ favouriteEvents: 1 })
      .populate("favouriteEvents", "name");

    const attendedEvents = await User.findById(_id)
      .select({
        attendedEvents: 1,
      })
      .populate("attendedEvents", "name");

    createdEvents.forEach((event) => {
      if (_id.toString() === event.creator._id.toString()) {
        event.isMyEvent = true;
      } else {
        event.isMyEvent = false;
      }
    });

    res.render("profile/my-profile.hbs", {
      currentUser,
      createdEvents,
      favEvents,
      attendedEvents,
    });
  } catch (error) {
    next(error);
  }
});

//EDIT PROFILE
router.get("/my-profile/edit", async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.session.activeUser._id);
    res.render("profile/edit-form.hbs", userToUpdate);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/my-profile/edit",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.session.activeUser._id, req.body);
      res.redirect("/profile/my-profile");
    } catch (error) {
      next(error);
    }
  }
);

//PUBLIC PROFILE
router.get("/user/:id/details", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id).populate({
      path: "comment",
      populate: { path: "poster", model: "User" },
    });

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

//COMMENTS
router.post("/user/:id/comment", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      poster: req.session.activeUser,
    });
    await User.findByIdAndUpdate(req.params.id, {
      $push: { comment: comment },
    });
    res.redirect(`/profile/user/${req.params.id}/details`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
