(function (){
    angular
        .module('Libri')
        .controller('PersonalPageProfileController',PersonalPageProfileController);

    function PersonalPageProfileController(){
        var model = this;

        model.getSearchText = getSearchText;

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();