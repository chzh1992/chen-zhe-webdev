var app = require('../../express');

app.post('/api/user/:userId/website',createWebsite);
app.get('/api/user/:userId/website',findWebsitesByUser);
app.get('/api/website/:websiteId',findWebsiteById);
app.put('/api/website/:websiteId',updateWebsite);
app.delete('/api/website/:websiteId',deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req,res){
    var website = req.body;
    var userId = req.params['userId'];
    website._id = Date.now();
    website.developerId = userId;
    websites.push(website);
    res.json(website);
}

function findWebsitesByUser(req,res){
    var userId = req.params['userId'];
    var foundWebsites = [];
    for (var website in websites){
        if (websites[website].developerId == userId)
            foundWebsites.push(websites[website]);
    }
    res.json(foundWebsites);
}

function findWebsiteById(req,res){
    var websiteId = req.params['websiteId'];
    for (var website in websites){
        if (websites[website]._id == websiteId){
            res.json(websites[website]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req,res){
    var websiteId = req.params['websiteId'];
    var website = req.body;
    for (var i in websites){
        if (websites[i]._id == websiteId){
            websites[i] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req,res){
    var websiteId = req.params['websiteId'];
    for (var website in websites){
        if (websites[website]._id == websiteId){
            websites.splice(website,1);
            break;
        }
    }
    res.sendStatus(200);
}