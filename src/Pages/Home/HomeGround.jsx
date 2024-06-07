import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
   

const HomeGround = () => {
    const axiosPublic = useAxiosPublic();
         
    const {data: category = [], isPending: loading} = useQuery({
        queryKey: ['category'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/category');
            return res.data;
        }
    })

console.log(category)

    return (
        <div className=" my-10       border-4 border-sky-400    " >
             
 
     {/* 9 category  */}
             <div className="grid gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-3"  >
                {category.map(i=> <CategoryCard  key={i._id}  item={i}  >     </CategoryCard>                   )            }   
            </div>
      
        </div>
    );
    
};

export default HomeGround;