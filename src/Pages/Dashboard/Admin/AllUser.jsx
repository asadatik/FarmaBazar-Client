import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { FaUsers } from "react-icons/fa";


const AllUser = () => {
    const AxiosPublic = useAxiosPublic();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/users');
            return res.data;
        }
    })


    return (
        <div>
              <h1 className="text-4xl font-bold  uppercase  lg:tracking-[.25em]  text-center md:w-2/4  border-y-4  border-cyan-700  p-4 font-cinzel   mx-auto    " > Manage USER </h1>  
            

              
            <section className='container p-4  my-10 bg-base-300   mx-auto pt-12'>
            <div className='text-center'>
          <h2 className='text-2xl font-bold  font-nothing     '> 
          Total Users  : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {users.length} </span></h2>
  
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
                        <div className='flex items-center gap-x-1'>
                        </div>
                      </th> 

                      <th
                        scope='col'
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                          <span>User Name</span>
                        </div>
                      </th>

                      <th
                        scope='col'
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center '>
                          <span>Email</span>
                        </div>
                      </th>  

                      {/* <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                        <span>Current Role</span>
                      </th>
                      */}
                    
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                      Be User
                      </th>
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                      Be Seller
                      </th>
                      <th
                        scope='col'
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                          <span>Be Admin</span>
                        </div>
                      </th>
                     
                     
                      </tr>
                  </thead>
                     
                  <tbody>
                
                 {
                  users?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>
                 
                      
                      
                          <td className='' > {i.name}</td>  
                         <td>  {i.email}</td>
                           {/* <td className='' > {i.role}</td>  */}
                        <td  className=""  >    { i.role === 'user' ? ' user ' : <button
                                        // onClick={() => handleMakeAdmin(user)}
                                        className="btn my-1 btn-sm  bg-orange-500">
                                        <FaUsers className="text-white 
                                        text-2xl"></FaUsers>
                                    </button>}        </td>

                       { <td  className=""  >           </td>}

                          <td  className=" "  >    </td>
                          


                          
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

export default AllUser;