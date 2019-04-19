const mongoose = require("mongoose");
//refference to Schema constructor
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    summary: {
        type: String,
        required: false
    },
    link:{
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;