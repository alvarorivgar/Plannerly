const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  comment: String,
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
