/**
 * Created with JetBrains WebStorm.
 * User: maoyw
 * Date: 7/12/12
 * Time: 7:08 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */

var web_path = __dirname + '/../src/'
    ,express = require('express')
    ,http = require('http')
    ,fs = require('fs')
    ,path = require('path');


// express 4.x app
var app = express();
var methodOverride = require('method-override');
var bodyParser = require("body-parser");
var compress = require("compression");
var errorHandler = require("errorhandler");
var multer = require("multer");
var logger = require("morgan");
var router = express.Router();

// Configure express
// ------------------------------------
var uploadDir = __dirname + '/uploads-tmp';
console.log('upload dir: ' + uploadDir);
app.use(multer({uploadDir:uploadDir}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);

app.use(errorHandler({ dumpExceptions: true, showStack: true }));

console.log(app.get('env'))
if ('development' == app.get('env')) {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
// app.configure('development', function(){
//    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//    app.use(errorHandler());
// });


app.use(logger(':method :url :status'));

// enable GZip compression
app.use(compress());

// serve static files
app.use(express.static(web_path));

//// express router
// app.use(router);


// Start the app by listening on <port>
var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
server.listen(port);
console.log('Express app started on port ' + port);
