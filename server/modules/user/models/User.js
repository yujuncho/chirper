const { Types, Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tweets: [
    {
      type: Types.ObjectId,
      ref: "tweet"
    }
  ]
});

const User = model("user", userSchema);

module.exports = User;
