import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();

        setIsAuthenticated(true);
        setUser(data.user);
        setError(null);
        navigate('/products');
      } else {
        const errorData = await response.json();

        setError(errorData.error || 'Falha no login.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      setError('Falha no login.');
      setIsAuthenticated(false);
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      if (response.ok) {       
        setIsAuthenticated(false);
        setError(null); 
      } else {
        const errorData = await response.json();
        
        setError(errorData.error || 'Falha ao registrar.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      setError('Falha ao registrar.');
      setIsAuthenticated(false);
    }
  }

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/home');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um provider.');
  }

  return context;
}