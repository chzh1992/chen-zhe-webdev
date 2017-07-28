(function (){
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController);

    function EditPageController($routeParams,$location,PageService){
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init(){
            PageService
                .findPageById(model.pageId)
                .then(initializeCurrentPage);

            PageService
                .findPagesByWebsiteId(model.websiteId)
                .then(initializeWebsitePages);

            function initializeCurrentPage(response){
                model.page = response.data;
            }

            function initializeWebsitePages(response){
                model.pages = response.data;
            }
        }
        init();

        function updatePage(){
            model.form.$submitted = true;
            if (model.form.pageName.$error.required){
                model.message = "Required field(s) empty!";
                return null;
            }
            PageService
                .updatePage(model.pageId,model.page)
                .then(function (response){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }

        function deletePage(){
            PageService
                .deletePage(model.pageId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
        }
    }
})();