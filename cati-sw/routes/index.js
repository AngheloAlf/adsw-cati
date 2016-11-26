
// index interface
exports.index = function(req, res){
    res.render('index', { title: 'CATI' });
};

//Destroys the session
exports.log_out = function(req, res){
    if(req.body.submitButton == 'log_out'){
        req.session.destroy();
    }
    else{
        console.log("error");
        console.log(req.body.submitButton);
    }
    res.redirect('/');
};

//Test if the user is connected and is admin or not and run the callback
exports.verificateLogin = function(req, res, admin, callback){
    if(req.session.userData && (req.session.userData.admin == admin || admin ===null)){ //If user is connected
        callback(req, res);
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
