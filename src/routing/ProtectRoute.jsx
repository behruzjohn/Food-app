import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const authStore = JSON.parse(localStorage.getItem('authStore') || '{}');
  const token = authStore?.state?.token;

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;
