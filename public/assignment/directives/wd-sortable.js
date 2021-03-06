(function () {
    angular
        .module('WebAppMaker')
        .directive('wdSortable',wdSortable);

    function wdSortable(WidgetService){
        return {
            link: linkFunction
        }

        function linkFunction(scope,element){
            angular.element(element).sortable({
                handle: ".handle",
                start: setInitialIndex,
                update: updateServerWidgetPosition
            });
            
            function updateServerWidgetPosition(event,ui) {
                var sortedIds = angular.element(element).sortable("toArray");
                var widgetId = ui.item.attr("id");
                var initial = ui.item.initialIndex;
                var final = sortedIds.indexOf(widgetId);
                WidgetService
                    .findWidgetById(widgetId)
                    .then(updatePosition);

                function updatePosition(response){
                    var pageId = response.data._page;
                    WidgetService
                        .updateWidgetPosition(pageId,initial,final)
                        .then(function (response) {});
                }
            }

            function setInitialIndex(event,ui){
                var sortedIds = angular.element(element).sortable("toArray");
                ui.item.initialIndex = sortedIds.indexOf(ui.item.attr("id"));
            }

        }
    }
})();