var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/form', function(req, res) {
	console.log(req.body.email);
	res.render('email.ejs', {'email' : req.body.email});
});

router.post('/ajax', function(req, res) {
	var email = req.body.email;
	var responseData = {result : 'pending', name: ''};
	var query = mysqlConnection.query(`SELECT name FROM user WHERE email='${email}'`, 
		function (err, rows, fields) {
			if (err) throw err;

			console.log(rows);
			if (rows.length != 1) {
				responseData.result = 'none';
			}
			else {
				responseData.result = 'ok';
				responseData.name = rows[0].name;
			}
			res.json(responseData);
	});
});

module.exports = router;