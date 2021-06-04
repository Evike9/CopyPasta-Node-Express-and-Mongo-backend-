const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const snippetSchema = new Schema ({
    
    title: String,
    userName: String,
    // date: date,
    description: String,
    category: { type: String,
        enum:  [ "html", "css", "js", "react", "other" ]},
    snippet: {
    type: String,
    default: "https://managewp.com/wp-content/uploads/2012/08/code-snippets.png"
    },
    picture: {
    type: String,
    default: "https://managewp.com/wp-content/uploads/2012/08/code-snippets.png"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
      },
    },
    { timestamps: true }
    ); 


    
    const SnippetModel = mongoose.model("Snippet", snippetSchema);

    module.exports = SnippetModel; 
