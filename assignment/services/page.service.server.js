var app = require('../../express');

app.post('/api/website/:websiteId/page',createPage);
app.get('/api/website/:websiteId/page',findPagesByWebsiteId);
app.get('/api/page/:pageId',findPageById);
app.put('/api/page/:pageId',updatePage);
app.delete('/api/page/:pageId',deletePage);

var pageModel = require('../models/page/page.model.server');

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

function createPage(req,res){
    var websiteId = req.params['websiteId'];
    var page = req.body;
    pageModel
        .createPage(websiteId,page)
        .then(function (page){
            res.json(page);
        });
}

function findPagesByWebsiteId(req,res){
    var websiteId = req.params['websiteId'];
    pageModel
        .findPagesByWebsiteId(websiteId)
        .then(function (pages){
            if (pages == null){
                res.sendStatus(404);
            } else {
                res.json(pages);
            }
        });
}

function findPageById(req,res){
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page){
            if (page == null){
                res.sendStatus(404);
            } else {
                res.json(page);
            }
        })
}

function updatePage(req,res){
    var pageId = req.params['pageId'];
    var page = req.body;
    pageModel
        .updatePage(pageId,page)
        .then(function (status){
            res.sendStatus(200);
        })
}

function deletePage(req,res){
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function (status){
            res.sendStatus(200);
        })
}