import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ roles, children }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    const home = user.role === 'super' ? '/super' : user.role === 'clinic-admin' ? '/clinic' : user.role === 'doctor' ? '/doctor' : '/';
    return <Navigate to={home} replace />;
  }
  return children;
}
