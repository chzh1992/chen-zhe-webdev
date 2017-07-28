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

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetEditorUrlForType = getWidgetEditorUrlForType;

        function init(){
            WidgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = response.data;
                    model.sizeAsText = model.widget.size.toString();
                });
        }
        init();

        function updateWidget(){
            model.form.$submitted = true;
            if (model.form.widgetName.$error.required){
                model.message = "Required field(s) empty!";
                return;
            }
            model.widget.size = Number(model.sizeAsText);
            WidgetService
                .updateWidget(model.widgetId,model.widget)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget(){
            WidgetService
                .deleteWidget(model.widgetId)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function getWidgetEditorUrlForType(type){
            var editorUrl = "views/widget/editors/widget-" + type.toLowerCase() + "-edit.view.client.html";
            return editorUrl;
        }
    }
})();