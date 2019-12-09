'use strict';
const csv = require('fast-csv');
const fs = require('fs');
message = require('../helpers/message');
let results = [];
const path = 'movielist.csv';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//#region gets
exports.all = function() {
	return results;
};

exports.get = function(id) {
	return results.find((x) => x.id == id);
};

exports.getIntervalFastetPrize = function() {
	var producers = [];
	results.sort((a, b) => (a.producers > b.producers ? 1 : b.producers > a.producers ? -1 : 0));
	var separeteds = separateNameWinners();
	createListWinners(separeteds, producers);
	createDate(separeteds, producers);
	//return producers;
	createInterval(producers);
	producers = producers.filter((item) => item.interval !== 0);
	producers.sort((a, b) => (a.interval > b.interval ? 1 : b.interval > a.interval ? -1 : 0));
	var json = {
		min: [ producers[0] ],
		max: [ producers[producers.length - 1] ]
	};
	return json;
};

//#endregion

//#region sets
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

//#endregion

exports.refresh = function() {
	results = [];
	var id = 1;
	if (fs.existsSync(path)) {
		var readStream = fs.createReadStream(path).setEncoding('utf-8');
		csv.parseStream(readStream, { ignoreEmpty: true, delimiter: ';' }).on('data', function(data) {
			if (data) {
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
				sort(results);
			}
		});
	}
};

//#region auxiliaries

function insertProducers(producers, max, min) {
	producers.forEach((producer) => {
		max = 0;
		min = 0;
		results.forEach((result) => {
			if (producer.producer === result.producers && result.winner == 'yes') {
				if (min === 0) {
					min = Number(result.year);
				} else if (Number(result.year) < min) {
					min = Number(result.year);
				}
				if (max === 0) {
					max = Number(result.year);
				} else if (Number(result.year) > max) {
					max = Number(result.year);
				}
			}
			producer.previousWin = min;
			producer.followingWin = max;
			producer.interval = max - min;
		});
	});
	return { max, min };
}

function createListWinners(separeteds, producers) {
	separeteds.forEach((item) => {
		if (producers.length <= 0) {
			var object = {
				producer: item.producers,
				interval: 0,
				previousWin: 0,
				followingWin: 0
			};
			if (item.winner === 'yes') {
				producers.push(object);
			}
		} else {
			var exist = producers.find((x) => x.producer === item.producers);
			if (!exist) {
				var object = {
					producer: item.producers,
					interval: 0,
					previousWin: 0,
					followingWin: 0
				};
				if (item.winner === 'yes') {
					producers.push(object);
				}
			}
		}
	});
}

function createDate(separeteds, producers) {
	producers.forEach((prod) => {

		var item = separeteds.filter((x) => x.producers.includes(prod.producer) && x.winner === 'yes');
		item.sort((a, b) => (Number(a.year) > Number(b.year) ? 1 : Number(b.year) > Number(a.year) ? -1 : 0));
		var min = item[0].year;
		var max = item[item.length - 1].year;
		prod.previousWin = Number(min);
		prod.followingWin = Number(max);

	});
}

function createInterval(producers) {
	producers.forEach((prod) => {
		prod.interval = prod.followingWin - prod.previousWin;
	});
}

function separateNameWinners() {
	var separateWinner = [];
	var winner;
	results.forEach((producer) => {
		winner = producer.producers.split(/(?:,|and )+/);
		winner.forEach((item) => {
			var obj = {
				year: producer.year,
				title: producer.title,
				studios: producer.studios,
				producers: item,
				winner: producer.winner
			};
			separateWinner.push(obj);
		});
	});
	return separateWinner.sort((a, b) => (a.producers > b.producers ? 1 : b.producers > a.producers ? -1 : 0));
}

function sort(arr) {
	arr.sort(function(a, b) {
		return Number(a.year) - Number(b.year);
	});
}

//#endregion
