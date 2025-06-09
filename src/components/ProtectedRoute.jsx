
import { Navigate } from "react-router-dom";
import { useAuthprops } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { users } = useAuthprops();
  if (!users) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
