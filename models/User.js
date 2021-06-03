const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String,
  picture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  password: { type: String, required: true },
  LinkedIn: String,
  GitHub: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel; 