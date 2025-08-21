import { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

function AuthProvider({children}){
    const initialUser = Cookies.get('jwt') || localStorage.getItem('chatApp') || null;
    const [authUser, setAuthUser] = useState(initialUser? JSON.parse(initialUser) : null);


    const login = (userData) => {
        Cookies.set('chatApp', JSON.stringify(userData));
        setAuthUser(userData);
    }
    
    return (
        <AuthContext.Provider value={{authUser, setAuthUser, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
