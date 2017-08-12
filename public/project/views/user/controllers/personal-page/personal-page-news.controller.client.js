(function (){
    angular
        .module('Libri')
        .controller('PersonalPageNewsController',PersonalPageNewsController);

    function PersonalPageNewsController(){
        var model = this;

        model.getSearchText = getSearchText;

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();