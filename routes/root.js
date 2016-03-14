/**
 * Created by miaomiao on 2016/3/9.
 */
var express = require('express');
var router = express.Router();

//var TutProjectDeploymentManager = require('../app.core.view_controller/code_mgmt/TutProjectDeploymentManager.js');
var TutProjectRunningManager = require('../app.core.view_controller/code_mgmt/TutProjectRunningManager.js');
var TutProjectCodeEditManager = require('../app.core.view_controller/code_mgmt/TutProjectCodeEditManager.js');
var TutorialProjectDeployment = require('../app.core.view_controller/code_mgmt/TutorialProjectDeployment.js');
var ExampleManager = require('../app.core.view_controller/code_mgmt/ExampleManager.js');

//new TutProjectDeploymentManager(router);
new TutProjectRunningManager(router);
new TutProjectCodeEditManager(router);
new TutorialProjectDeployment(router);
new ExampleManager(router);


module.exports = router;