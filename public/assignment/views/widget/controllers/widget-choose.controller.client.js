(function (){
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController',NewWidgetController);

    function NewWidgetController($routeParams,$location,WidgetService){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.createWidget = createWidget;

        function createWidget(type){
            var widget = {
                type: type
            }

            WidgetService
                .createWidget(model.pageId,widget)
                .then(function (response){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId +
                        "/widget/" + response.data._id);
                });
        }

    }
})();