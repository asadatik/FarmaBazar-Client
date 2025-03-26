import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import Slider from "./Slider/Slider";
import Discount from "./Discount/Discount";
import HelthTips from "./ExtraSections/HelthTips";
import { Helmet } from "react-helmet-async";


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
             <Helmet>
                <title>Home || FarmaBazar</title>
            </Helmet>
            <Slider> </Slider>

 {/* Category */}
             <div>
             <h2 className="text-xl  md:text-3xl font-extrabold  uppercase  font-cinzel lg:text-3xl text-center">Explore Category of Medicines</h2>
                    <div className=" mb-3 text-center">
                        <span className="inline-block  md:w-40 h-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-20 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-10 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-6 h-1 ml-1 bg-blue-500 rounded-full"></span>

                    </div>
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