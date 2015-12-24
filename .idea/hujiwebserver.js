var hujinet = require('./hujinet')
var fs = require('fs')
exports.start = function(port, rootFolder, callback){

    return new ServerObj(port, rootFolder, callback)
}

function ServerObj(port, rootFolder, callback){
    var supportedReq = /GET/i
    var rootFolderAbs = fs.realpathSync(rootFolder)
    var CRLF = "\r\n"
    var notFoundSize = 0;
    var supportedFiles = {
        "js": "application/javascript",
        "txt": "text/plain",
        "html": "text/html",
        "css": "text/css",
        "jpg": "image/jpeg",
        "gif": "image/gif",
        "png": "image/png"
    }

    Object.defineProperties(this,{'port':{value:port}, 'rootFolder':{value:rootFolderAbs}})

    var server = hujinet.createServer(port, callback, this)
    this.respond = function (httpRequest) {
        var response = {
            "head":"HTTP/1.1 ",
            "attributes": "",
            "fileStream":undefined
        }

        if (httpRequest == null) {
            response.head += "500 invalid request\r\n";
        }
        else if (!supportedReq.test(httpRequest.type)){
            response.head += "400 Only GET messages supported\r\n"
        }
        else {
            var fileSizeBytes;

            try{
                var path  = fs.realpathSync(rootFolderAbs + "\/" + httpRequest.path)
                if(path.indexOf(rootFolderAbs) == 0){
                    console.log(path)
                    response.head +=  "200 OK\r\n"
                    fileSizeBytes = fs.statSync(path)["size"]


                }
                else{
                    response.head += "500 Invalid path" + CRLF

                }

            }
            catch(e){
                console.log("after path")
                response.head +=  "404 File: "+ httpRequest.path +"not found" +  CRLF;
                path = "Output.html"
                notFoundSize === 0 ? notFoundSize = fs.statSync(path)["size"] : null
                fileSizeBytes = notFoundSize;
            }


            var extension = path.slice(path.lastIndexOf(".") + 1)
            if(!(extension in supportedFiles)){
                console.log("unsupported extension: " + extension)
                extension = "txt"
            }
            response.fileStream = fs.createReadStream(path)
            response.attributes += "Content-Length: " + fileSizeBytes.toString() + CRLF
            response.attributes += "Content-Type: " + supportedFiles[extension] + CRLF
            response.keepAlive = httpRequest.keepAlive
            response.attributes += CRLF



        }
        console.log("response message:  " + response.head + " " + response.attributes)
        return response

    }
    this.stop = function(callBack){server.close(callBack)}
}

//var s = start("1025","/Users/omer/Desktop/cs/internet/internet/ex2",function(err){
//    if(err === undefined){
//        console.log("Success")
//    }
//    else{
//        console.log("error: " + err)
//    }
//} )