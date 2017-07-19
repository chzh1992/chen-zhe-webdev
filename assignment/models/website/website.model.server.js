var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('AssignmentWebsiteModel',websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPageToWebsite = addPageToWebsite;
websiteModel.removePageFromWebsite = removePageFromWebsite;

module.exports = websiteModel;

function createWebsite(userId,website){
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsiteToUser(userId, website._id)
                .then(function (doc){
                    return websiteModel
                        .findById(website._id);
                });
        });
}

function findWebsitesByUser(userId){
    return websiteModel
        .find({_user: userId});
}

function findWebsiteById(websiteId){
    return websiteModel
        .findById(websiteId);
}

function updateWebsite(websiteId,website){
    return websiteModel
        .update({_id: websiteId},{
            $set: {
                name: website.name,
                description: website.description
            }
        });
}

function deleteWebsite(websiteId){
    return websiteModel
        .findById(websiteId)
        .then(function (website){
            var userId = website._user;
            return websiteModel
                .remove({_id: websiteId})
                .then(function (status){
                    return userModel
                        .removeWebsiteFromUser(userId, websiteId);
                });
        });
}

function addPageToWebsite(websiteId,pageId){
    return websiteModel
        .findById(websiteId)
        .then(function (website){
            website._pages.push(pageId);
            return website.save();
        });
}

function removePageFromWebsite(websiteId,pageId){
    return websiteModel
        .findById(websiteId)
        .then(function (website){
            var index = website._pages.indexOf(pageId);
            website._pages.splice(index,1);
            return website.save();
        })
}