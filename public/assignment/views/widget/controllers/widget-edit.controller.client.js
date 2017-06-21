(function (){
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController',EditWidgetController);

    function EditWidgetController($location,$routeParams,WidgetService){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        function init(){
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }
        init();

        model.updateWidget = updateWidget;

        function updateWidget(){
            WidgetService.updateWidget(model.widgetId,model.widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        model.deleteWidget = deleteWidget;

        function deleteWidget(){
            WidgetService.deleteWidget(model.widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();