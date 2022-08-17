var express = require('express');
var router = express.Router();
var path = require('path');

var mainRouter = require('./main/main.js');
var emailRouter = require('./email/email.js');
var joinRouter = require('./join/join.js');
var loginRouter = require('./login/login.js');
var logoutRouter = require('./logout/logout.js');
var movieRouter = require('./movie/movie.js');

publicPath = path.join(__dirname, '/../public');

router.get('/', function(req, res) {
	res.sendFile(`${publicPath}/main.html`);
});

router.use('/main', mainRouter);
router.use('/email', emailRouter);
router.use('/join', joinRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/movie', movieRouter);

module.exports = router;