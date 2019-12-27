/* eslint-disable camelcase */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import M from 'materialize-css';

class RestaurantSummary extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			name: PropTypes.string.isRequired,
			coor_x: PropTypes.number.isRequired,
			coor_y: PropTypes.number.isRequired,
			cuisine: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			average_ticket: PropTypes.number.isRequired,
			best_discount: PropTypes.number.isRequired,
			image_url: PropTypes.string.isRequired,
			takes_yums: PropTypes.bool.isRequired,
			rating: PropTypes.number.isRequired,
			reviews: PropTypes.number.isRequired,
		}).isRequired,
		index: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			coor_x: 0,
			coor_y: 0,
			cuisine: '',
			address: '',
			average_ticket: 0,
			best_discount: 0,
			image_url: '',
			takes_yums: false,
			rating: 0,
			reviews: 0,
		};

		this.imageRef = React.createRef();
	}

	componentDidMount() {
		const { data } = this.props;
		if (data) {
			this.setState({ name: data.name });
			this.setState({ coor_x: data.coor_x });
			this.setState({ coor_y: data.coor_y });
			this.setState({ cuisine: data.cuisine });
			this.setState({ address: data.address });
			this.setState({ average_ticket: data.average_ticket });
			this.setState({ best_discount: data.best_discount });
			this.setState({ image_url: data.image_url });
			this.setState({ takes_yums: data.takes_yums });
			this.setState({ rating: data.rating });
			this.setState({ reviews: data.reviews });

			M.Materialbox.init(this.Materialbox);
		}
	}

	render() {
		const { index } = this.props;

		const { name, coor_x, coor_y, cuisine, address, rating, reviews,
			average_ticket, best_discount, image_url, takes_yums } = this.state;

		return (
			<div className='row section card z-depth-0 col s12 m6 l4'>
				<div className='card-content grey-text text-darken-3'>
					<img className='materialboxed' width='300' src={image_url} alt={name} ref={Materialbox => { this.Materialbox = Materialbox; }} />
					<h6 className='cuisine-type grey-text text-lighten-1'>{cuisine}</h6>
					<Link className='black-text' to={{ pathname: `/restaurant/${index}`, state: { ...this.state, index } }}>
						<span className='card-title color-on-hover'>{name}</span>
					</Link>
					<p>{address}</p>
					<p> Precio promedio $ {average_ticket} {takes_yums ? ' - acepta Yums' : ''} </p>
					<br />
					{/* // TODO: add description */}
					<p>Lorem ipsum description</p>
					<br />

					<div className='section left-align'>
						<span className='grey-text section'>Rating - {rating}</span>
					</div>

					<span className='grey-text section'>Reviews - {reviews}</span>

					<div className='section'>
						<button className='waves-effect waves-light btn' type='button'>RESERVAR - HASTA -{best_discount}%</button>
					</div>
				</div>
			</div>
		);
	}
}

export default RestaurantSummary;
