import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'microflip-auth';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return '';
    try { return JSON.parse(storedAuth)?.token || ''; } catch { return ''; }
  });
  const [user, setUser] = useState(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return null;
    try { return JSON.parse(storedAuth)?.user || null; } catch { return null; }
  });
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  }, [token, user]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;

    async function loadProfile() {
      if (isMounted) {
        setIsLoading(true);
      }

      try {
        const response = await apiRequest('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        if (isMounted && error.message?.includes('401')) {
          setToken('');
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const syncAuth = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
  };

  const signup = async (payload) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: payload,
    });

    syncAuth(response);
    return response;
  };

  const login = async (payload) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: payload,
    });

    syncAuth(response);
    return response;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        authHeaders: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
        isAuthenticated: Boolean(token && user),
        isAdmin: Boolean(user?.isAdmin),
        isLoading,
        login,
        logout,
        signup,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
