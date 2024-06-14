import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { FaUsersLine } from "react-icons/fa6";
import { ImUserPlus } from "react-icons/im";
import { FaUserSecret } from "react-icons/fa";


const AllUser = () => {
    const AxiosPublic = useAxiosPublic();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/users');
            return res.data;
        }
    })
// Make user 
    const handleMakeuser = user =>{
    AxiosPublic.patch(`/users/user/${user._id}`)
      .then(res =>{
          console.log(res.data)
          if(res.data.modifiedCount > 0){
              refetch();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name}is an User Now!`,
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      })
  }
// make seller
const handleMakeSeller = user =>{
  AxiosPublic.patch(`/users/seller/${user._id}`)
    .then(res =>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name}is a Seller  Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
}

// make Admin 
const handleMakeAdmin = user =>{
  AxiosPublic.patch(`/users/admin/${user._id}`)
    .then(res =>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name}is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
}
 


    return (
        <div>
              <h1 className="lg:text-3xl font-bold  uppercase  lg:tracking-[.25em]  text-center md:w-1/4  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " > Manage USER </h1>  
            

              
            <section className='container p-4  my-3 bg-base-300   mx-auto pt-12'>
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
                        className='py-3.5  font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                          <span>User Name</span>
                        </div>
                      </th>

                      <th
                        scope='col'
                        className='py-3.5  lg:text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center '>
                          <span>Email</span>
                        </div>
                      </th>  

                      {/* <th
                        scope='col'
                        className=' py-3.5 lg:text-xl font-normal text-left rtl:text-right '
                      >
                        <span>Current Role</span>
                      </th>
                      */}
                    
                      <th
                        scope='col'
                        className=' py-3.5 lg:text-xl font-normal text-left rtl:text-right '
                      >
                      Be User
                      </th>
                      <th
                        scope='col'
                        className=' py-3.5 lg:text-xl font-normal text-left rtl:text-right '
                      >
                      Be Seller
                      </th>
                      <th
                        scope='col'
                        className='py-3.5  lg:text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                          <span>Be Admin</span>
                        </div>
                      </th>
                     
                     
                      </tr>
                  </thead>
                     
                  <tbody>
            {/* conditional */}
                 {
                  users?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter lg:text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>
                 
                          
                      
                          <td className='' > {i.name}</td>  
                         <td>  {i.email}</td>
                      {/* <td className='' > {i.role}</td>  */}
                        <td  className="  text-xl font-cinzel  text-sky-800 font-semibold"  >    { i.role === 'user' ? 'user' : <button
                                        onClick={() => handleMakeuser(i)}
                                        className="btn my-1 btn-sm rounded-full bg-gradient-to-r from-green-400  to-blue-500 ">
                                       <FaUsersLine className="text-xl text-black  "      />
                                    </button>}        </td>
                     {/*  */} 
                       { <td  className=" text-xl font-cinzel  text-violet-500 font-semibold"  >     { i.role === 'seller' ? 'Seller' : <button
                                        onClick={() => handleMakeSeller(i)}
                                        className="btn my-1 btn-sm rounded-full bg-gradient-to-r from-green-200  to-blue-500 ">
                                       <ImUserPlus className="text-xl text-black  "      />
                                    </button>}         </td>}
                     {/*  */}
                          <td  className="text-xl font-cinzel  text-blue-500 font-semibold "  >    { i.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(i)}
                                        className="btn my-1 btn-sm rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
                                       <FaUserSecret className="text-xl text-black  "      />
                                    </button>} 
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

export default AllUser;