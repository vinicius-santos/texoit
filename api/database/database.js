'use strict';
const csv = require('fast-csv');
const fs = require('fs');
message = require('../helpers/message');
const results = [];
const readStream = fs.createReadStream('movielist.csv').setEncoding('utf-8');

module.exports = function DatabaseMovies() {
	try {
		var id = 1;
		csv.fromStream(readStream, { ignoreEmpty: true, delimiter: ';' }).on('data', function(data) {
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
        return results;
	} catch (err) {
		var response = { status: `${message('ERROR', 'ERE002')}`, result: err };
		throw new Error(response);
	}
};
