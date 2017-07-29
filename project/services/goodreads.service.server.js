var q = require('q');
var app = require('../../express');
var https = require('https');
var parseString = require('xml2js').parseString;

app.get("/api/project/search/:searchText",searchGoodreads);
app.get("/api/project/book/:goodreadsId",searchGoodreadsById);

var developerKey = 'XMhP6c4CRGTAGXMtpjS7IA';

function searchGoodreads(req,res){
    var searchText = req.params['searchText'];
    var options = SearchGoodreadsOptions(searchText);
    getGoodreadsResponse(options)
        .then(function (response){
            res.json(response.GoodreadsResponse.search[0].results[0].work);
        },function (error){
            res.sendStatus(404);
        });
}

function SearchGoodreadsOptions(searchText){
    var options = {
        host: 'www.goodreads.com',
        path: '/search/index.xml?key='+developerKey+'&q='+searchText
    }
    return options;
}

function searchGoodreadsById(req,res){
    var goodreadsId = req.params['goodreadsId'];
    var options = searchGoodreadsByIdOptions(goodreadsId);
    getGoodreadsResponse(options)
        .then(function (response){
            res.json(response.GoodreadsResponse.book[0]);
        },function (error){
            res.sendStatus(404);
        });
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