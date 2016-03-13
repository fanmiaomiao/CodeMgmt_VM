/**
 * Created by miaomiao on 2016/3/13.
 */
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var net = require('net');
var HOST = '192.168.1.70';
var PORT = 2433;
var chanelToMaster = new net.Socket();
chanelToMaster.connect(PORT,HOST,function(){
    console.log('Connected to:' + HOST +":" +PORT);
});

exports.openCodeFile = function (path,next) {
    var buffer = '';
    var fileReadStream = fs.createReadStream(path,{encoding:'utf8'});
    fileReadStream.on('data' ,function(data){
        buffer += decoder.write(data);
    });
    fileReadStream.on('end', function () {
        next(buffer);
        //chanelToMaster.write(data);
    });

};

exports.saveCodeFile = function (string,path,next) {
    //向文件写内容
    var realPath = './app.core.model/code_mgmt/_test/uuid1/'+path;
    fs.writeFile(realPath,string,function(err) {
        if(err)
            next(err);
        next(string);
    });
};
