message = require('../helpers/message');
database = require('../database/database');
const movies = database();

exports.all = function(req, res) {
	try {
		res.json(movies);
	} catch (err) {
		var response = { status: `${message('ERROR', 'ERE001')}`, result: err };
		res.json(response);
	}
};
