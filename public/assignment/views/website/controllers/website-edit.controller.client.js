(function (){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController',EditWebsiteController);

    function EditWebsiteController($location,$routeParams,WebsiteService){
    var model = this;
    model.userId = $routeParams['uid'];
    model.websiteId = $routeParams['wid'];

    model.deleteWebsite = deleteWebsite;
    model.updateWebsite = updateWebsite;

    function init(){
        WebsiteService
                .findWebsitesByUser(model.userId)
                .then(initializeUserWebsites);
            WebsiteService
                .findWebsiteById(model.websiteId)
                .then(initializeCurrentWebsite);

            function initializeUserWebsites(response){
                model.websites = response.data;
            }

            function initializeCurrentWebsite(response){
                model.website = response.data;
            }
        }
        init();

        function deleteWebsite(){
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website");
                });
        }

        function updateWebsite(){
            if (model.website.name == ""){
                model.message = "A website must have a name";
                return null;
            }
            WebsiteService
                .updateWebsite(model.websiteId,model.website)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website");
                });
        }
    }
})();