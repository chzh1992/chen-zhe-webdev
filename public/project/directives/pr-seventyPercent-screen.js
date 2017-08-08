(function (){
    angular
        .module('Libri')
        .directive('prSeventyPercentScreen',prSeventyPercentScreen);

    function prSeventyPercentScreen(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            angular.element(element).css("min-height",0.7*angular.element(window).height());
        }
    }
})();