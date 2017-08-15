(function (){
    angular
        .module('Libri')
        .controller('AdminUserEditController',AdminUserEditController);

    function AdminUserEditController(Admin,$routeParams,UserService,$location){
        var model = this;
        var userId = $routeParams['userId'];
        model.user = Admin;

        model.logout = logout;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.addNewFollowing = addNewFollowing;
        model.removeFollowing = removeFollowing;
        model.addNewWantToRead = addNewWantToRead;
        model.addNewReading = addNewReading;
        model.addNewHaveRead = addNewHaveRead;
        model.moveBook = moveBook;
        model.removeFromBookshelf = removeFromBookshelf;
        model.addNewClaimedWork = addNewClaimedWork;
        model.removeAuthoredBook = removeAuthoredBook;

        function init(){
            UserService
                .findUserById(userId)
                .then(
                    function (response){
                        model.userEditing = response.data;
                    }
                );
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function (resonse){
                        $location.url('/');
                    }
                );
        }

        function updateUser(){
            if (model.form.username.$error.required ||
                model.form.password.$error.required ||
                model.form.role.$error.required) {
                model.error = "Required field(s) empty!";
            } else {
                UserService
                    .updateUser(model.userEditing._id,model.userEditing)
                    .then(
                        function(response){
                            model.message = "Successfully updated!";
                        },function (err){
                            model.error = "Update failed!";
                        }
                    );
            }
        }

        function deleteUser(){
            UserService
                .deleteUser(model.userEditing._id)
                .then(
                    function(response){
                        $location.url('/admin');
                    }
                )
        }

        function addNewFollowing(){
            if (isInputValid(model.newFollowing)){
                model.userEditing.following.push(model.newFollowing);
                model.newFollowing = '';
            }
        }

        function removeFollowing(following){
            var index = model.userEditing.following.indexOf(following);
            model.userEditing.following.splice(index,1);
        }

        function addNewWantToRead(){
            if (isInputValid(model.newWantToRead)){
                model.userEditing.bookshelf.wantToRead.push(model.newWantToRead);
                model.newWantToRead = '';
            }
        }

        function addNewReading(){
            if (isInputValid(model.newReading)){
                model.userEditing.bookshelf.reading.push(model.newReading);
                model.newReading = '';
            }
        }

        function addNewHaveRead(){
            if (isInputValid(model.newHaveRead)){
                model.userEditing.bookshelf.haveRead.push(model.newHaveRead);
                model.newHaveRead = '';
            }
        }

        function moveBook(book,bookshelfPart){
            removeFromBookshelf(book);
            model.userEditing.bookshelf[validifyBookshelfPart(bookshelfPart)].push(book);
        }

        function validifyBookshelfPart(bookshelfPart){
            if (bookshelfPart === 'WANTTOREAD'){
                return 'wantToRead';
            } else if (bookshelfPart === 'READING'){
                return 'reading';
            } else if (bookshelfPart === 'HAVEREAD'){
                return 'haveRead';
            }
        }

        function removeFromBookshelf(book){
            var index_wantToRead = model.userEditing.bookshelf.wantToRead.indexOf(book);
            if (index_wantToRead > -1){
                model.userEditing.bookshelf.wantToRead.splice(index_wantToRead,1);
            }
            var index_reading = model.userEditing.bookshelf.reading.indexOf(book);
            if (index_reading > -1){
                model.userEditing.bookshelf.reading.splice(index_reading,1);
            }
            var index_haveRead = model.userEditing.bookshelf.haveRead.indexOf(book);
            if (index_haveRead > -1){
                model.userEditing.bookshelf.haveRead.splice(index_haveRead,1);
            }
        }

        function isInputValid(input){
            return !(input == '' || input == null);
        }

        function addNewClaimedWork(){
            if (isInputValid(model.newClaimedWork)){
                model.userEditing.authoredBooks.push(model.newClaimedWork);
                model.newClaimedWork = '';
            }
        }

        function removeAuthoredBook(book){
            var index = model.userEditing.authoredBooks.indexOf(book);
            model.userEditing.authoredBooks.splice(index,1);
        }

    }
})();