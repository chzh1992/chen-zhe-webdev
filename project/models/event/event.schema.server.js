var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
    dateCreated: {type: Date, default: Date.now},
    type: {type: String, enum: ['FOLLOW','READ','REVIEW']},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectBookModel'},
    following: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
    content: String
},{collection: 'project_events'});
module.exports = eventSchema;