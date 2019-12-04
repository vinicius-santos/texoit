message = require('../helpers/message');
database = require('../database/database');
const movies = database.all();
const save = database.save;
// 

exports.all = function(req, res) {
	try {
		res.json(movies);
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	}
};

exports.create = function(req, res) {
	try {
		save(req.body);
		var response = `${message('SUCCESS', 'SRE001')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE003')}`;
		res.json(response);
	}
};
