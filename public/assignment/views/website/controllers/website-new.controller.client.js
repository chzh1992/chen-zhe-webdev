(function (){
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController',NewWebsiteController);

    function NewWebsiteController($location,$routeParams,WebsiteService){
        var model = this;
        model.userId = $routeParams['uid'];

        function init(){
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        model.createWebsite = createWebsite;

        function createWebsite(){
            model.website._id = Date.now();
            WebsiteService.createWebsite(model.userId,model.website);
            $location.url("/user/"+ model.userId + "/website");
        }

    }
})();