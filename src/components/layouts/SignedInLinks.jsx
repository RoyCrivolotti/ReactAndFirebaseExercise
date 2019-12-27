import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => (
	<ul className='right'>
		<li><NavLink to='/' activeClassName='active'>Favorites</NavLink></li>
		<li><NavLink to='/' activeClassName='active'>Sign out</NavLink></li>
		<li>
			<NavLink to='/' className='btn btn-floating pink lighten-1' activeClassName='active'> RC</NavLink>
		</li>
	</ul>
);

export default SignedInLinks;
