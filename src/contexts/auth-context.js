import React, { useState, useEffect} from 'react';
import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoadingAuth(false);
                if (['/login', '/'].includes(history.location.pathname)) {
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
                user: user ? user.uid : null,
                isAuthenticated: user !== null,
                loadingAuth,
                initial: user ? user.displayName.charAt(0) : ''
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext as default };