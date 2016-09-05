/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CATI' });
};

exports.login = function(req, res){
  res.render('login', { title: 'CATI - Login' });
};