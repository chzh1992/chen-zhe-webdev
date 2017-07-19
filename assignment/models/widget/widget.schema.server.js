var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "AssignmentPageModel"},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: {type: String, default: "100%"},
    height: String,
    rows: {type: Number, default: 1},
    size: {type: Number, default: 1},
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
},{collection: "assignment_widget"});

module.exports = widgetSchema;