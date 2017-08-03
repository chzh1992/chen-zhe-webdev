var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
    title: String,
    authors: [String],
    publisher: String,
    dateCreated: {type: Date, default: Date.now},
    goodreadsId: String
},{collection: 'project_book'});
module.exports = bookSchema;