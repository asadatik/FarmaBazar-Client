import { FcCancel } from "react-icons/fc";
import {   useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

const MedicineDtls = () => {
    // const data = useLoaderData()
    const axiosPublic = useAxiosPublic();
const params = useParams()

         
    const {data: categories = [], isPending: loading} = useQuery({  
        queryKey: ['category'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/allmedi');
            return res.data;
        }
    })

// LOADING GIF
    if(  loading ) {
        return  <div  className=" my-24 flex justify-center    "  >
     
<img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />
 </div> 
  
     } 


    const Category = categories.filter(item => item.category === params.name);
              
    console.log(Category)
    // { name,company,price per unit}  
        
   
   
    return (
        <div>
              <h1 className="text-3xl font-bold  text-center w-2/3  border-y-4  border-cyan-700  p-4 font-cinzel   mx-auto    " >All medicines Of  :  <span className="uppercase font-extrabold text-amber-400  md:tracking-[.35em]" > {params.name}</span>. </h1>  
                  
         {/*  */}
         
                   <section className='container p-4  my-10 bg-base-300   mx-auto pt-12'>
            <div className='text-center'>
          <h2 className='text-2xl font-bold  font-nothing     '> 
          Total Medicine  : <span className=' px-2 py-1 text-lg text-center font-bold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {Category.length} </span></h2>
  
        </div>
  
        <div className='flex flex-col mt-6'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className=' bg-blue-500 text-white font-nothing   '>
                    <tr>
                    <th
                        scope='col'
                        className='py-3.5 px-4 text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-3'>
                        </div>
                      </th> 

                      <th
                        scope='col'
                        className='py-3.5 px-4 text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Name</span>
                        </div>
                      </th>
  
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                        <span>Company</span>
                      </th>
  
                      
  
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                     Price per  Unit
                      </th>
  
                        
  
                      <th className=' py-3.5 text-xl font-normal text-left rtl:text-right '>
                       
                      </th>
                     
                      </tr>
                  </thead>
                     
                  <tbody>
                
                 {
                   Category?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-2 text-lg font-bold  '>
                            {index + 1}.
                          </td>

                      <td className='' > {i.name}</td>  
                       <td>  {i.company}</td>
                   <td>  {i.price}  </td>
                
                 
                    <td  className="flex py-2 gap-4  "  >
                            <button    className='btn btn-sm   btn-outline    text-lg   text-black ' >select   </button>  
               
                             <button    className='btn btn-sm  text-lg bg-violet-400  text-black ' > <FaEye className="text-xl"     /> </button>  

                    </td>
                         </tr>
                          
                   ))
                   
                 }
                
           
                        </tbody>
                       
                </table>
              </div>
            </div>
          </div>
        </div>
                   </section> 
         

        </div>
    );
};

export default MedicineDtls;