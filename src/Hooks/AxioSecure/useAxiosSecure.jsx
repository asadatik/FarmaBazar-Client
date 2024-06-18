import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { LogOut } =useContext(AuthContext);
        
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
 
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
      
        if (status === 401 || status === 403) {
            await LogOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;