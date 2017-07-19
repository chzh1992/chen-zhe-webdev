var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentUserModel'},
    name: String,
    description: String,
    _pages: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentPageModel'}
    ],
    dateCreated: {type: Date, default: Date.now}
},{collection: 'assignment_website'});

module.exports = websiteSchema;