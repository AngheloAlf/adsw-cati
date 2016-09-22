
//users interface
// TODO: make a jade page for users
exports.userInterface = function(req, res){
    if(req.session.userData && !req.session.userData.admin){ //If user is connected
        res.render('userDash', { title: 'CATI - Encuestador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

