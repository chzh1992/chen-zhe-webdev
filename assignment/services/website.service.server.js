var app = require('../../express');

    function WebsiteService(){
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website){
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId){
            var foundWebsites = [];
            for (var website in websites){
                if (websites[website].developerId == userId)
                    foundWebsites.push(websites[website]);
            }
            return foundWebsites;
        }

        function findWebsiteById(websiteId){
            for (var website in websites){
                if (websites[website]._id == websiteId)
                    return websites[website];
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for (var i in websites){
                if (websites[i]._id == websiteId){
                    websites[i] = website;
                    break;
                }
            }
        }

        function deleteWebsite(websiteId){
            for (var website in websites){
                if (websites[website]._id == websiteId){
                    websites.splice(website,1);
                    break;
                }
            }
        }
    }