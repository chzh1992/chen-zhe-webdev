var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt-nodejs');
var assignmentUserModel = require('./assignment/models/user/user.model.server');

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use('assignment',new LocalStrategy(assignmentLocalStrategy));

var facebookConfig = {
    clientID     : '1',
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

// passport.use('project',new LocalStrategy(projectLocalStrategy));

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig,googleStrategy));

function serializeUser(user, done) {
    var serializationUnit = {
        _id: user._id,
        group: user.group
    };
    done(null, serializationUnit);
}

function deserializeUser(unit, done) {
    if (unit.group == "ASSIGNMENT"){
        assignmentUserModel
            .findById(unit._id)
            .then(
                function(user){
                    done(null,user);
                },
                function(err) {
                    done(err, null);
                });
    } else if (unit.group == "PROJECT"){

    }

}

function assignmentLocalStrategy(username, password, done) {
    assignmentUserModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done){
    console.log(profile);
    return done(null,false);
    // userModel
    //     .findUserByFacebookId(profile.id)
    //     .then(
    //         function (user){
    //             if (user){
    //                 return done(null,user);
    //             } else {
    //                 var newFacebookUser = {
    //                     facebook: {
    //                         id: profile.id,
    //                         token: token
    //                     }
    //                 }
    //             };
    //             return userModel
    //                 .createUser(newFacebookUser);
    //         },
    //         function (err){
    //             if (err) {
    //                 return done(err);
    //             }
    //         }
    //     )
    //     .then(
    //         function(user){
    //             return done(null, user);
    //         },
    //         function(err){
    //             if (err) { return done(err); }
    //         }
    //     );
}

function projectLocalStrategy(username,password,done){

}

function googleStrategy(token,refreshToken,profile,done){
    assignmentUserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var newGoogleUser = {
                        username: 'Google User',
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return assignmentUserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
