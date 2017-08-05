var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
    title: String,
    authors: [String],
    publisher: String,
    dateCreated: {type: Date, default: Date.now},
    goodreads: {
        id: String,
        rating: String,
        review_widget: String
    },
    rating: Number
},{collection: 'project_book'});
module.exports = bookSchema;