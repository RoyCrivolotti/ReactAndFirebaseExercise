/* eslint-disable camelcase */

import React from 'react';
import Select from 'react-select';

import Restaurants from './Restaurants';

class NearMe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			x_coor: '',
			y_coor: '',
			sort_by: '',
			max_results: '',
			asc_order: '',
			isFetching: false,
			fetchFailed: false,
			restaurants: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() { }

	resetCoordinatesAndFilters = () => {
		this.setState({ x_coor: '' });
		this.setState({ y_coor: '' });
		this.setState({ sort_by: '' });
		this.setState({ asc_order: '' });
		this.setState({ max_results: '' });
	}

	resetError = () => {
		this.setState({ isFetching: false });
		this.setState({ fetchFailed: false });
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	handleSelectChange = selectedOption => {
		this.setState({ sort_by: selectedOption });
	}

	handleSubmit = event => {
		event.preventDefault();

		const { x_coor, y_coor, sort_by, asc_order, max_results } = this.state;

		this.setState({ fetchFailed: false });
		this.setState({ isFetching: true });

		// ! if running the front and back separately, one should add localhost:PORT here
		fetch(`/api/search?x_coor=${x_coor}&y_coor=${y_coor}&sort_by=${sort_by.value}&asc_order=${asc_order}&max_results=${max_results}`)
			.then(data => {
				this.setState({ isFetching: false });
				return data.json();
			})
			.then(data => {
				this.setState({ restaurants: data.search_results.restaurants });
			})
			.catch(error => {
				this.setState({ isFetching: false });
				this.setState({ fetchFailed: true });

				console.error(error);
			});
	}

	render() {
		const { isFetching, fetchFailed, sort_by, restaurants,
			x_coor, y_coor, max_results, asc_order } = this.state;

		const options = [
			{ value: 'name', label: 'Name' },
			{ value: 'cuisine', label: 'Cuisine' },
			{ value: 'address', label: 'Address' },
			{ value: 'best_discount', label: 'Best discount' },
			{ value: 'rating', label: 'Rating' },
			{ value: 'reviews', label: 'Reviews' },
			{ value: 'average_ticket', label: 'Average ticket' },
			{ value: 'best_discount', label: 'Best discount' },
			{ value: 'takes_yums', label: 'Takes yums' },
		];

		return (
			<div>
				<div className='valign-wrapper row login-box'>
					<div className='col card s10 pull-s1 m6 pull-m3 l4 pull-l4'>

						<form onSubmit={this.handleSubmit} className='white col s12'>
							<div className='card-content'>

								<h5 className='grey-text text-darken-3'>Find the restaurants closest to you!</h5>

								<div className='row section'>
									<div className='input-field col s12'>
										<label htmlFor='x_coor' className='max-width'>X coordinate
										<input type='number' className='validate' id='x_coor' onChange={this.handleChange} value={x_coor} required />
										</label>
									</div>
								</div>

								<div className='row section'>
									<div className='input-field col s12'>
										<label htmlFor='y_coor' className='max-width'>Y coordinate
										<input type='number' className='validate' id='y_coor' onChange={this.handleChange} value={y_coor} required />
										</label>
									</div>
								</div>

								<div className='row section'>
									<div className='input-field col s12'>
										<label htmlFor='max_results' className='max-width'>Max results
										<input type='number' className='validate' id='max_results' onChange={this.handleChange} value={max_results} required />
										</label>
									</div>
								</div>

								<div className='row section'>
									<div className='input-field col s12'>
										<span className='filter-by'>Filter by</span>
									</div>
								</div>

								<div className='row section'>
									<div className='input-field col s12'>
										<Select value={sort_by} onChange={this.handleSelectChange} options={options} />
									</div>
								</div>

								<div className='row section'>
									<div className='col s12 center'>
										<button type='submit' className='social-button border-black blue lighten-5 button-gap'>
											<span className='social-button__text'>Search</span>
										</button>
										<button type='button' className='social-button border-black blue lighten-5 button-gap' onClick={this.resetCoordinatesAndFilters}>
											<span className='social-button__text'>Reset filters</span>
										</button>
									</div>
								</div>

								<div className='green-text center'>{isFetching ? <p>Fetching restaurants...</p> : null}</div>
								<div className='red-text center'>{fetchFailed ? <p>Couldn&apos;t retrieve the restaurants</p> : null}</div>

							</div>
						</form>
					</div>
				</div>

				{restaurants ? <Restaurants restaurants={restaurants.map(el => el.restaurant)} /> : null}
			</div>
		);
	}
}

export default NearMe;
