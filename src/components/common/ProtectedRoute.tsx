import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = { children: JSX.Element }

export function ProtectedRoute({ children }: Props) {
  const { userId } = useAuth();

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
}
