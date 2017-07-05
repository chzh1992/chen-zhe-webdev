(function () {
    angular
        .module('WebAppMaker')
        .directive('wdSortable',wdSortable);

    function wdSortable(){
        return {
            link: linkFunction
        }

        function linkFunction(scope,element){
            $(element).sortable({
                handle: ".handle",
                update: reorderServerWidgets 
            });
            
            function reorderServerWidgets(event,ui) {
                
            }
        }
    }
})();