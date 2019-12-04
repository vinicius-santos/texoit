'use strict';
const csv = require('fast-csv');
const fs = require('fs');
message = require('../helpers/message');
const results = [];
const path = 'movielist.csv';
const readStream = fs.createReadStream(path).setEncoding('utf-8');
const json2csv = require('json2csv').parse;
var id = 1;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: path,
	header: [ 'year', 'title', 'studios', 'producers', 'winner' ],
	fieldDelimiter: ';'
});

if (results.length <= 0) {
	console.log(results.length);
	csv.parseStream(readStream, { ignoreEmpty: true, delimiter: ';' }).on('data', function(data) {
		var mov = {
			id: id,
			year: data[0],
			title: data[1],
			studios: data[2],
			producers: data[3],
			winner: data[4]
		};
		id++;
		results.push(mov);
	});
}

exports.all = function() {
	return results;
};

exports.save = function(data) {
	try {
		if (data) {
			results.push(data);
			results.forEach((item) => {
				delete item.id;
			});
			csvWriter.writeRecords(results).then(() => {
				console.log('saved');
			});
		}
	} catch (err) {
		console.log(err);
		throw new Error();
	}
};
