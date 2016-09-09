
//users interface
/** TODO:
 *  -make a jade page for users
 *  -etc
 * **/
exports.list = function(req, res){
    if(req.session.userRut && req.session.name){ //If user is connected, is displayed a messaje
        res.render('userDash', { title: 'CATI', nombre: req.session.name });
    }
    else{//else, redirects to the login interface
        res.redirect('/login');
    }
};

// **connecting**
/** TODO:
 * -regex
 * -Discriminate between user or admin
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

        var sql = "SELECT name FROM user WHERE rut='"+ req.body.rut +"' AND pass='"+req.body.password+"'";
        connection.query(sql, function(err, rows,){ // fields){
             if(err){
                throw err;
            }
            //console.log('The solution is: ', rows[0]);
            if(rows[0] === undefined){
                req.session.accountNotFound = 1;
            }
            else{
                req.session.userRut = req.body.rut;
                req.session.name = rows[0].name;
            }

            res.redirect('/users');
        });

        connection.end();

    }
    else{ //else, redirects to login
        res.redirect('/login');
    }
};