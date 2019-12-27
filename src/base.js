import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_ApiKey,
	authDomain: process.env.REACT_APP_AuthDomain,
	databaseURL: process.env.REACT_APP_URL,
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
