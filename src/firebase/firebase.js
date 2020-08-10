import * as firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASEURL,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDINGID,
    appId: process.env.REACT_APP_FB_APPID
};

firebase.initializeApp(config);

const database = firebase.database();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

// export { firebase, googleAuthProvider, database as default };
export { database as default };