/* eslint-disable react/prop-types */
import React from 'react';

import RestaurantSummary from './RestaurantSummary';

const Restaurants = props => {
	const { restaurants, title, filtered } = props;

	return (
		<div className='container'>
			{ filtered === false ? <h1>{title}</h1> : <h6>{title}</h6> }
			<div className='row section'>
				{Object.keys(restaurants).map(key => (
					<RestaurantSummary key={key} index={key} data={restaurants[key]} />
				))}
			</div>
		</div>
	);
};

export default Restaurants;
