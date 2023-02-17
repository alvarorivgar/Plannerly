const express = require('express');
const router = express.Router();

// GET "events/all" => renderizar all-events.hbs con la lista de todos los eventos


// GET "events/:id" => renderizar event.hbs con tarjeta de un solo evento 


// GET "events/create" => renderizar create-form.hbs para crear evento Z ORGANISER ONLY


// POST "events/create" => ruta para crear evento y redireccionar < ORGANISER ONLY


// GET "events/:id/edit" => renderizar edit-form.hbs para editar evento > ORGANISER ONLY !!!! DELETE USER FROM ATTENDANT PENDING


// POST "events/:id/edit" => ruta para editar info de evento y rediceccionar < ORGANISER ONLY


// POST "events/:id/delete" => ruta para borrar evento y redireccionar < ORGANISER ONLY

module.exports = router;