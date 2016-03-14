/**
 * Created by miaomiao on 2016/3/3.
 */

var Download = require('download');
var projectMap = {};
//返回参数：tpId path
exports.deployProject = function(tpId,next) {

    //var path = 'http://192.168.1.138:8088/OfficeTransfer/'+ param;

    var projectParameterMap = {
        uuid1:{tpId:tpId,path:'./_test/_test.zip'},
        uuid2:{tpId:tpId,path:'./_test/_test.zip'}
    };
    var projectParameter = projectParameterMap[tpId];
    console.log(projectParameter.path);
    var exurl = './app.core.model/code_mgmt/_test/'+projectParameter.tpId;
    new Download({mode:'777',extract:true})
        .get('http://127.0.0.1:2434/'+projectParameter.path)
        .dest(exurl)
        .run();

    // 解压后文件获取其路径
    var deployedProjectMess = {tpId:tpId,path:exurl};
    next(deployedProjectMess);
};