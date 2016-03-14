/**
 * Created by miaomiao on 2016/3/3.
 */
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
    });
};

module.exports = Controller;
