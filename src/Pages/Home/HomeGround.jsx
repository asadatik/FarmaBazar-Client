import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
   

const HomeGround = () => {
    const axiosPublic = useAxiosPublic();
         
    const {data: category = [], isPending: loading, refetch} = useQuery({
        queryKey: ['category'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/category');
            return res.data;
        }
    })

console.log(category)

    return (
        <div>
             
 

          <h2>hhhhhhhhhhhhhhhhhhhhhh</h2>
           <CategoryCard></CategoryCard>
        </div>
    );
    
};

export default HomeGround;