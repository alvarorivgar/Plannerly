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
  image: String,
});

const Event = model("Event", eventSchema);

module.exports = Event;
