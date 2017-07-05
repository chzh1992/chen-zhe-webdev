(function (){
    angular
        .module('WebAppMaker')
        .controller('NewPageController',NewPageController);

    function NewPageController($location,$routeParams,PageService){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        model.createPage = createPage;

        function init(){
            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function createPage(){
            if (typeof(model.page) == "undefined" ||
                model.page.name == ""){
                model.message = "A new page must have a name";
                return null;
            }
            PageService
                .createPage(model.websiteId,model.page)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();