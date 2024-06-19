// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";




const useCart = () => {
    const axiospublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    console.log(user)
    const { refetch, data: cart = [] ,isLoading} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await axiospublic.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })

    return [cart, refetch , isLoading]
};

export default useCart;