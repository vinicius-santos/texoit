'use strict';
var message = require('../../message.code.json');
module.exports = function Message(type, code) {
	return message[type][code]['summary'];
};
