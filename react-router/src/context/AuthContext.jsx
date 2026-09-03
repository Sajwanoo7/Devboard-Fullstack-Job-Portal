import {createContext, useContext, useState} from 'react'
import server from '../api/server'
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // for the frontend, we can store the user info in state
  const [loading, setLoading] = useState(false);

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await server.post('/auth/register', { name, email, password });
      setUser(res.data.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  /// create login function here in the same way as register

  return (
    <AuthContext.Provider value={{ user, loading, register }}> // pass it here
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
