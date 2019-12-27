/* eslint-disable camelcase */
/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import base, { firebaseApp } from '../../base';

class AddRestaurant extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			coor_x: 0.0,
			coor_y: 0.0,
			cuisine: '',
			address: '',
			average_ticket: 0.0,
			best_discount: 0.0,
			image_url: '',
			takes_yumes: false,
		};
	}

	// static propTypes = {
	// username: PropTypes.string.isRequired,
	// }

	componentDidMount() { }

	handleInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	handleCheckboxChange = event => {
		const { takes_yumes } = this.state;

		this.setState({
			[event.target.id]: !takes_yumes,
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		console.log('State');
		console.table(this.state);
	}

	render() {
		const { takes_yumes } = this.state;

		return (
			<div className='valign-wrapper row login-box'>
				<div className='col card s10 pull-s1 m6 pull-m3 '>
					<form onSubmit={this.handleSubmit} className='white col s12'>
						<div className='card-content'>

							<h5 className='grey-text text-darken-3'>Sign in</h5>
							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='name' className='max-width'>
									<input type='text' className='validate' id='name' placeholder='Name' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='coor_x' className='max-width'>
									<input type='number' className='validate' id='coor_x' placeholder='X-Coordinate' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='coor_y' className='max-width'>
									<input type='number' className='validate' id='coor_y' placeholder='Y-Coordinate' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='cuisine' className='max-width'>
									<input type='text' className='validate' id='cuisine' placeholder='Cuisine type' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='address' className='max-width'>
									<input type='text' className='validate' id='address' placeholder='Address' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='average_ticket' className='max-width'>
									<input type='number' className='validate' id='average_ticket' placeholder='Average price' onChange={this.handleInputChange} required />
								</label>
							</div>

							{/* // TODO: checkbox */}
							<div className='input-field col s12 m5 offset-m1 card-content'>
								<span>Does it take yums?</span>
								<label htmlFor='takes_yums'>
									<input type='checkbox' id='takes_yums' onChange={this.toggleCheckboxChange} defaultChecked={takes_yumes} />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='best_discount' className='max-width'>
									<input type='number' className='validate' id='best_discount' placeholder='Best discount' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<label htmlFor='image_url' className='max-width'>
									<input type='text' className='validate' id='image_url' placeholder='Image URL' onChange={this.handleInputChange} required />
								</label>
							</div>

							<div className='input-field col s12 card-content'>
								<label htmlFor='description' className='max-width'>
									<textarea className='materialize-textarea' id='description' placeholder='Description' maxLength='300' onChange={this.handleInputChange} />
								</label>
							</div>

							<div className='input-field col s12 m5 offset-m1 card-content'>
								<div className='right-align'>
									<button type='submit' className='btn green waves-effect waves-light z-depth-0'>Login</button>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default AddRestaurant;
