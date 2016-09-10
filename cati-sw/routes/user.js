
//users interface
/** TODO:
 *  -make a jade page for users
 *  -etc
 * **/
exports.interface = function(req, res){
    if(req.session.userRut && req.session.name){ //If user is connected, is displayed a messaje
        res.render('userDash', { title: 'CATI', nombre: req.session.name });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

