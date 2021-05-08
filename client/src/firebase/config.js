import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfzffwSlxVpsHxpnoKithk_awzwqDkyTw",
  authDomain: "social-media-4cd6d.firebaseapp.com",
  projectId: "social-media-4cd6d",
  storageBucket: "social-media-4cd6d.appspot.com",
  messagingSenderId: "316136711892",
  appId: "1:316136711892:web:e27486d1039e99c6bf7d41",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
