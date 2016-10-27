
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


exports.verificateLogin = function(req, res, admin, jadeName, jadeData){
    if(req.session.userData && (req.session.userData.admin == admin)){ //If user is connected
        res.render(jadeName, jadeData);
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
