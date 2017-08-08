(function (){
    angular
        .module('Libri')
        .directive('prDoubleSearchBar',prDoubleSearchBar);

    function prDoubleSearchBar(){
        return {
            link: linkFunction
        };

        function linkFunction(scope,element){
            var primarySearchBar = angular.element(element).find('#primarySearchBar');
            var secondSearchBar = angular.element(element).find('#secondSearchBar');
            angular.element(window).scroll({p:primarySearchBar,s:secondSearchBar},hideShowSecondSearchBar);
        }

        function hideShowSecondSearchBar(event){
            var primarySearchBar = event.data.p;
            var secondSearchBar = event.data.s;
            if (isScrolledOutOfView(primarySearchBar)){
                secondSearchBar.css ('visibility','visible');
                secondSearchBar.show('Puff');
            } else{
                secondSearchBar.hide('Puff');
            }
        }

        //https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
        function isScrolledOutOfView(elem)
        {
            var docViewTop = angular.element(window).scrollTop();
            var docViewBottom = docViewTop + angular.element(window).height();

            var elemTop = angular.element(elem).offset().top;
            var elemBottom = elemTop + angular.element(elem).height();

            return ((elemBottom < docViewTop) || (elemTop > docViewBottom));
        }

    }
})();