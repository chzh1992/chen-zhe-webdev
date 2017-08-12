(function (){
    angular
        .module('Libri')
        .controller('PersonalPageWorksController',PersonalPageWorksController);

    function PersonalPageWorksController(BookService,UserService,$location,$sce){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;
        model.focusOnWork = focusOnWork;
        model.trustThisContent = trustThisContent;

        function init(){
            UserService
                .getAuthorWorks()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                )

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

        function focusOnWork(libriId){
            BookService
                .getWorkInformation(libriId)
                .then(
                    function (response){
                        model.focusedWork = response.data;
                        model.user.workRelatedNews = focusedWork.news;
                    }
                );
        }

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }


    }

})();