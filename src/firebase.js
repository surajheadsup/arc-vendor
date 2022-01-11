import firebase from 'firebase';
const firebaseConfig = {
	apiKey: "AIzaSyAJVvCsffN3QGFZBfEoJoUv1xxmZocMlqA",
    authDomain: "arcpl-india.firebaseapp.com",
    projectId: "arcpl-india",
    storageBucket: "arcpl-india.appspot.com",
    messagingSenderId: "170546498633",
    appId: "1:170546498633:web:143b69accd197c69b34398",
    measurementId: "G-9CWXH42CPM"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
