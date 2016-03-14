/**
 * Created by miaomiao on 2016/3/9.
 */
var http = require('http');
exports.syncope = function (postData, method, path, reqType, resType, next) {
    var reqBodyStr, headers, options, internalReq;
    //准备post的数据
    reqBodyStr = JSON.stringify(postData);

    headers = {
        "Authorization":"Basic YWRtaW46cGFzc3dvcmQ=",
        "Content-Type":(reqType) ? reqType : 'application/json;charset=utf-8',
        "Accept": (resType) ? resType : "application/json"
    };
    options = {
        host: '192.168.1.70',
        port: 2433,
        path: path,
        method: (method) ? method : 'get',
        headers: headers
    };

    internalReq = http.request(options, function (newRes) {
        newRes.setEncoding('utf-8');
        var responseString = '';
        newRes.on('data', function (data) {
            responseString += data;
        });
        newRes.on('end', function () {
            try {
                console.log(responseString);
                //res.setHeader("Content-Type", (resType) ? resType : "application/json");
                //res.send(responseString);
                if (next){
                    next(JSON.parse(responseString));
                }
            }catch (e){
                //res.send('error');
                next('error');
            }

        });
    });
    internalReq.on('error', function (e) {
        console.log('e');
    });
    if (method==='post'){
        internalReq.write(reqBodyStr);
    }
    internalReq.end();
};