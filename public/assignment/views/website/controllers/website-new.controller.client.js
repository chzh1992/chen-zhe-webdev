(function (){
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController',NewWebsiteController);

    function NewWebsiteController($location,$routeParams,WebsiteService){
        var model = this;
        model.userId = $routeParams['uid'];

        model.createWebsite = createWebsite;

        function init(){
            WebsiteService
                .findWebsitesByUser(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function createWebsite(){
            model.form.$submitted = true;
            if (model.form.websiteName.$error.required){
                model.message = "Required field(s) empty!";
                return null;
            }
            WebsiteService
                .createWebsite(model.userId,model.website)
                .then(function (response) {
                    $location.url("/user/"+ model.userId + "/website");
                });
        }
    }
})();