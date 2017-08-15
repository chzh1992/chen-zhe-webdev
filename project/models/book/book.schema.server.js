var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    dateCreated: {type: Date, default: Date.now},
    goodreadsId: String,
    description: String,
    publication_year: String,
    publication_month: String,
    publication_day: String,
    isbn: String,
    image_url: String
},{collection: 'project_book'});
module.exports = bookSchema;