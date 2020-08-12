import React, { useState, useEffect} from 'react';
import { firebase } from '../firebase/firebase';
import { history } from '../App';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user.uid);
                setLoadingAuth(false);
                if (history.location.pathname === '/login') {
                    history.push('/dashboard');
                }
            } else {
                setUser(null);
                setLoadingAuth(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated: user !== null,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext as default };