var express = require('express');
var router = express.Router();
var path = require('path');

router.use(function(req, res, next) {
	if (!req.user) {
		res.redirect('/login');
	}
	else {
		next();
	}
})

router.get('/', function(req, res) {
	console.log('main is loaded', req.user, typeof(req.user));
	res.render('main.ejs', {user : req.user.email});
});

module.exports = router;