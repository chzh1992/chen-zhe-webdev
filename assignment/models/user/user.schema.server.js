var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    _websites: [
        {type: mongoose.Schema.Types.ObjectId, ref: "AssignmentWebsiteModel"}
    ],
    dateCreated: {type: Date, default: Date.now},
    google:{
        id: String,
        token: String
    },
    group: {type: String, default:'ASSIGNMENT'}
},{collection: "assignment_user"});
module.exports = userSchema;
