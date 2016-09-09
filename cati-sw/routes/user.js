
//users interface
/** TODO:
 *  -make a log-out botton
 *  -make a jade page for users
 *  -etc
 * **/
exports.list = function(req, res){
    if(req.session.userRut){ //If user is connected, is displayed a messaje
        res.send("Bienvenido " + req.session.name + "<br><br><form action='/' method='POST'><button name='submitButton' value='log_out'>Cerrar sesión</button></form>");
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

// **connecting**
/** TODO:
 * -regex
 * -etc
 * **/
exports.log_in = function(req, res){
    if(req.body.rut && req.body.password){ //if rut and password from POST, saves the session variable
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : '127.0.0.1',
            user     : 'root',
            password : '',
            database : 'cati'
        });

        connection.connect();
        connection.query("SELECT name FROM user WHERE rut='"+ req.body.rut +"' AND pass='"+req.body.password+"'", function(err, rows, fields){
             if(err){
                throw err;
            }
            //console.log('The solution is: ', rows[0]);
            if(rows[0] === undefined){
                res.send("No se ha encontrado el usuario. <br><br> <a href='/login'>Voler al login</a> :c");
            }
            else{
                req.session.userRut = req.body.rut;
                req.session.name = rows[0].name;
                res.redirect('/users');
            }
        });

        connection.end();
    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};