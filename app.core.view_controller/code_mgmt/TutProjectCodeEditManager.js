/**
 * Created by miaomiao on 2016/3/8.
 */
var codeEditService = require('../../app.core.model/code_mgmt/TutProjectCodeEditService');
var fs = require('fs');

function Controller(router) {
    var me = this;
    router.get('/openCodeFile',function (req,res) {
        me.doOpenCodeFile(req,res);
    });
    router.post('/saveCodeFile', function (req, res) {
        me.doSaveCodeFile(req, res);
    });
};

Controller.prototype.doOpenCodeFile = function (req,res) {
    var path = './app.core.model/code_mgmt/_test/uuid1/'+req.query.path;
    codeEditService.openCodeFile (path,function(data){
        res.send(data);
    });
};

Controller.prototype.doSaveCodeFile = function(req,res) {
    //var tpId = req.query.tpId;
    //var path1 = './_test/readFile.js';

    var string = req.body.fileContent;
    console.log(string);
    var path = req.body.filePath;
    //var string = 'hello11111';
    //var buf = new Buffer(string,'utf8');

    //var fileReadStream = fs.createReadStream(path1,{encoding:'utf8'});

    codeEditService.saveCodeFile(string,path,function(){
        res.send('ok');

    });
};

module.exports = Controller;