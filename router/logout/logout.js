var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.get('/', function(req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
})

module.exports = router;