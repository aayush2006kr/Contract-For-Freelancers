import { createContext, useState , useEffect } from "react";
import { getCurrentUser } from "../api/authApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            login(response.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    fetchCurrentUser();
}, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
};

 const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;