var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function (req, res) {
	var msg;
	errMsg = req.flash('error');
	if (errMsg) msg = errMsg;
	res.render('join.ejs', {message : msg});
});

passport.serializeUser(function(user, done) {
	console.log(`passport session save(serializeUser): ${JSON.stringify(user)}`);
	user.serialized = 'serializeUser';
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log(`passport session get user(deserializeUser): ${JSON.stringify(user)}`);
	user.deserialized = 'deserializeUser';
	done(null, user);
});

passport.use('local-join', new LocalStrategy({
	usernameField : 'email',
	passportField : 'password',
	passReqToCallback : true
}, function (req, email, password, done) {
	var name = req.body.name;
	var query = mysqlConnection.query(
		'SELECT * FROM user WHERE email = ?',
		[email],
		async function (err, rows) {
		if (err) return done(err);

		if (rows.length) {
			console.log(`${email} exists in the DB`);
			return done(null, false, {message: "your email is already used"});
		} else {
			var insertSuccess = await createUser(email, name, password);

			if (insertSuccess) {
				return done(null, {email : email, name:name ,id : rows.insertId});
			}
			else {
				return done(null, false, {message: "your email is already used"});
			}
		}
	});
}));

router.post('/', passport.authenticate('local-join', {
	successRedirect : '/main',
	failureRedirect : '/join',
	failureFlash : true
}));

function createUser(email, name, password) {
	var userInfo = {
		email : email,
		name : name,
		pw : password
	};

	return new Promise(resolve => {
		var query = mysqlConnection.query(
		'INSERT INTO user SET ?',
		userInfo,
		function (err, rows, fields) {
			if (err) {
				console.log(err);
				resolve(false);
			}
			else {
				console.log(rows);
				resolve(true);	
			}
		});
	})
}

module.exports = router;