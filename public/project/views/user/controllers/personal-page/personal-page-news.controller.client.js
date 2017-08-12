(function (){
    angular
        .module('Libri')
        .controller('PersonalPageNewsController',PersonalPageNewsController);

    function PersonalPageNewsController(UserService,$sce){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;
        model.trustThisContent = trustThisContent;

        function init(){
            UserService
                .getUserNews()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                );
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }

    }

})();