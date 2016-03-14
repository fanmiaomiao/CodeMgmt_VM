/**
 * Created by chen on 2016/3/2.
 */

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
                res.send(msg.data);
            } else {
                res.send(msg);
            }
        });
    });

};
module.exports = TutorialProjectDeploymentController;