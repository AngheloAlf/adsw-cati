/**
 * Created by Anghelo on 27-10-2016.
 */

exports.getUserData = function(req, res){
    var User = require('../models/user.js');
    User.sendUserById(req, res, req.params.idUser);
};