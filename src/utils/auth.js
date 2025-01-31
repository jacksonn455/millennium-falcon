import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/millennium-falcon/login" replace />;
  }

  return element;
};

export default ProtectedRoute;