var express = require('express');
var mysql = require('mysql');
var passport = require('passport');
var localStrategy = require('passport-local');
var session = require('express-session');
var flash = require('connect-flash');

app = express();

mysqlConnection = mysql.createConnection({
	host : '127.0.0.1',
	port : 3306,
	user : 'root',
	password : '1664',
	database : 'nodestudy'
});

mysqlConnection.connect();

const port = 8080;

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');

var router = require('./router/index.js');

app.use(session({
	secret : 'keyboard cat',
	resave : false,
	saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);