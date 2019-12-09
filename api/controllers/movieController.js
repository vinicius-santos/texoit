message = require('../helpers/message');
const database = require('../database/database');

//#region gets
exports.all = async function(req, res) {
	try {
		res.json(await database.all());
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	}
};

exports.get = async function(req, res) {
	try {
		res.json(await database.get(req.params.id));
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	}
};

exports.getIntervalFastetPrize = async function(req, res) {
	try {
		res.json(await database.getIntervalFastetPrize());
	} catch (err) {
		var response = `${message('ERROR', 'ERE001')}`;
		res.json(response);
	}
};

//#endregion

//#region sets
exports.create = async function(req, res) {
	try {
		await database.save(req.body);
		var response = `${message('SUCCESS', 'SRE001')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE003')}`;
		res.json(response);
	}
};

exports.update = async function(req, res) {
	try {
		await database.update(req.params.id, req.body);
		var response = `${message('SUCCESS', 'SRE002')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE004')}`;
		res.json(response);
	}
};

exports.delete = async function(req, res) {
	try {
		await database.delete(req.params.id);
		var response = `${message('SUCCESS', 'SRE003')}`;
		res.json(response);
	} catch (err) {
		var response = `${message('ERROR', 'ERE005')}`;
		res.json(response);
	}
};

//#endregion
