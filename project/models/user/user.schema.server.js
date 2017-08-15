var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: {type: String, enum: ['READER','AUTHOR','ADMIN']},
    dateCreated: {type: Date, default: Date.now},
    email: String,
    facebook: {
        id: String,
        token: String
    },
    country: String,
    nativeLanguage: String,
    group: {type: String, default:'PROJECT'},
    following: [
        {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}
    ],
    authoredBooks: [
        {type: mongoose.Schema.Types.ObjectId, ref: "ProjectBookModel"}
    ],
    bookshelf:{
        wantToRead: [
            {type: mongoose.Schema.Types.ObjectId, ref: "ProjectBookModel"}
        ],
        reading: [
            {type: mongoose.Schema.Types.ObjectId, ref: "ProjectBookModel"}
        ],
        haveRead: [
            {type: mongoose.Schema.Types.ObjectId, ref: "ProjectBookModel"}
        ]
    },
    photo_url: {type: String, default: 'avatar.png'}
},{collection: 'project_user'});
module.exports = userSchema;