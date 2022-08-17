var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/list', function(req, res) {
	res.render('movie.ejs');
});

router.get('/', function(req, res) {
	var responseData = {};
	var query = mysqlConnection.query('select * from movies',
		function(err, rows) {
			if (err) throw err;
			if(rows.length) {
				responseData.result = 1;
				responseData.data = rows;
			} else {
				responseData.result = 0;
			}

			res.json(responseData);
		});
});

router.post('/', function(req, res) {
	var reqJson = req.body;
	var title = reqJson.title;
	var type = reqJson.type;
	var grade = reqJson.grade;
	var actor = reqJson.actor;

	var queryData = {
		title, type, grade, actor
	};
	var responseData = {};
	var query = mysqlConnection.query(
		'insert into movies set ?',
		queryData,
		function(err, rows) {
			if (err) {
				responseData.result = 0;
				responseData.data = [err.message];
			} else {
				responseData.result = 1;
			}

			res.json(responseData);
		}
	);
});

router.get('/:title', function(req, res) {
	var title = req.params.title;
	console.log(`movies GET ${title}`);

	var responseData = {};
	var query = mysqlConnection.query(
		'SELECT * FROM movies WHERE title = ?',
		[title], 
		function (err, rows) {
			if (err) throw err;
			if (rows[0]) {
				responseData.result = 1;
				responseData.data = rows;
			} else {
				responseData.result = 0;
			}

			res.json(responseData);
		})
});

router.delete('/:title', function(req, res) {
	var title = req.params.title;
	console.log(`movies DELETE ${title}`);

	var responseData = {};
	var query = mysqlConnection.query(
		'DELETE FROM movies WHERE title = ?',
		[title], 
		function (err, rows) {
			if (err) throw err;
			if (rows.affectedRows > 0) {
				responseData.result = 1;
				responseData.data = title;
			} else {
				responseData.result = 0;
			}

			res.json(responseData);
		})
});

module.exports = router;