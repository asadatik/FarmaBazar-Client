import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const PriveteRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <div  className=" my-24 flex justify-center    "  >
         
        <img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />
         </div> 
           
    }

    if (user) {
        return children;
    }
    return  <Navigate to="/joinUs" state={{from: location}} replace></Navigate>
};

export default PriveteRoute;