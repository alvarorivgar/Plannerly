const express = require("express");
const { isOrganiser, isLoggedIn } = require("../middlewares/auth-middlewares");
const router = express.Router();
const Event = require("../models/Event.model");

// GET "events/all" => renderizar all-events.hbs con la lista de todos los eventos
router.get("/all", async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    res.render("events/all-events.hbs", { allEvents });
  } catch (error) {
    next(error);
  }
});

// GET "events/:id" => renderizar event.hbs con tarjeta de un solo evento
router.get("/:id/details", async (req, res, next) => {
  try {
    const singleEvent = await Event.findById(req.params.id).populate("creator");
    console.log(singleEvent);
    res.render("events/event.hbs", singleEvent);
  } catch (error) {
    next(error);
  }
});

// GET "events/create" => renderizar create-form.hbs para crear evento < ORGANISER ONLY
router.get("/create", isLoggedIn, isOrganiser, (req, res, next) => {
  res.render("events/create-form.hbs");
});

// POST "events/create" => ruta para crear evento y redireccionar < ORGANISER ONLY
router.post("/create", isLoggedIn, isOrganiser, async (req, res, next) => {
  try {
    const { name, price, date, location, description, slots } = req.body;
    await Event.create({
      name,
      price,
      date,
      location,
      slots,
      description,
      creator: req.session.activeUser._id,
    });
    res.redirect("/events/all");
  } catch (error) {
    next(error);
  }
});

// GET "events/:id/edit" => renderizar edit-form.hbs para editar evento > ORGANISER ONLY !!!! DELETE USER FROM ATTENDANT PENDING
router.get("/:id/edit", isLoggedIn, isOrganiser, (req, res, next) => {
  res.render("events/edit-form.hbs");
});

// POST "events/:id/edit" => ruta para editar info de evento y rediceccionar < ORGANISER ONLY
router.post("/:id/edit", isLoggedIn, isOrganiser, async (req, res, next) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/events/${id}`);
  } catch (error) {
    next(error);
  }
});

// POST "events/:id/delete" => ruta para borrar evento y redireccionar < ORGANISER ONLY
router.post("/:id/delete", isLoggedIn, isOrganiser, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/events/all");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
