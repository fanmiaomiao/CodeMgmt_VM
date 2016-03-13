/**
 * Created by miaomiao on 2016/3/13.
 */

exports.example = function(req,next) {
    var string = 'hello!';
    next(string);
};
