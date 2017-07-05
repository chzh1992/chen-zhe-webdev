var app = require('../../express');

app.post('/api/website/:websiteId/page',createPage);
app.get('/api/website/:websiteId/page',findPagesByWebsiteId);
app.get('/api/page/:pageId',findPageById);
app.put('/api/page/:pageId',updatePage);
app.delete('/api/page/:pageId',deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function createPage(req,res){
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page._id = Date.now();
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page);
}

function findPagesByWebsiteId(req,res){
    var websiteId = req.params['websiteId'];
    var foundPages = [];
    for (var page in pages){
        if (pages[page].websiteId == websiteId)
            foundPages.push(pages[page]);
    }
    res.json(foundPages);
}

function findPageById(req,res){
    var pageId = req.params['pageId'];
    for (var page in pages){
        if (pages[page]._id == pageId){
            res.json(pages[page]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req,res){
    var pageId = req.params['pageId'];
    var page = req.body;
    for (var i in pages){
        if (pages[i]._id == pageId){
            pages[i] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req,res){
    var pageId = req.params['pageId'];
    for (var page in pages){
        if (pages[page]._id == pageId){
            pages.splice(page,1);
            break;
        }
    }
    res.sendStatus(200);
}