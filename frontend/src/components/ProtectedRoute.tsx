import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../auth/authService';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const token = getAuthToken();

  return token ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
