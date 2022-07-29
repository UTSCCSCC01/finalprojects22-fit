// Model for a User object
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let friendRequestSchema = new Schema(
  {
    from_user: {
      type: String,
    },
    from_username: {
      type: String,
    },
    to_user: {
      type: String,
    },
  },
  { timestamps: true }
);

// specify the collection for this model from the DB 
let FriendRequest = mongoose.model("FriendRequest", friendRequestSchema, "FriendRequests");

module.exports = FriendRequest;
