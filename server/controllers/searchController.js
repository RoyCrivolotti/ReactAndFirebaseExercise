/* eslint-disable camelcase */

const axios = require('axios');
const { getNearestRestaurants: getNearest, sortRestaurants } = require('../helpers');

async function getNearestRestaurants(req, res, next) {
	const { sort_by = '', coor_x = 0, coor_y = 0, max_results, asc_order } = req.query;

	await getAllRestaurants()
		.then(vectorList => {
			const mainVector = { coor_x: parseInt(coor_x, 10), coor_y: parseInt(coor_y, 10) };

			const results = getNearest(mainVector, vectorList.data, max_results);

			const sortedResults = sortRestaurants(results, sort_by, asc_order);

			res.json(sortedResults);
		})
		.catch(error => next(error));
}

async function ping(req, res, next) {
	await getAllRestaurants()
		.then(data => res.send(`Everything works fine. There are ${data.data.length} restaurants!`))
		.catch(error => next(error));
}

function getAllRestaurants() {
	return new Promise(resolve => {
		resolve(axios.get('https://reactandfirebaseexercise.firebaseio.com/restaurants.json'));
	});
}

module.exports = {
	ping,
	getNearestRestaurants,
};
