import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth-context';
import Loading from '../components/Loading';

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated, loadingAuth } = useContext(AuthContext);

    if(loadingAuth) {
        return <Loading />
    }
    
    return (
        <Route {...rest} render={ () => {
                return (
                    isAuthenticated ? (
                        children
                    ) :
                    (
                        <Redirect to="/" />
                    )
                )
            }

        } />
    )
}

export default PrivateRoute;