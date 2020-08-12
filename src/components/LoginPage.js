import React from 'react';
import { firebase, googleAuthProvider } from '../firebase/firebase';

const LoginPage = ({history}) => {

    const login = () => {
        firebase.auth().signInWithPopup(googleAuthProvider)
    }
    
    return (
        <div>
            <button
                onClick={login}
                type="button">
                Login
            </button>
        </div>
    )
}

export default LoginPage;