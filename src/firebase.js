import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyByZK6bDzQm52Qzt5rX3y3lyL9lXUyQEkc',
	authDomain: 'auth-2020-2-606cd.firebaseapp.com',
	databaseURL: 'https://auth-2020-2-606cd.firebaseio.com',
	projectId: 'auth-2020-2-606cd',
	storageBucket: 'auth-2020-2-606cd.appspot.com',
	messagingSenderId: '355717059173',
	appId: '1:355717059173:web:84671b5d60474532efac8c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
