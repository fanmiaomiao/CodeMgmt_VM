/**
 * Created by miaomiao on 2016/3/8.
 */
var message = require('../../app.util/messageGenerator.js');
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

exports.openCodeFile = function (path,next) {
    //todo miaomiao try catch fs option
    var buffer = '';
    var fileReadStream = fs.createReadStream(path,{encoding:'utf8'});
    fileReadStream.on('data' ,function(data){
        buffer += decoder.write(data);
    });
    fileReadStream.on('end', function () {
       //next(buffer);
       next(message.genSimpSuccessMsg('openCodeFile', buffer));
    });

};

exports.saveCodeFile = function (string,path,next) {
    //向文件写内容
    var realPath = './app.core.model/code_mgmt/_test/6b0b84f6-f3ef-4706-860b-27077dadc382/'+path;

    fs.writeFile(realPath,string,function(err) {
        if(err)
            next(message.genSimpFailedMsg('saveCodeFile', err.message));
        next(message.genSimpSuccessMsg('ProjectTreeData', 'ok'));
    });
};