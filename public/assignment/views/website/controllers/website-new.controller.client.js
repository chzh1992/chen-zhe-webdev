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
            if (typeof(model.website) == "undefined" ||
                model.website.name == ""){
                model.message = "A website must have a name";
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