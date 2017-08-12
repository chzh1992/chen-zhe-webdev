(function (){
    angular
        .module('Libri')
        .controller('PersonalPageBookshelfController',PersonalPageBookshelfController);

    function PersonalPageBookshelfController(){
        var model = this;

        model.getSearchText = getSearchText;

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();