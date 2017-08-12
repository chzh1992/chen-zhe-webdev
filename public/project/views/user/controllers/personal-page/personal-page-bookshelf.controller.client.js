(function (){
    angular
        .module('Libri')
        .controller('PersonalPageBookshelfController',PersonalPageBookshelfController);

    function PersonalPageBookshelfController(UserService){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;
        model.putBookOnBookshelf = putBookOnBookshelf;
        model.removeBookFromBookshelf = removeBookFromBookshelf;

        function init(){
            UserService
                .getUserBookshelf()
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

        function putBookOnBookshelf(libriId,bookshelfPart){
            UserService
                .putBookOnBookshelf(libriId,bookshelfPart)
                .then(
                    function (response){
                        moveBook(libriId,bookshelfPart);
                    }
                )
        }

        function moveBook(libriId,bookshelfPart){
            for (var part in model.user){
                if (model.user.hasOwnProperty(part)){
                    removeBookFromBookshelf(libriId,part);
                    if (part.toUpperCase() === bookshelfPart){
                        model.user[part].push(libriId);
                    }
                }
            }
        }

        function removeBookFromBookshelf(libriId,bookshelfPart){
            var bkp = model.user[bookshelfPart];
            var index;
            for (var book in bkp){
                if (bkp[book]._id === libriId){
                    index = book;
                    break;
                }
            }
            bkp.splice(index,1);
        }
    }

})();