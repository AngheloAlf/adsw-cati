
//users interface
/** TODO:
 *  -make a log-out botton
 *  -make a jade page for users
 *  -etc
 * **/
exports.list = function(req, res){
    if(req.session.userName){ //If user is connected, is displayed a messaje
        res.send("Bienvenido " + req.session.userName);
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

// **connecting**
/** TODO:
 * -connect to the DB
 * -regex
 * -etc
 * **/
exports.log_in = function(req, res){
    if(req.body.rut && req.body.password){ //if rut and password from POST, saves the session variable
        req.session.userName = req.body.rut;
        res.redirect('/users');
    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};