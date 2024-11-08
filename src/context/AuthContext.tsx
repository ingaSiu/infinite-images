import { ReactNode, createContext, useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import { LOGIN_PATH } from '../routes/consts';
import httpClient from '../api/httpClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenExists = localStorage.getItem('isAuthenticated');

      if (tokenExists) {
        try {
          const { data } = await httpClient.get<User>(`${BASE_URL}users/profile`);
          setUser(data);
        } catch (error) {
          console.log(error);
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await httpClient.post(`${BASE_URL}users/auth`, { email, password });
      localStorage.setItem('isAuthenticated', 'true');
      const { data } = await httpClient.get<User>(`${BASE_URL}users/profile`);
      setUser(data);
      navigate('/profile/' + data._id + '/favorites');
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error(error);
      toast.error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    navigate(LOGIN_PATH);
    toast.success('Successfully logged out!');
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated, logout, setUser }}>{children}</AuthContext.Provider>
  );
};
