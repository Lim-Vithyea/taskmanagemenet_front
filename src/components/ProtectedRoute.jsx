
// import { Navigate } from "react-router-dom";
// import { useAuthprops } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { users } = useAuthprops();
//   if (!users) return <Navigate to="/login" />;
//   return children;
// };

// export default ProtectedRoute;

import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}