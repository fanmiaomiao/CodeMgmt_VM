/**
 * Created by miaomiao on 2016/3/10.
 */

exports.example = function(req,next) {
    var string = 'from 2434 to 2433: hello!' + 'path:'+req;
    next(string);
};
