(function (){
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController);

    function EditPageController($routeParams,$location,PageService){
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        function init(){
            model.page = PageService.findPageById(model.pageId);
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }

        init();

        model.updatePage = updatePage;

        function updatePage(){
            if (model.page.name == ""){
                model.message = "A page must have a name";
                return null;
            }
            PageService.updatePage(model.pageId,model.page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        model.deletePage = deletePage;

        function deletePage(){
            PageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();