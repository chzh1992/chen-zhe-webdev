(function (){
    angular
        .module('Libri')
        .directive('prFadingScreen',prFadingScreen);

    function prFadingScreen(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            angular.element(window).scroll(function(){
                angular.element(element).css("opacity", 1 - $(window).scrollTop() / 500);
            });
        }
    }
})();