const express = require("express");
const router = express.Router();
const SnippetModel = require("../models/Snippet");
const uploader = require("../configs/cloudinary");
const protectRoute = require("../middlewares/protectRoute"); // Route protection middleware : )

router.get("/", (req, res, next) => {
  SnippetModel.find({})
    .populate("creator") // Gives us the author's id creator object document instead of just the id : )
    .then((snippetDocuments) => {
      res.status(200).json(snippetDocuments);
    })
    .catch(next); // cf app.js error handling middleware
  // same as below
  //.catch(error => next(error))
});

router.post("/", protectRoute, uploader.single("picture"), (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.picture = req.file.path;
  }

  updateValues.creator = req.session.currentUser; // Retrieve the authors id from the session.



  SnippetModel.create(updateValues)
    .then((snippetDocument) => {
      snippetDocument
        .populate("creator")
        .execPopulate() // Populate on .create() does not work, but we can use populate() on the document once its created !
        .then((Snippet) => {
          res.status(201).json(Snippet); // send the populated document.
        })
        .catch(next);
    })
    .catch(next);
});

router.patch(
  "/:id",
  protectRoute,
  uploader.single("picture"),
  (req, res, next) => {
    const snippet = { ...req.body };

    SnippetModel.findById(req.params.id)
      .then((snippetDocument) => {
        if (!snippetDocument)
          return res.status(404).json({ message: "Snippet not found" });
        if (snippetDocument.creator && snippetDocument.creator.toString() !== req.session.currentUser) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) {
          snippet.picture = req.file.secure_url;
        }

        SnippetModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
          .populate("creator")
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
        console.log(111, req.body.title, req.params);
      })
      .catch(next);
  }
);

router.delete("/:id", protectRoute, (req, res, next) => {
  SnippetModel.findById(req.params.id)
    .then((snippetDocument) => {
      if (!snippetDocument) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      if (snippetDocument.creator.toString() !== req.session.currentUser) {
        return res.status(403).json({ message: "You can't delete this snippet" });
      }

      SnippetModel.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;