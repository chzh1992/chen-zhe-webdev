var app = require('../../express');
var bookModel = require('../models/book/book.model.server');
var userModel = require('../models/user/user.model.sever');

app.get("/api/search/:searchTerm",findBooksByTerm);
app.get("/api/project/book/goodreads/:goodreadsId",findBookByGoodreadsId);
app.post("/api/project/book/goodreads",importGoodreadsBook);
app.get("/api/project/newBooks",getNewBooks);
app.get("/api/project/popBooks",getPopBooks);
app.get("/api/project/quote",getQuote);

app.get("/api/project/book/:libriId",findBookById);
app.post("/api/project/book",createBook);
app.put("/api/project/book/:libriId",updateBook);
app.delete("/api/project/book/:libriId",isAdmin,deleteBook);
app.get("/api/project/book",isAdmin,findAllBooks);

function findBooksByTerm(req,res){
    var searchTerm = req.params['searchTerm'];
    searchTerm = searchTerm.split('+')[0];
    bookModel
        .findBooksByTerm(searchTerm)
        .then(
            function (books){
                if (books.length !== 0){
                    res.json(books);
                } else{
                    res.sendStatus(404);
                }
            }
        )
}

function findBookById(req,res){
    var libriId = req.params['libriId'];
    bookModel
        .findBookById(libriId)
        .then(
            function (book){
                res.json(book);
            }
        );
}

function findBookByGoodreadsId(req,res){
    var goodreadsId = req.params['goodreadsId'];
    bookModel
        .findBookByGoodreadsId(goodreadsId)
        .then(
            function (book){
                if (book !== null){
                    res.json(book);
                } else{
                    res.sendStatus(404);
                }
            }
        )
}

function createBook(req,res){
    var book = req.body;
    bookModel
        .createBook(book)
        .then(
            function (book){
                res.json(book);
            }
        );
}

function importGoodreadsBook(req,res){
    var goodreadsBook = req.body;
    bookModel
        .importGoodreadsBook(req.body)
        .then(
            function (book){
                res.json(book);
            }
        )
}

function isAdmin(req,res,next){
    if (req.isAuthenticated() && req.user.role == 'ADMIN'){
        next()
    } else{
        res.sendStatus(401);
    }
}

function updateBook(req,res){
    var libriId = req.params['libriId'];
    var book = req.body;
    delete book._id;
    bookModel
        .updateBook(libriId,book)
        .then(
            function(doc){
                res.json(200);
            },function (err){
                res.json(502);
            }
        )
}

function deleteBook(req,res){
    var libriId = req.params['libriId'];
    if (req.isAuthenticated() && req.user.role == 'ADMIN'){
        bookModel
            .deleteBook(libriId)
            .then(
                function(doc){
                    res.sendStatus(200);
                }
            )
    }else{
        res.sendStatus(401);
    }
}

function findAllBooks(req,res){
    bookModel
        .findAllBooks()
        .then(
            function (books){
                res.json(books);
            }
        )
}

function getNewBooks(req,res){
    var dummyNewBooks = [
        {
            title: "Origin (Robert Langdon #5)",
            img_url: "https://images.gr-assets.com/books/1507308545l/32283133.jpg"
        },
        {
            title: "Turtles All the Way Down",
            img_url: "https://images.gr-assets.com/books/1502482948l/15837671.jpg"
        },
        {
            title: "Without Merit",
            img_url: "https://images.gr-assets.com/books/1506608833l/33280872.jpg"
        },
        {
            title: "The Ship of the Dead (Magnus Chase and the Gods of Asgard #3)",
            img_url: "https://images.gr-assets.com/books/1493178281l/28006120.jpg"
        },
        {
            title: "All the Crooked Saints",
            img_url: "https://images.gr-assets.com/books/1500451773l/30025336.jpg"
        },
        {
            title: "Manhattan Beach",
            img_url: "https://images.gr-assets.com/books/1488832734l/34467031.jpg"
        },
        {
            title: "La Belle Sauvage (The Book of Dust #1)",
            img_url: "https://images.gr-assets.com/books/1498930382l/34128219.jpg"
        },
        {
            title: "The Rules of Magic (Practical Magic 0)",
            img_url: "https://images.gr-assets.com/books/1492802012l/34037113.jpg"
        },
        {
            title: "Forest of a Thousand Lanterns (Rise of the Empress #1)",
            img_url: "https://images.gr-assets.com/books/1496338822l/33958230.jpg"
        },
        {
            title: "I Am Watching You",
            img_url: "https://images.gr-assets.com/books/1503335237l/34914739.jpg"
        }
    ];
    res.json(randomPicker(dummyNewBooks,4));
}

function getPopBooks(req,res){
    var dummyPopBooks = [
        {
            title: "The Fireman",
            img_url: "https://images.gr-assets.com/books/1469316385l/25816688.jpg"
        },
        {
            title: "Are We Smart Enough to Know How Smart Animals Are?",
            img_url: "https://images.gr-assets.com/books/1448044158l/26530322.jpg"
        },
        {
            title: "Leonard: My Fifty-Year Friendship with a Remarkable Man",
            img_url: "https://images.gr-assets.com/books/1449593516l/25819509.jpg"
        },
        {
            title: "When Breath Becomes Air",
            img_url: "https://images.gr-assets.com/books/1463936399l/25614898.jpg"
        },
        {
            title: "Hamilton: The Revolution",
            img_url: "https://images.gr-assets.com/books/1451400644l/26200563.jpg"
        },
        {
            title: "Truly Madly Guilty",
            img_url: "https://images.gr-assets.com/books/1491249206l/26247008.jpg"
        },
        {
            title: "Truly Madly Guilty",
            img_url: "https://images.gr-assets.com/books/1491249206l/26247008.jpg"
        },
        {
            title: "End of Watch",
            img_url: "https://images.gr-assets.com/books/1468705472l/25526965.jpg"
        },
        {
            title: "The Underground Railroad",
            img_url: "https://images.gr-assets.com/books/1493178362l/30555488.jpg"
        },
        {
            title: "Harry Potter and the Cursed Child - Parts One and Two",
            img_url: "https://images.gr-assets.com/books/1470082995l/29056083.jpg"
        },
        {
            title: "Morning Star",
            img_url: "https://images.gr-assets.com/books/1461354277l/18966806.jpg"
        }
    ];
    res.json(randomPicker(dummyPopBooks,4));
}

function getQuote(req,res){
    var dummyQuotes = [
        {
            author: "Mark Twain",
            img_url: "https://images.gr-assets.com/authors/1322103868p2/1244.jpg",
            content: "If you tell the truth, you don't have to remember anything."
        },
        {
            author: "André Gide, Autumn Leaves",
            img_url: "https://images.gr-assets.com/authors/1424119198p2/7617.jpg",
            content: "It is better to be hated for what you are than to be loved for what you are not."
        },
        {
            author: "Oscar Wilde",
            img_url: "https://images.gr-assets.com/authors/1357460488p2/3565.jpg",
            content: "Be yourself; everyone else is already taken."
        },
        {
            author: "Mark Twain",
            img_url: "https://images.gr-assets.com/authors/1322103868p2/1244.jpg",
            content: "I did not attend his funeral, but I sent a nice letter saying I approved of it."
        },
        {
            author: "Arthur C. Clarke",
            img_url: "https://images.gr-assets.com/authors/1357191481p2/7779.jpg",
            content: "The only way of discovering the limits of the possible is to venture a little way past them into the impossible."
        },
        {
            author: "Albert Einstein",
            img_url: "https://images.gr-assets.com/authors/1429114964p2/9810.jpg",
            content: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle."
        },
        {
            author: "Albert Camus",
            img_url: "https://images.gr-assets.com/authors/1506091612p2/957894.jpg",
            content: "Don’t walk in front of me… I may not follow\n" +
            "Don’t walk behind me… I may not lead\n" +
            "Walk beside me… just be my friend"
        }
    ];
    res.json(randomPicker(dummyQuotes,1)[0]);
}

// That num is less than the length of the array is presumed
function randomPicker(array,num){
    return shuffleArray(array).slice(0,num);
}

function shuffleArray(array){
    var l = array.length;
    if (l <= 1){
        return array;
    }
    var a = shuffleArray(array.slice(0,l-1));
    var pos = Math.floor(Math.random()*a.length);
    a.splice(pos,0,array[l-1]);
    return a;
}