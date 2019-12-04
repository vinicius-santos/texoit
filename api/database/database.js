'use strict';
const csv = require('fast-csv');
const fs = require('fs');
message = require('../helpers/message');
let results = [];
const path = 'movielist.csv';
var id = 1;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.all = function() {
	return results;
};

exports.get = function(id) {
	return results.find((x) => x.id == id);
};

exports.save = function(data) {
	try {
		if (data) {
			results.push(data);
			results.forEach((item) => {
				delete item.id;
			});

			if (results.length > 1) {
				var csvWriter = createCsvWriter({
					path: path,
					header: [ 'year', 'title', 'studios', 'producers', 'winner' ],
					fieldDelimiter: ';'
				});
				sort(results);
				csvWriter.writeRecords(results).then(() => {
					console.log('saved  existing document');
				});
			} else {
				var csvWriter = createCsvWriter({
					path: path,
					header: [
						{ id: 'year', title: 'year' },
						{ id: 'title', title: 'title' },
						{ id: 'studios', title: 'studios' },
						{ id: 'producers', title: 'producers' },
						{ id: 'winner', title: 'winner' }
					],
					fieldDelimiter: ';'
				});
				csvWriter.writeRecords(results).then(() => {
					console.log('saved  nem document');
				});
			}
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

exports.update = function(id, data) {
	try {
		if (results.length <= 0) {
			throw new Error();
		}
		if (id && data) {
			results.forEach((item, index) => {
				if (item.id == id) {
					item = data;
					results[index] = data;
				}
			});
			results.forEach((item) => {
				delete item.id;
			});

			var csvWriter = createCsvWriter({
				path: path,
				header: [ 'year', 'title', 'studios', 'producers', 'winner' ],
				fieldDelimiter: ';'
			});
			sort(results);
			csvWriter
				.writeRecords(results)
				.then(() => {
					console.log('updated');
				})
				.catch((err) => {
					console.log(err);
					throw new Error();
				});
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

exports.delete = function(id) {
	try {
		if (results.length <= 0) {
			throw new Error();
		}
		if (id) {
			results.forEach((item, index) => {
				if (item.id == id) {
					results.splice(index, 1);
				}
			});
			results.forEach((item) => {
				delete item.id;
			});

			var csvWriter = createCsvWriter({
				path: path,
				header: [ 'year', 'title', 'studios', 'producers', 'winner' ],
				fieldDelimiter: ';'
			});
			sort(results);
			csvWriter
				.writeRecords(results)
				.then(() => {
					console.log('removed');
				})
				.catch((err) => {
					console.log(err);
					throw new Error();
				});
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};

exports.refresh = function() {
	results = [];
	if (fs.existsSync(path)) {
		var readStream = fs.createReadStream(path).setEncoding('utf-8');
		if (results.length <= 0) {
			csv.parseStream(readStream, { ignoreEmpty: true, delimiter: ';' }).on('data', function(data) {
				if (data) {
					var mov = {
						id: id,
						year: Number(data[0]),
						title: data[1],
						studios: data[2],
						producers: data[3],
						winner: data[4]
					};
					id++;
					results.push(mov);
					sort(results);
				}
			});
		}
	}
};

function sort(arr) {
	arr.sort(function(a, b) {
		return a.year - b.year;
	});
}
