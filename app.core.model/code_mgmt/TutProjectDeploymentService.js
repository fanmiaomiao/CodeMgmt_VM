/**
 * Created by miaomiao on 2016/3/3.
 */

var Download = require('download');
var projectMap = {};
//返回参数：tpId path
exports.deployProject = function(tpId,next) {


    var path = 'http://192.168.1.138:8088/OfficeTransfer/upload/'+ tpId +'.zip';

    var exurl = './app.core.model/code_mgmt/_test/'+tpId;
    new Download({mode:'777',extract:true})
        .get(path)
        .dest(exurl)
        .run(function(err, files){
            // 解压后文件获取其路径
            var deployedProjectMess = {tpId:tpId,path:exurl};
            next(deployedProjectMess);
        });



};