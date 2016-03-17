/**
 * Created by chen on 2016/3/2.
 */
var fs = require('fs');
var message = require('../../app.util/messageGenerator.js');

exports.retrieveProjectFileStructure = function (tpId, next) {
    // todo return json : project_file_structure_data
    var rootPath = tpId;
    function handleFolder(path) {
        var dirList = fs.readdirSync(path);
        var fileLevels = [];
        var fileLevel;
        dirList.forEach(function (item) {
            var key = item.lastIndexOf('.');
            var fileType;
            if (key >= 0) {
                fileType = item.substr(key + 1);
            }
            if (fs.statSync(path + '/' + item).isDirectory()) {
                fileLevel = {
                    text: item,
                    type: 'folder',
                    children: handleFolder(path + '/' + item)
                };
            } else {
                fileLevel = {
                    text: item,
                    type: fileType
                };
            }
            fileLevels.push(fileLevel);
        });
        return fileLevels;
    }
    //var folderName = rootPath.substr(rootPath.lastIndexOf('/')+1);
    //var project_file_structure_data = {
    //    text : folderName,
    //    type: 'Folder',
    //    children: handleFolder(rootPath)
    //};
    var project_file_structure_data = handleFolder(rootPath);
    if (project_file_structure_data) {
        next(message.genSimpSuccessMsg('parse success', project_file_structure_data));
    } else {
        //todo wenyan replace the null detail error message
        next(message.genSimpFailedMsg('error', null));
    }
};