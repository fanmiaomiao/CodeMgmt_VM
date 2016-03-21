/**
 * Created by miaomiao on 2016/3/2.
 */

var childProcessService = require('../../app.core.model/code_mgmt/TutProjectRunningService');


function Controller(router) {
    var me = this;
    // todo test url='/runProject?tpId=uuid8081|uuid8082';
    router.get('/runProject', function (req, res) {
        me.doRunProject(req, res);
    });
    router.get('/stopProject', function (req, res) {
        me.doStopProject(req, res);
    });
    router.get('/restartProject', function (req, res) {
        me.doRestartProject(req, res);
    });

};

Controller.prototype.doRunProject = function(req,res){
    var tpId = req.query.tpId;
    var path = req.query.filePath;

    childProcessService.startProject(tpId,path,function(data) {
        var jsonData = JSON.stringify(data);
        res.send(jsonData);
    });
};
Controller.prototype.doRestartProject = function(req,res){
    var tpId = req.query.tpId;
    var path = req.query.filePath;

    childProcessService.restartProject(tpId,path,function(data) {
        var jsonData = JSON.stringify(data);
        res.send(jsonData);
    });
};

Controller.prototype.doStopProject = function(req,res) {
    var tpId = req.query.tpId;
    childProcessService.stopProject(tpId,function() {

        var jsonData = JSON.stringify('ok');
        res.send(jsonData);
    });
};

module.exports = Controller;