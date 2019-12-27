import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => (
	<ul className='right'>
		<li><NavLink to='/signup' activeClassName='active'>Sign up</NavLink></li>
		<li><NavLink to='/signin' activeClassName='active'>Sign in</NavLink></li>
	</ul>
);

export default SignedOutLinks;
