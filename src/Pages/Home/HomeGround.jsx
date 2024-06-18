import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import Slider from "./Slider/Slider";
   

const HomeGround = () => {
    const axiosPublic = useAxiosPublic();
         
    const {data: category = [], isPending: loading} = useQuery({  
        queryKey: ['category'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/category');
            return res.data;
        }
    })
            
    if(  loading ) {
        return  <div  className=" mt-20 flex justify-center    "  >
     
<img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />
 </div> 
  
     } 

console.log(category)

    return (
        <div className=" my-10      " >
             
             <Slider>       </Slider>

     {/* 9 category  */}
             <div className="grid  mx-auto container  gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-3"  >
                {category.map(i=> <CategoryCard  key={i._id}  item={i}  >     </CategoryCard>                   )            }   
            </div>
      
        </div>
    );
    
};

export default HomeGround;