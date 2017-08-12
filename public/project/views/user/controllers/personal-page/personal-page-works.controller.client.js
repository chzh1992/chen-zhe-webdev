(function (){
    angular
        .module('Libri')
        .controller('PersonalPageWorksController',PersonalPageWorksController);

    function PersonalPageWorksController(){
        var model = this;

        model.getSearchText = getSearchText;

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();