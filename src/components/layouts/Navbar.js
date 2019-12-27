import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => (
	<nav className='nav-wrapper grey darken-3'>
		<div className='container'>
			<div className='left'>
				<ul className='nav-mobile left'>
					{/* <Link to='/' className='brand-logo left'>Home</Link> */}
					<NavLink to='/' activeClassName='active' className='navbar-title left'>Home</NavLink>

					{/* <SignedInLinks /> */}
					{/* <SignedOutLinks /> */}
				</ul>
			</div>

			<div className='right'>
				<ul className='nav-mobile right'>
					<li>
						<NavLink to='/nearme' activeClassName='active' className='right navbar-title'>Near me</NavLink>
					</li>
					<li>
						<NavLink to='/' className='btn btn-floating pink lighten-1' activeClassName='active'> RC</NavLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);

export default Navbar;
