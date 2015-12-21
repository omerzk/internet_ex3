var net = require('net');
var parser = require('hujirequestparser');

exports.createServer = function(port, callBack, serverObj){
    var server  = net.createServer();
    server.listen(port, function(req){
        serverObj.processReq(parser.parse(req));
    });
    return server;
}

function serverCallBack(req){

    var parseReq = parser.parse(req);

}
