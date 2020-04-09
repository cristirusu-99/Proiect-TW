// check if a file exists - read the api docs to learn how to check if a file exists
// there is a special variable in each module __dirname it contains the directory name of this file

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
  
  fs.readFile('./' + request.url, function(err, data) {
    if (!err) {
        var dotoffset = request.url.lastIndexOf('.');
        var mimetype = dotoffset == -1
                        ? 'text/plain'
                        : {
                            '.html' : 'text/html',
                            '.ico' : 'image/x-icon',
                            '.jpg' : 'image/jpeg',
                            '.png' : 'image/png',
                            '.gif' : 'image/gif',
                            '.css' : 'text/css',
                            '.js' : 'text/javascript'
                            }[ request.url.substr(dotoffset) ];
        response.setHeader('Content-type' , mimetype);
        response.end(data);
        console.log( request.url, mimetype );
    } else {
        console.log ('file not found: ' + request.url);
     //   response.writeHead(404, "Not Found");
        response.end();
    }
});
}
).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');


