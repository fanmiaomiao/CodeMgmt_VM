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
    //var path = './app.core.model/code_mgmt/_test/'+req.query.tpId+'/'+req.query.path;
    var path='./app.core.model/code_mgmt/_test/6b0b84f6-f3ef-4706-860b-27077dadc382/'+req.query.path;

    codeEditService.openCodeFile (path,function(data){
        res.send(data);
    });
};

Controller.prototype.doSaveCodeFile = function(req,res) {
    var string = req.body.fileContent;
    var path = req.body.filePath;
    codeEditService.saveCodeFile(string,path,function(message){
        res.send(message);
    });
};

module.exports = Controller;