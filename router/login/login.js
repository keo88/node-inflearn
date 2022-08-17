var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function (req, res) {
	var msg;
	errMsg = req.flash('error');
	if (errMsg) msg = errMsg;
	res.render('login.ejs', {message : msg});
});

passport.use('local-login', new LocalStrategy({
	usernameField : 'email',
	passportField : 'password',
	passReqToCallback : true
}, function (req, email, password, done) {
	var name = req.body.name;
	var query = mysqlConnection.query(
		'SELECT * FROM user WHERE email = ? AND pw = ?',
		[email, password],
		function (err, rows) {

		if (err) return done(err);

		if (rows.length) {
			return done(null, {email : email, name: rows[0].name, id : rows[0].UID});
		} else {
			return done(null, false, {message : 'user does not exists or pw does not match'});
		}
	});
}));

router.post('/', function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {

		console.log(`local login req: ${req}`);
		if (err) res.status(500).json(err);

		if (!user) { 
			return res.status(401).json(info.message);
		}

		req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.json(user);
		})
	})(req, res, next);
});

module.exports = router;