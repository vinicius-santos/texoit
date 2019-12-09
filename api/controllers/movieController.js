message = require('../helpers/message');
const database = require('../database/database');
database.refresh();

//#region gets
exports.all = function(req, res) {
	try {
		res.json(database.all());
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

exports.get = function(req, res) {
	try {
		res.json(database.get(req.params.id));
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

exports.getIntervalFastetPrize = function(req, res) {
	try {
		res.json(database.getIntervalFastetPrize());
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

//#endregion

//#region sets
exports.create = function(req, res) {
	try {
		database.save(req.body);
		var response = `${message('SUCCESS', 'SRE001')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE003')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

exports.update = function(req, res) {
	try {
		database.update(req.params.id, req.body);
		var response = `${message('SUCCESS', 'SRE002')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE004')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

exports.delete = function(req, res) {
	try {
		database.delete(req.params.id);
		var response = `${message('SUCCESS', 'SRE003')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE005')}`;
		res.json(response);
	} finally {
		database.refresh();
	}
};

//#endregion
