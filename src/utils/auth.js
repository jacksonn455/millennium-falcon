import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/millennium-falcon/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("authToken");
      return <Navigate to="/millennium-falcon/login" replace />;
    }
  } catch (error) {
    console.error("Token inválido:", error);
    localStorage.removeItem("authToken");
    return <Navigate to="/millennium-falcon/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
