/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import RestaurantSummary from './RestaurantSummary';

const RestaurantDetails = props => {
	const { location } = props;
	const { index, ...dataContent } = location.state;

	return (
		<div className='container section'>
			<RestaurantSummary data={dataContent} index={index} />
			{/* TODO: add a reservation form to the right of the restaurants summary - should collapse downwards in mobile */}
			{/* TODO: add a list of reviews below */}
		</div>
	);
};

export default RestaurantDetails;
