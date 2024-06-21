import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/UseAdmin/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div><span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span></div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/joinUs" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;