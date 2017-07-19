var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('AssignmentWidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidgetPosition = updateWidgetPosition;

module.exports = widgetModel;

function createWidget(pageId,widget){
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget){
            return pageModel
                .addWidgetToPage(pageId,widget._id)
                .then(function(doc){
                    return widgetModel
                        .findById(widget._id);
                });
        });
}

function findWidgetsByPageId(pageId){
    return widgetModel
        .find({_page: pageId});
}

function findWidgetById(widgetId){
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId,widget){
    return widgetModel
        .update({_id: widgetId},{
            $set: {
                name: widget.name,
                text: widget.text,
                placeholder: widget.placeholder,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                deletable: widget.deletable,
                formatted: widget.formatted
            }
        });
}

function deleteWidget(widgetId){
    return widgetModel
        .findById(widgetId)
        .then(function (widget){
            var pageId = widget._page;
            return widgetModel
                .remove({_id:widgetId})
                .then(function (status){
                    return pageModel
                        .removeWidgetFromPage(pageId,widgetId);
                });
        });
}

function updateWidgetPosition(pageId,initial,final){
    return pageModel
        .findById(pageId)
        .then(function (page){
            var widgetToMove = page._widgets[initial];
            page._widgets.splice(initial,1);
            page._widgets.splice(final,0,widgetToMove);
            return page.save();
        })
}


