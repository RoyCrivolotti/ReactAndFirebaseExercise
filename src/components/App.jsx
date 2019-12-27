import React from 'react';

import base from '../base';

import Restaurants from './restaurant/Restaurants';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: {},
		};
	}

	componentDidMount() {
		this.ref = base.syncState('restaurants', {
			context: this,
			state: 'restaurants',
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		const { restaurants } = this.state;

		if (!restaurants || restaurants.length === 0) return null;

		return <Restaurants restaurants={restaurants} title='Restaurant list' filtered={false} />;
	}
}

export default App;
