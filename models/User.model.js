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
  age: Number,
  city: String,
  bio: String,
  image: {
    type: String,
    default: "https://res.cloudinary.com/dkz1jslyi/image/upload/v1677055585/Plannerly/blank-profile-picture-973460_1280-1-705x705_zz7gvv.png"
  }
});

const User = model("User", userSchema);

module.exports = User;
