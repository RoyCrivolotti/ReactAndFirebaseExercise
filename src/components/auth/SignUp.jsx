/* eslint-disable no-console */

import React from 'react';
import firebase from 'firebase';

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			authError: false,
		};
	}

	resetState = () => {
		this.setState({ firstname: '' });
		this.setState({ lastname: '' });
		this.setState({ email: '' });
		this.setState({ password: '' });
	}

	handleInputChange = event => {
		// console.log(event);

		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const { firstname, lastname, email, password } = this.state;

		if (firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '') {
			return null;
		}

		// TODO: it would be ideal to add the capability to store custom user fields beside the email and passowrd
		return firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => this.resetState())
			.catch(error => {
				this.resetState();

				console.error(`Error code: ${error.code}`);
				console.error(`Error message: ${error.message}`);

				this.setState({ authError: true });
			});
	}

	render() {
		const { firstname, lastname, email, password, authError } = this.state;

		return (
			<div className='valign-wrapper row login-box'>
				<div className='col card s10 pull-s1 m6 pull-m3 l4 pull-l4'>

					<form onSubmit={this.handleSubmit} className='white col s12'>
						<div className='card-content'>

							<h5 className='grey-text text-darken-3'>Sign up</h5>

							<div className='row section'>
								<div className='input-field col s12'>
									<label htmlFor='firstname' className='max-width'>
										<input type='text' className='validate' id='firstname' value={firstname} placeholder='First name' onChange={this.handleInputChange} required />
									</label>
								</div>
							</div>

							<div className='row section'>
								<div className='input-field col s12'>
									<label htmlFor='lastname' className='max-width'>
										<input type='text' className='validate' id='lastname' value={lastname} placeholder='Last name' onChange={this.handleInputChange} required />
									</label>
								</div>
							</div>

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

							<div className='section'>
								<div className='row center section'>
									<button type='submit' className='social-button border-black blue lighten-5'>
										<span className='social-button__text'>Sign up</span>
									</button>
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

export default SignUp;
