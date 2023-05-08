import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookie from './useCookie';
import { LoginData } from '../types';
import { useLoginMutation } from '../api/apiSlice';
import { getIdFromToken } from '../utils';

type Props = { children: JSX.Element }
type AuthContextType = {
  userId: string | undefined;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  isLogging: boolean;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useCookie('token', null);
  const navigate = useNavigate();
  const [loginAction, { isLoading }] = useLoginMutation()

  async function login (data: LoginData) {
    const { token } = await loginAction(data).unwrap()
    setToken(`Bearer ${token}`);
    navigate(`/profile/${getIdFromToken()}`);
  }

  async function logout () {
    setToken('', 0);
    navigate('/', { replace: true });
  }

  const value = useMemo(
    () => ({
      userId: getIdFromToken(),
      login,
      logout,
      isLogging: isLoading,
      setToken
    }),
    [token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};