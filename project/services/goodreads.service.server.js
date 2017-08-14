var q = require('q');
var app = require('../../express');
var https = require('https');
var parseString = require('xml2js').parseString;

app.get("/api/project/search/goodreads/:searchText/:pageNumber",searchGoodreads);
app.get("/api/project/goodreads/:goodreadsId",searchGoodreadsById);

var developerKey = process.env.GOODREADS_DEVELOPER_KEY;

function searchGoodreads(req,res){
    var searchText = req.params['searchText'];
    var pageNumber = req.params['pageNumber'];
    var options = SearchGoodreadsOptions(searchText,pageNumber);
    getGoodreadsResponse(options)
        .then(function (response){
            // var results = response.GoodreadsResponse.search[0];
            var work = response.GoodreadsResponse.search[0].results[0].work;
            work = prettifyGoodreadsSearchResults(work);
            var results ={
                work: work,
                total: response.GoodreadsResponse.search[0]['total-results'][0]
            };
            res.json(results);
        },function (error){
            res.sendStatus(404);
        });
}

function prettifyGoodreadsSearchResults(results){
    var prettifiedResults = [];
    for (var work in results){
        var book = results[work].best_book[0];
        var prettifiedWork = {
            id: book.id[0]._,
            title: book.title[0],
            image_url: book.image_url[0],
            author: book.author[0].name[0],
            original_publication_year: results[work].original_publication_year[0]._,
            average_rating: results[work].average_rating[0]
        };
        prettifiedResults.push(prettifiedWork);
    }
    return prettifiedResults;
}

function SearchGoodreadsOptions(searchText,pageNumber){
    var options = {
        host: 'www.goodreads.com',
        path: '/search/index.xml?key='+developerKey+'&q='+searchText + '&page=' + pageNumber
    }
    return options;
}

function searchGoodreadsById(req,res){
    var goodreadsId = req.params['goodreadsId'];
    var options = searchGoodreadsByIdOptions(goodreadsId);
    return getGoodreadsResponse(options)
        .then(
            function (response){
                var book = response.GoodreadsResponse.book[0];
                book = prettifyGoodreadsBook(book);
                res.json(book);
            },function (error){
                res.sendStatus(502);
            });
}

function prettifyGoodreadsBook(book){
    var prettifiedBook = {
        id: book.id[0],
        author: book.authors[0].author[0].name[0],
        title: book.title[0],
        average_rating: book.average_rating[0],
        description: book.description[0],
        image_url: book.image_url[0],
        isbn: book.isbn[0],
        reviews_widget: book.reviews_widget[0].replace(/[\n\r]/g, ''),
        publication_year: book.publication_year[0],
        publication_month: book.publication_month[0],
        publication_day: book.publication_day[0],
        publisher: book.publisher[0]
    };
    return prettifiedBook;
}

function searchGoodreadsByIdOptions(goodreadsId){
    var options = {
        host: 'www.goodreads.com',
        path: '/book/show/' + goodreadsId + '.xml?key=' + developerKey
    }
    return options;
}

function getGoodreadsResponse(options){
    var deferred = q.defer();
    https.get(options, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                parseString(body,function(err,result){
                    body = result;
                });
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}
