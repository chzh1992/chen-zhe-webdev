(function (){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController',EditWebsiteController);

    function EditWebsiteController($location,$routeParams,WebsiteService){
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init(){
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function deleteWebsite(){
            WebsiteService.deleteWebsite(model.websiteId);
            $location.url("/user/" + model.userId);
        }

        function updateWebsite(){
            WebsiteService.updateWebsite(model.website);
        }


    }
})();