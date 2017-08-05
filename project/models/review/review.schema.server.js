var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
    // onBook: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectBookModel'},
    onBook: String,
    dateCreated: {type: Date, default: Date.now},
    content: String,
    // rating: {type: Number, enum: [1,2,3,4,5]}
    rating: String
},{collection: 'project_review'});

module.exports = reviewSchema;