/**
 * Created by miaomiao on 2016/3/13.
 */

var net = require('net');
var HOST = '192.168.1.70';
var PORT = '2433';
var chanelToMaster = new net.Socket();
chanelToMaster.connect(PORT,HOST,function(){
    console.log('Connected to:' + HOST +":" +PORT);
});

var tutorialProjectDeploymentService = require('../../app.core.model/code_mgmt/TutorialProjectDeploymentService.js');
var tutProjectDeploymentService = require('../../app.core.model/code_mgmt/TutProjectDeploymentService.js');
function TutorialProjectDeploymentController(router) {
    var me = this;
    router.get('/loadProjectTreeData', function (req, res) {
        me.loadProjectTreeData(req, res);
    });
};

TutorialProjectDeploymentController.prototype.loadProjectTreeData = function (req, res) {
    var tpId = req.query.tpId;

    tutProjectDeploymentService.deployProject(tpId,function(exurl){
        console.log(exurl.path);
        tutorialProjectDeploymentService.retrieveProjectFileStructure(exurl.path,function (msg) {
            if (msg.success) {
                //res.send(msg.data);
                chanelToMaster.write(msg.data);
            } else {
                //res.send(msg);
                chanelToMaster.write(msg);
            }
        });
    });

};
module.exports = TutorialProjectDeploymentController;