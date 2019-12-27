/* eslint-disable camelcase */

const getNearestRestaurants = (mainVector, vectorList, max_results) => {
	const distances = [];

	Object.keys(vectorList).forEach(currVector => {
		const { coor_x, coor_y } = vectorList[currVector];

		const distanceToMainVector = euclideanDistance(mainVector, { coor_x, coor_y });

		distances.push({ distance: distanceToMainVector, restaurant: vectorList[currVector] });
	});

	return distances.sort((a, b) => a.distance - b.distance)
		.slice(0, max_results);
};

function sortRestaurantsByNumericParam(restaurants, sort_by, asc_order = true) {
	const search_results = { count: 0, restaurants: [] };
	const results = restaurants.slice(0);

	if (sort_by) {
		asc_order === 'true'
			? search_results.restaurants = results.sort((a, b) => a.restaurant[sort_by] - b.restaurant[sort_by])
			: search_results.restaurants = results.sort((a, b) => b.restaurant[sort_by] - a.restaurant[sort_by]);
	}

	search_results.count = search_results.restaurants.length;

	return {
		search_results: {
			count: search_results.count,
			restaurants: search_results.restaurants,
		},
	};
}

function sortRestaurantsByAlphabeticParam(restaurants, sort_by, asc_order = false) {
	const search_results = { count: 0, restaurants: [] };
	const results = restaurants.slice(0);

	if (sort_by) {
		asc_order === 'true'
			? search_results.restaurants = results.sort((a, b) => a.restaurant[sort_by] > b.restaurant[sort_by])
			: search_results.restaurants = results.sort((a, b) => b.restaurant[sort_by] > a.restaurant[sort_by]);
	}

	search_results.count = search_results.restaurants.length;

	return {
		search_results: {
			count: search_results.count,
			restaurants: search_results.restaurants,
		},
	};
}

function sortRestaurantsByBooleanParam(restaurants, sort_by, asc_order = false) {
}

function sortRestaurants(restaurants, sort_by, asc_order) {
	const numericFilters = ['rating', 'reviews', 'average_ticket', 'best_discount'];
	const alphabeticFilters = ['name', 'cuisine', 'address', 'best_discount'];
	const booleanFilters = ['takes_yums'];

	if (numericFilters.includes(sort_by)) return sortRestaurantsByNumericParam(restaurants, sort_by, asc_order);
	if (alphabeticFilters.includes(sort_by)) return sortRestaurantsByAlphabeticParam(restaurants, sort_by, asc_order);
	if (booleanFilters.includes(sort_by)) return sortRestaurantsByBooleanParam(restaurants, sort_by, asc_order);

	return {
		search_results: {
			count: restaurants.length,
			restaurants,
		},
	};
}

function euclideanDistance(p, q) {
	return Math.sqrt(((p.coor_x - q.coor_x) ** 2) + ((p.coor_y - q.coor_y) ** 2));
}

module.exports = {
	getNearestRestaurants,
	sortRestaurants,
};
