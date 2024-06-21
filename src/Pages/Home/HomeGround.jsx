import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import Slider from "./Slider/Slider";
import Discount from "./Discount/Discount";
import HelthTips from "./ExtraSections/HelthTips";


const HomeGround = () => {
    const axiosPublic = useAxiosPublic();

    const { data: category = [], isPending: loading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category');
            return res.data;
        }
    })

    if (loading) {
        return <div className=" mt-20 flex justify-center    "  >

            <img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />
        </div>

    }

    console.log(category)

    return (
        <div className=" mb-10    space-y-20 " >

            <Slider> </Slider>

 {/* Category */}
             <div>
             <h1 className="lg:text-3xl font-bold my-6  uppercase text-center lg:tracking-[.25em]   md:w-2/4  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " > Explore Category of Medicines </h1>
            <div className="grid  mx-auto container  gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-3"  >
                {category.map(i => <CategoryCard key={i._id} item={i}  >     </CategoryCard>)}
            </div>

             </div>
             
  {/* Discount  */}
             <Discount></Discount>
  {/* extra 2 section */}
            <div >
             
               <HelthTips></HelthTips>


            </div>
 
        </div>
    );

};

export default HomeGround;