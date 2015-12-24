exports.parse = function (rawData) {
    var methodsRegex = /(GET|POST|DELETE|HEAD|PUT|CONNECT|OPTIONS|TRACE)/
    var protocolRegex = /HTTP\/\d{1,2}.\d{1,2}/
    var keepAliveRegex = /Connection: Keep-Alive/i
    var killRegex = /Connection: close/i
    var validRequest = new RegExp(methodsRegex.source + " " + ".+" + " " + protocolRegex.source, 'i')
    var dataList = rawData.split(/(\r\n)/, 1)
    var requestText;
    var res;

    if (!validRequest.test(dataList[0])) {
        return null;
    }

    requestText = dataList[0].split(/ /)
    res = new HttpRequest();
    res.type = requestText[0]
    res.path = requestText[1]
    res.version = requestText[requestText.length - 1]

    if (res.type.match("HTTP\/1.0")) {
        res.keepAlive = keepAliveRegex.test(dataList[1])
    }
    res.keepAlive = res.keepAlive && !killRegex.test(dataList[1])
    console.log("parsed:"  + res.path);
    return res

}


function HttpRequest() {
    this.type = undefined;
    this.path = undefined;
    this.keepAlive = true;
    this.version = undefined;
}

