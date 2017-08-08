(function (){
    angular
        .module('Libri')
        .directive('prThirtyPercentScreen',prThirtyPercentScreen);

    function prThirtyPercentScreen(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            angular.element(element).css("min-height",0.3*angular.element(window).height());
        }
    }
})();