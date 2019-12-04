message = require('../helpers/message');
database = require('../database/database');
const refresh = database.refresh;
const movies = database;
//const save = database.save;
//const update = database.update;

refresh();
exports.all = function(req, res) {
	try {
		res.json(movies.all());
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	} finally {
		refresh();
	}
};

exports.get = function(req, res) {
	try {
		res.json(movies.get(req.params.id));
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	} finally {
		refresh();
	}
};

exports.create = function(req, res) {
	try {
		movies.save(req.body);
		var response = `${message('SUCCESS', 'SRE001')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE003')}`;
		res.json(response);
	} finally {
		refresh();
	}
};

exports.update = function(req, res) {
	try {
		movies.update(req.params.id, req.body);
		var response = `${message('SUCCESS', 'SRE002')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE004')}`;
		res.json(response);
	} finally {
		refresh();
	}
};

exports.delete = function(req, res) {
	try {
		movies.delete(req.params.id);
		var response = `${message('SUCCESS', 'SRE003')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE005')}`;
		res.json(response);
	} finally {
		refresh();
	}
};
