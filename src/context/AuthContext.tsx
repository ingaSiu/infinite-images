import { ReactNode, createContext, useEffect, useState } from 'react';

import { BASE_URL } from '../api/baseApi';
import httpClient from '../api/httpClient';
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
  //logout: () => Promise<void>;
  //favorites: string[]; // or whatever type your favorites are
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  //TODO incorrect approach. each time this context is called user get route is called with existing jwt token to get the user data
  //instead of that there is no need to do this. just set some localStorage value that the user is authenticated
  //if it exists, the private route is show, if no then redirected
  //even if user does not have correct jwt then when protected route is opened and backend fetch is done
  //then after 401 response jwt cookie should be deleted and user redirected to login p age
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await httpClient.get<User>(`${BASE_URL}users/profile`);
        setUser(data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return null;
  }

  const login = async (email: string, password: string) => {
    try {
      await httpClient.post(`${BASE_URL}users/auth`, { email, password });
      const { data } = await httpClient.get<User>(`${BASE_URL}users/profile`);
      setUser(data);
      console.log(data);
      navigate('/users/profile/' + data._id);
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  //TODO on initial load it is null and causes problems in private routes- instant redirect
  //TODO fixed with loading
  const isAuthenticated = !!user;

  console.log('NOT AUTHENTICATED???');
  console.log(user);
  console.log(isAuthenticated);

  return <AuthContext.Provider value={{ user, login, isAuthenticated }}>{children}</AuthContext.Provider>;
};
