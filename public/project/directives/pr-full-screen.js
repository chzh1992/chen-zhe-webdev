(function (){
    angular
        .module('Libri')
        .directive('prFullScreen',prFullScreen);

    function prFullScreen(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            angular.element(element).css("min-height",angular.element(window).height());
        }
    }
})();