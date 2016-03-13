/**
 * Created by miaomiao on 2016/3/3.
 */
var net = require('net');
var HOST = '192.168.1.70';
var PORT = '2433';
var chanelToMaster = new net.Socket();
chanelToMaster.connect(PORT,HOST,function(){
    console.log('Connected to:' + HOST +":" +PORT);
});

var tutProjectDeploymentService = require('../../app.core.model/code_mgmt/TutProjectDeploymentService');

function Controller(router) {
    var me = this;
    router.get('/deployTutorialProject', function (req, res) {
        me.doDeployTutProject(req, res);
    });
};

Controller.prototype.doDeployTutProject = function(req,res) {
    var tpId = req.query.tpId;
    tutProjectDeploymentService.deployProject(tpId,function(data){
        res.send(data);
        //chanelToMaster.write(data);
    });
};

module.exports = Controller;
