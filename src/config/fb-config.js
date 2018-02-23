import firebase from "firebase";
import fbCreds from "../creds/fb-creds.js"

const fb = Object.assign({}, fbCreds);
firebase.initializeApp(fb);
