/**
 * Created by Anghelo on 10-09-2016.
 */

//users interface
/** TODO:
 *  -make a jade page for admin
 *  -etc
 * **/
exports.interface = function(req, res){
    if(req.session.userData){ //If admin is connected
        res.render('adminDash', { title: 'CATI - Administrador', nombre: req.session.userData.userName });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};
