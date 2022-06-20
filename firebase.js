// Import the functions you need from the SDKs you need
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCUnP0jD_IvdI5XaLGvErwz7PEibMlfN70',
  authDomain: 'clone-e1ea9.firebaseapp.com',
  projectId: 'clone-e1ea9',
  storageBucket: 'clone-e1ea9.appspot.com',
  messagingSenderId: '593835747562',
  appId: '1:593835747562:web:eb9b1e2decb751c5210f93',
  measurementId: 'G-99FV40XXJT',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
