var app = require('../../express');

app.post('/api/page/:pageId/widget',createWidget);
app.get('/api/page/:pageId/widget',findWidgetsByPageId);
app.get('/api/widget/:widgetId',findWidgetById);
app.put('/api/widget/:widgetId',updateWidget);
app.delete('/api/widget/:widgetId',deleteWidget);
app.put('/page/:pageId/widget',updateWidgetPosition);

var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

var widgetModel= require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

function createWidget(req,res){
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel
        .createWidget(pageId,widget)
        .then(function (widget){
            res.json(widget);
        });
}

function findWidgetsByPageId(req,res){
    var pageId = req.params['pageId'];
    widgetModel
        .findWidgetsByPageId(pageId)
        .then(function (widgets){
            if (widgets == null){
                res.sendStatus(404);
            } else{
                pageModel
                    .findPageById(pageId)
                    .then(function (page){
                        var widgetOrder = page._widgets;
                        widgets.sort(function (a,b){
                            return widgetOrder.indexOf(a._id) - widgetOrder.indexOf(b._id);
                        });
                        res.json(widgets);
                    });
            }
    });
}

function findWidgetById(req,res){
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget){
           if (widget == null){
               res.sendStatus(404);
           } else{
               res.json(widget);
           }
        });
}

function updateWidget(req,res){
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId,widget)
        .then(function (status){
            res.sendStatus(200);
        });
}

function deleteWidget(req,res){
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status){
            res.sendStatus(200);
        });
}
function updateWidgetPosition(req,res){
    var pageId = req.params['pageId'];
    var initial = req.query['initial'];
    var final = req.query['final'];
    widgetModel
        .updateWidgetPosition(pageId,initial,final)
        .then(function (doc){
            res.sendStatus(200);
        });
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widgetFound){
            widget = widgetFound;
            widget.url = "/uploads/" + filename;
            widgetModel
                .updateWidget(widgetId,widget)
                .then(function (status){
                    var host = req.url.split('/')[0];
                    res.writeHead(301,
                        {Location: host+"/assignment/index.html#!/user/"+userId+"/website/"+
                        websiteId+"/page/"+pageId+"/widget"}
                    );
                    res.end();
                })
        });
}
