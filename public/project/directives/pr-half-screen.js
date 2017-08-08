(function (){
    angular
        .module('Libri')
        .directive('prHalfScreen',prHalfScreen);

    function prHalfScreen(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            angular.element(element).css("min-height",0.5*angular.element(window).height());
        }
    }
})();