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

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req,res){
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget._id = Date.now();
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function findWidgetsByPageId(req,res){
    var pageId = req.params['pageId'];
    var foundWidgets = [];
    for (var widget in widgets){
        if (widgets[widget].pageId == pageId)
            foundWidgets.push(widgets[widget]);
    }
    res.json(foundWidgets);
}

function findWidgetById(req,res){
    var widgetId = req.params['widgetId'];
    for (var widget in widgets){
        if (widgets[widget]._id == widgetId){
            res.json(widgets[widget]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req,res){
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    for (var i in widgets){
        if (widgets[i]._id == widgetId){
            widgets[i] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req,res){
    var widgetId = req.params['widgetId'];
    for (var widget in widgets){
        if (widgets[widget]._id == widgetId){
            widgets.splice(widget,1);
            break;
        }
    }
    res.sendStatus(200);
}

function updateWidgetPosition(req,res){
    var pageId = req.params['pageId'];
    var initial = req.query['initial'];
    var final = req.query['final'];
    var pageWidgets = [];
    for (var widget in widgets){
        if (widgets[widget].pageId == pageId)
            pageWidgets.push(widgets[widget]);
    }
    var widgetToMove = pageWidgets[initial];
    var initialPositionInServer = widgets.indexOf(widgetToMove);
    var finalPositionInServer = widgets.indexOf(pageWidgets[final]);
    widgets.splice(initialPositionInServer,1);
    widgets.splice(finalPositionInServer,0,widgetToMove);
    res.sendStatus(200);
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

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl   = "assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId;

    res.redirect(callbackUrl);

    function getWidgetById(id){
        for (var widget in widgets){
            if (widgets[widget]._id == id){
                return widgets[widget];
            }
        }
        return null;
    }
}
