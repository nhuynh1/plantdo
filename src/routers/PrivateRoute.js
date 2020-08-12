import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth-context';

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated, loadingAuth } = useContext(AuthContext);
    console.log({ isAuthenticated, loadingAuth })
    if(loadingAuth) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    
    return (
        <Route {...rest} render={ props => {
                return (
                    isAuthenticated ? (
                        children
                    ) :
                    (
                        <Redirect to="/login" />
                    )
                )
            }

        } />
    )
}

export default PrivateRoute;