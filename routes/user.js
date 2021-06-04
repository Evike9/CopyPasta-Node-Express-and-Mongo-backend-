const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const SnippetModel = require("../models/Snippet")
const upload = require("../configs/cloudinary");
const protectRoute = require("../middlewares/protectRoute");


router.get('/:id', (req, res, next) => {
  UserModel.findById(req.session.currentUser) 
  .select("-password") // Remove the password field from the found document because we need a different route here
  .then((userDocument) => {
    return res.status(200).json(userDocument);
  })
  .catch(next);
});

// if we want to update the image, we can add the following PATCH route to
// connect to cloudinary and allow for file uploads

router.patch("/:id", protectRoute, upload.single("picture"),
  (req, res, next) => {
const userId = req.session.currentUser;
    if (req.file) {
      req.body.picture = req.file.path; // Add picture key to req.body
    }

//and this allows to update the rest of fields

  UserModel.findByIdAndUpdate( userId, req.body, { new: true})
  .then((updatedUser)=> {
    res.status(200).json(updatedUser);
  })
  .catch((error)=> {
    res.status(500).json(error);
  });
})
//get the snippets made by the user

router.get("/:id/snippet", protectRoute, (req, res, next) => {
  const currentUserId = req.session.currentUser; // We retrieve the users id from the session.

  // And then get all the items matching the creator field that matches the logged in users id.
  SnippetModel.find({ creator: currentUserId })
    .then((SnippetDocuments) => {
      res.status(200).json(SnippetDocuments);
    })
    .catch(next);
});

module.exports = router;