var app = require('../../express');
var bcrypt = require('bcrypt-nodejs');

app.get("/api/project/checkLoggedIn",checkLoggedIn);

function checkLoggedIn(req,res){
    if (req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
}

