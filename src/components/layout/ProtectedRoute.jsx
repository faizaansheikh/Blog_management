import { Navigate } from "react-router-dom";
import { useAuthToken } from "../../customHooks/useAuthToken";

export default function ProtectedRoute({ children }) {
    const { token } = useAuthToken();
    
    console.log(token);
    
    if (!token) return <Navigate to="/login" replace />;

    return children;
}
