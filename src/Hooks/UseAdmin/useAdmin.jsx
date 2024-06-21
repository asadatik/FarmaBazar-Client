import { useContext } from "react";

import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxioSecure/useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext)
    console.log(user)
  
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            console.log(res.data?.admin);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;