const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: Number,
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  slots: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dkz1jslyi/image/upload/v1676994763/Plannerly/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84_nktbuk.jpg",
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
