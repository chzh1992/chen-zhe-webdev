var mongoose = require('mongoose');
var pageSchmea = require('./page.schema.server');
var pageModel = mongoose.model('AssignmentPageModel',pageSchmea);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId =findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidgetToPage = addWidgetToPage;
pageModel.removeWidgetFromPage = removeWidgetFromPage;

module.exports = pageModel;

function createPage(websiteId,page){
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page){
            return websiteModel
                .addPageToWebsite(websiteId,page._id)
                .then(function (doc){
                    return pageModel
                        .findById(page._id);
                })
        });
}

function findPagesByWebsiteId(websiteId){
    return pageModel
        .find({_website: websiteId});
}

function findPageById(pageId){
    return pageModel
        .findById(pageId);
}

function updatePage(pageId,page){
    return pageModel
        .update({_id: pageId},{
        $set :{
            name: page.name,
            title: page.title,
            description: page.description
        }
        });
}

function deletePage(pageId){
    return pageModel
        .findById(pageId)
        .then(function (page){
            var websiteId = page._website;
            return pageModel
                .remove({_id: pageId})
                .then(function (status){
                   return websiteModel
                       .removePageFromWebsite(websiteId,pageId);
                });
        });
}

function addWidgetToPage(pageId,widgetId){
    return pageModel
        .findById(pageId)
        .then(function (page){
            page._widgets.push(widgetId);
            return page.save();
        });
}

function removeWidgetFromPage(pageId,widgetId){
    return pageModel
        .findById(pageId)
        .then(function (page){
            var index = page._widgets.indexOf(widgetId);
            page._widgets.splice(index,1);
            return page.save();
        });
}
