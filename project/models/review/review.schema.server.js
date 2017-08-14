var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    reviewer: {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
        name: String
    },
    onBook: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectBookModel'},
    dateUpdated: {type: Date, default: Date.now},
    content: String,
    rating: {type: Number, enum: [1,2,3,4,5]}
},{collection: 'project_review'});

module.exports = reviewSchema;