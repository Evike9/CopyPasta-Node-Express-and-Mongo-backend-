const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");


// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });


router.patch('/me', (req, res, next) => {
  User.findByIdAndUpdate( req.session.currentUser, req.body, { new: true})
  .then((updatedUser)=> {
    res.status(200).json(updatedUser);
  })
  .catch((error)=> {
    res.status(500).json(error);
  })
})

module.exports = router;