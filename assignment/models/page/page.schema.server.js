var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "AssignmentWebsiteModel"},
    name: String,
    title: String,
    description: String,
    _widgets: [
        {type: mongoose.Schema.Types.ObjectId, ref: "AssignmentWidgetModel"}
    ],
    dateCreated: {type: Date, default: Date.now}
},{collection: 'assignment_page'});

module.exports = pageSchema;