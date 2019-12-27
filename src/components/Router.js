import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './layouts/NotFound';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Navbar from './layouts/Navbar';
import RestaurantDetails from './restaurant/RestaurantDetails';
import App from './App';
import AddRestaurant from './restaurant/AddRestaurant';
import NearMe from './restaurant/NearMe';

const Router = () => (
	<BrowserRouter>
		<Navbar />
		<Switch>
			<Route exact path='/' component={App} />
			<Route exact path='/restaurant/:restaurantId' component={RestaurantDetails} />
			<Route exact path='/addrestaurant' component={AddRestaurant} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/signup' component={SignUp} />
			<Route exact path='/nearme' component={NearMe} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
