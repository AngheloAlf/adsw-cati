
// index interface
exports.index = function(req, res){
    res.render('index', { title: 'CATI' });
};

//Log-in interface
exports.login = function(req, res){
    if(req.session.userRut){ //If user has logged in, this redirect to the users page
        res.redirect('/users');
    }
    else{ //else, redirects to the log-in interface
        res.render('login', {title: 'CATI - Login'});
    }
};

//
exports.log_out = function(req, res){
    /*if(req.session.userRut){ //If user has logged in, this redirect to the users page
        res.redirect('/users');
    }
    else{ //else, redirects to the log-in interface
        res.render('login', {title: 'CATI - Login'});
    }*/
    if(req.body.submitButton == 'log_out'){
        req.session.destroy();
    }
    else{
        console.log("error");
        console.log(req.body.submitButton);
    }
    res.redirect('/');
};
