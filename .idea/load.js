/**
 * Created by omer on 24/12/2015.
 */
var http  = require("http");
var app = require("./hujiwebserver")
var s;
var PORT = "1035";
var rootDIR = "/Users/omer/Desktop/cs/internet/internet/ex2";

load = function(clients){
    var successfull = 0
    s = app.start(PORT, rootDIR, function(err){err==undefined?console.log("baaad"):console.log("gooood")});
    for(var i = 0;i < clients;i++){
        http.get({
            host: 'localhost',
            port: PORT,
            path: '/pelvic.gif'  },
            function(res) {
            if(res.statusCode == 200)console.log(++successfull);
            // consume response body
            res.resume();
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    }
    return successfull
}

close = function(){s.stop()}

load(300);
