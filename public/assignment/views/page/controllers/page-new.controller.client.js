(function (){
    angular
        .module('WebAppMaker')
        .controller('NewPageController',NewPageController);

    function NewPageController($location,$routeParams,PageService){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init(){
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        model.createPage = createPage;

        function createPage(){
            model.page._id = Date.now();
            PageService.createPage(model.websiteId,model.page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }


    }
})();