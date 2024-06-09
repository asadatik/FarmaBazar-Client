import { FcPlus } from "react-icons/fc";
import AOS from 'aos';
import 'aos/dist/aos.css';
 import './Category.css'
import { Link } from "react-router-dom";


// AOS.init();
AOS.init({
    duration: 2000
   });
const CategoryCard = ({item}) => {
  
const {itemCount,image,name}=item;
    
    return (
        <div       
        //  data-aos="fade-up"
        //      data-aos-duration="2000"
        data-aos="example-anim3" >
          <Link   to={`/allmedi/${name}`}>
          <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div className="w-full h-60  border-[#FFC0CB] border-2  bg-gray-300 bg-center bg-cover rounded-xl  shadow-2xl"
    
    style={{ backgroundImage: `url(${image})` }} >

      </div>

    <div className="w-56 -mt-10 overflow-hidden  bg-white shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold  text-xl tracking-wide flex   justify-center gap-2   text-gray-800 uppercase dark:text-white"> <span className="text-2xl"  ><FcPlus />  </span> {name}</h3>

        <div className="md:flex items-center justify-between px-6 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-semibold  text-base    text-gray-800 dark:text-gray-200"> Number Of Medicine : </span>
            <h2 className="px-2 py-1 text-base text-center font-bold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded">{itemCount}</h2>
        </div>
    </div>
           </div> 
          </Link>              
        </div>
    );
};

export default CategoryCard;