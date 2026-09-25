import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("user");
  const authData = storedUser ? JSON.parse(storedUser) : null;

 
  if (!authData?.token || !authData?.user) {
    return <Navigate to="/login" replace />;
  }

 
  if (role && authData.user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
