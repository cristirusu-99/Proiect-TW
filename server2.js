
// read in the api documentation about reading files.
// read some file to the output
//
// there are many options actually.
// files coud be read with a callback. - quite efficient and simple i will use this way.
// files coud be read Sync as a return value from the function - blocking the program, this way the program wont be able serve others while waithing for the file to be read from disk.
// a stream could be created and piped to the response stream - most cpu and memory efficient.

var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
  var purl=url.parse(req.url,true);
  if(purl.pathname=='/test')
  res.end('Test');
  else
  fs.readFile('server2.js', function (err, data) {
    if (err) throw err;
//    console.log(data);
    res.end(data);
  });
  
  
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');