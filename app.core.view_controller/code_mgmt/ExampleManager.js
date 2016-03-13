/**
 * Created by miaomiao on 2016/3/13.
 */
var exampleService = require('../../app.core.model/code_mgmt/ExampleService.js');
function ExampleController(router) {
    var me = this;
    router.get('/example',function (req,res) {
        me.doExample(req,res);
    });
};

ExampleController.prototype.doExample = function (req,res) {
    var path = req.query.tpId;
    exampleService.example (path,function(data){
        res.send(JSON.stringify(data));
    });
};

module.exports = ExampleController;