/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import base, { firebaseApp } from '../../base';

const jwt = require('jsonwebtoken');
const jsCookie = require('js-cookie');

class SignIn extends React.Component {
	static propTypes = {
		history: PropTypes.shape().isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			authError: false,
		};
	}

	componentDidMount() { }

	resetState = () => {
		this.setState({ email: '' });
		this.setState({ password: '' });
	}

	authenticateWithProvider = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();

		firebaseApp
			.auth()
			.signInWithRedirect(authProvider)
			.then(this.authHandler)
			.catch(error => {
				if (error.code === 'auth/account-exists-with-different-credential') {
					console.log('This email already has an account with different providers!');
				}

				this.handleAuthError(error);
			});
	}

	authenticateWithEmailAndPassword = () => {
		const { history } = this.props;
		const { email, password } = this.state;

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ authError: false });
				this.resetState();

				return firebase.auth().currentUser.getIdToken(true)
					.then(idToken => {
						// TODO: auth cookies
						// const csrfToken = getCookie('csrfToken');
						// postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
					})
					.then(() => history.push('/'))
					.catch(error => {
						firebase.auth().signOut()
							.then(() => {
								console.error('There was an issue while signing you in, please try again.');
								history.push('/signin');
							});
					});
			})
			.catch(this.handleAuthError);
	}

	handleAuthError = error => {
		console.error(`Error code: ${error.code}`);
		console.error(`Error message: ${error.message}`);

		this.resetState();

		this.setState({ authError: true });
	}

	authHandler = async authData => {
		const user = await base
			.fetch(firebase.auth().currentUser, { context: this })
			.catch(error => {
				console.log(`Error: ${error.message}`);
			});
	};

	logout = async () => {
		console.log('Logging out!');
		await firebase.auth().signOut();

		// TODO: deal with auth cookies
	};

	handleInputChange = event => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		this.authenticateWithEmailAndPassword();
	}

	render() {
		const { authError, email, password } = this.state;

		return (
			<div className='valign-wrapper row login-box'>
				<div className='col card s10 pull-s1 m6 pull-m3 l4 pull-l4'>

					<form onSubmit={this.handleSubmit} className='white col s12'>
						<div className='card-content'>

							<h5 className='grey-text text-darken-3'>Sign in</h5>

							<div className='row section'>
								<div className='input-field col s12'>
									<label htmlFor='email' className='max-width'>
										<input type='email' className='validate' id='email' value={email} placeholder='Email' onChange={this.handleInputChange} required />
									</label>
								</div>
							</div>

							<div className='row section'>
								<div className='input-field col s12'>
									<label htmlFor='password' className='max-width'>
										<input type='password' minLength='8' maxLength='20' value={password} pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' className='validate' id='password' placeholder='Password' onChange={this.handleInputChange} required />
										<span className='password-helper-text' data-error='Should be 8-20 in length and contain at least one uppercase, lowercase and numeric character' data-success='' />
									</label>
								</div>
							</div>

							<div className='row section'>
								<div className='col s12 center'>

									<div className='section'>
										<div className='row'>
											<button type='submit' className='social-button border-black blue lighten-5'>
												<span className='social-button__text'>Login</span>
											</button>
										</div>
									</div>

									<div className='row'>
										<button type='button' id='Github' onClick={this.authenticateWithProvider} className='social-button border-black'>
											<span className='social-button__icon left-align'>
												<svg className='github-logo' height='25' viewBox='0 0 16 16' version='1.1' width='32' aria-hidden='true'><path fillRule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' /></svg>
											</span>
											<span className='social-button__text'>Sign in with GitHub</span>
										</button>
									</div>

									<div className='row'>
										<button type='button' id='Google' onClick={this.authenticateWithProvider} className='social-button border-black'>
											<span className='social-button__icon'>
												<svg viewBox='0 0 366 372' xmlns='http://www.w3.org/2000/svg'><path d='M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z' id='Shape' fill='#EA4335' /><path d='M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z' id='Shape' fill='#FBBC05' /><path d='M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z' id='Shape' fill='#4285F4' /><path d='M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z' fill='#34A853' /></svg>
											</span>
											<span className='social-button__text'>Sign in with Google</span>
										</button>
									</div>
								</div>
							</div>

							<div className='red-text center'>{authError ? <p>Login failed</p> : null}</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignIn;
