const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const snippetSchema = new Schema({

  title: String,
  userName: String,
  // date: date,
  description: String,
  category: {
    type: String,
    enum: ["HTML", "CSS", "JS", "React", "Other"]
  },
  snippet: {
    type: String
  },

  picture: {
    type: String,
    default: "https://managewp.com/wp-content/uploads/2012/08/code-snippets.png"
  },

  credits: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},
  { timestamps: true }
);



const SnippetModel = mongoose.model("Snippet", snippetSchema);

module.exports = SnippetModel;
