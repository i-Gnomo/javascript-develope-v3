var PORT = 3030; //

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types; //
var path = require('path');

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("demo-mapbox", pathname); //这里设置自己的文件名称;

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);

//创建线程 执行再浏览器打开网址的命令
var exec= require('child_process').exec;
var myurl = 'http://localhost:3030/guide_map.html';
switch (process.platform) {
    case "darwin":
        exec('open ' + myurl);
        break;
    case "win32":
        exec('start ' + myurl);
        break;
    default:
        exec('xdg-open', myurl);
}
//nightmarejs
console.log("Server runing at port: " + PORT + ". url: http://localhost:3030/guide_map.html");