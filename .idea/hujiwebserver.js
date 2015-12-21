var hujinet = require('hujinet');

exports.start = function(port, rootFolder, callback){
    try{
        var serverObj = new ServerObj(port, rootFolder);

    }
    catch(e){

    }
    callback();
}




function ServerObj(port, rootFolder){
    Object.definePrperty(this,'port',{value:port});
    Object.defineProperties(this,'rootFolder',{value:rootFolder});
    var server = hujinet.createServer();

}