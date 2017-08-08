
require('./env');

var app = require('./express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({ secret: 'Place Holder' }));

app.use(passport.initialize());
app.use(passport.session());

// configure database connection
var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137801.mlab.com:37801/heroku_5v3h525d'; // user yours
}

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require("./passportjs-config");
require ("./test/app.js")(app);
require("./assignment/app");
require("./poc/app");
require("./project/app");


var port = process.env.PORT || 3000;

app.listen(port);