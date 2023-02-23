const express = require("express");
const { isOrganiser, isLoggedIn, isUser } = require("../middlewares/auth-middlewares");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const router = express.Router();
const uploader = require("../middlewares/cloudinary");

//RENDER PRIVATE PROFILE
router.get("/my-profile", isLoggedIn, async (req, res, next) => {

  try {

    const { _id } = req.session.activeUser;

    const currentUser = await User.findById(_id)
      .populate("attendedEvents")
      .populate("favouriteEvents");

    const createdEvents = await Event.find({ creator: _id });

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
    });
  } catch (error) {
    next(error);
  }
});

//EDIT PROFILE
router.get("/my-profile/edit", isLoggedIn, async (req, res, next) => {

  try {

    const userToUpdate = await User.findById(req.session.activeUser._id);

    res.render("profile/edit-form.hbs", {userToUpdate});
  } catch (error) {
    next(error);
  }
});

router.post("/my-profile/edit", isLoggedIn, uploader.single("image"), async (req, res, next) => {

    let image;

    if (req.file !== undefined) {
      image = req.file.path;
    }

    const { age, city, bio } = req.body;

    try {

      await User.findByIdAndUpdate(req.session.activeUser._id, {
        age,
        city,
        bio,
        image,
      });

      res.redirect("/profile/my-profile");
    } catch (error) {
      next(error);
    }
  }
);

//PUBLIC PROFILE
router.get("/user/:id/details", isLoggedIn, async (req, res, next) => {

  try {

    const { id } = req.params;

    const foundUser = await User.findById(id).populate({
      path: "comment",
      populate: { path: "poster", model: "User" },
    }).populate("attendedEvents").populate("favouriteEvents");

    const createdEvents = await Event.find({ creator: id });
    const isOrganiser = foundUser.role === "organiser";

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
      isOrganiser,
    });
  } catch (error) {
    next(error);
  }
});

//COMMENTS
router.post("/user/:id/comment", isLoggedIn, async (req, res, next) => {
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
