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
            model.form.$submitted = true;
            if (model.form.pageName.$error.required){
                model.message = "Required field(s) empty!";
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