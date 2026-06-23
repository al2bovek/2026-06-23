import { createContext, useContext, useEffect, useState } from 'react';
import { AuthApi } from '../api/auth.api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthApi.me()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const data = await AuthApi.login(credentials);
    setUser(data.user);
    return data.user;
  };

  const register = async (credentials) => {
    const data = await AuthApi.register(credentials);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );

  const update = async (payload) => {
    const data = await AuthApi.update(payload);
    setUser(data.user);
    return data.user;
  };

  const remove = async () => {
    await AuthApi.remove();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        update,
        remove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);