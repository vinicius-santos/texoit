var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '20mb', type: 'application/json' }));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

var express = require('express'),
	app = express(),
	port = process.env.PORT || 7030;

var routes = require('./api/routes/movieRoutes');
routes(app);

app.listen(port);

console.log(`Porta rodando em ${port}`);
