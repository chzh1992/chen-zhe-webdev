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
    dateCreated: {type: Date, default: Date.now}
},{collection: "assignment_user"});
module.exports = userSchema;
