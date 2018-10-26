import firebase from "firebase";

const configFireCurr = {
  apiKey: "AIzaSyDVN_PeUIB0-Lqcmdi7RKVxC0zNsOYgnXA",
  authDomain: "react-currency.firebaseapp.com",
  databaseURL: "https://react-currency.firebaseio.com",
  projectId: "react-currency",
  storageBucket: "react-currency.appspot.com",
  messagingSenderId: "517049409174"
};
const fire = firebase.initializeApp(configFireCurr);
export default fire;
