'use strict';
var fs = require('fs');
module.exports = function Message(type, code) {
	fs.readFile('message.code.json', 'utf8', function(err, data) {
		return data[type][code]['summary'];
	});
};
