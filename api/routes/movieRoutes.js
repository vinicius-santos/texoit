'use strict';
module.exports = function(app) {
	var movie = require('../controllers/movieController');

	app.route('/movies').get(movie.all).post(movie.create);

	app.route('/movies/:id').get(movie.get).put(movie.update).delete(movie.delete);
};
