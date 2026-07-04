import { createContext, useContext, useState, useCallback } from 'react';
import { demoAccounts } from '../utils/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('qc-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((roleOrId) => {
    const account = demoAccounts.find(a => a.role === roleOrId || a.id === roleOrId);
    if (account) {
      setUser(account);
      sessionStorage.setItem('qc-user', JSON.stringify(account));
    }
    return account;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('qc-user');
  }, []);

  const isRole = useCallback((role) => user?.role === role, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
