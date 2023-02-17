const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  favouriteEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  role: {
    type: String,
    enum: ["organiser", "user"],
  },
});

const User = model("User", userSchema);

module.exports = User;
