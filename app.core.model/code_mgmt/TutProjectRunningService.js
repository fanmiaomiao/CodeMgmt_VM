﻿/**
 * Created by miaomiao on 2016/3/2.
 */
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 2434;
var chanelToMaster = new net.Socket();
chanelToMaster.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});
chanelToMaster.on('disconnect',function(data) {
   console.log('server disconnected!');
});
chanelToMaster.on('error',function(data) {
   console.log('ERROR:'+data);
});
var spawn = require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var message = require('../../app.util/messageGenerator.js');
var http = require('http');
var server = http.createServer();

var childProcessMap = {};
// 启动 给定参数和路径 、tpId
exports.startProject = function(tpId,path,next) {

    // 获取端口号
    var autoPort;
    var testPort = 0;
    while(testPort < 20000){
        server.listen(0);
        testPort = server.address().port;
        server.close();
    }
    autoPort = testPort;
    // todo ????tpId???????·??
    //var path = '../processEngine/app';

    //1.获取项目启动路径
    var processParameterMap = {
        uuid1 : {path:'./app.core.model/code_mgmt/_test/6b0b84f6-f3ef-4706-860b-27077dadc382/'+path , port:autoPort},
        uuid2 : {path:'./app.core.model/code_mgmt/_test/6b0b84f6-f3ef-4706-860b-27077dadc382/'+path, port:autoPort}
    };

    var processParameter = processParameterMap[tpId];

    //2.启动项目
    var opts = {
        env:{
            PORT:processParameter.port
        }
    };
    var childProcess = spawn('node',[processParameter.path],opts);
    childProcess.tpId=tpId;
    childProcess.stdout.on('data',function(data) {
        var dataPkg = {
            tpId:childProcess.tpId,
            data:decoder.write(data)
        };
        chanelToMaster.write(JSON.stringify(dataPkg));
        //ConsoleService.sendDataToWebConsole(childProcess.tpId,decoder.write(data));

    });

    childProcess.stderr.on('data',function(data) {
        console.log('stderr', decoder.write(data));
        // next(new Error(decoder.write(data)));
    });

    //3.将启动项目的子进程放到池里
    childProcessMap[tpId] = childProcess;
    next(message.genSimpSuccessMsg('startProject',JSON.parse(autoPort)));
};

// 中止 tpId
exports.stopProject = function(tpId,next) {

    // 1.从进程池中获得子进程
    var childProcess = childProcessMap[tpId];

    //2.结束子进程
    childProcess.kill();

    next();

};

