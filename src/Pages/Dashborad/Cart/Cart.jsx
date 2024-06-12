
import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";



import useCart from "../../../Hook/useCart/useCart";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosPublic();



// delete 
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
          
                 <div className="my-14"   >
    <h1 className="text-4xl font-bold    text-center md:w-1/3  border-y-4  border-cyan-700  p-4 font-cinzel   mx-auto    " > Your Selected Medicine </h1>  
   

              <section className='container p-6  my-10 bg-base-300   mx-auto pt-10'>
            <div className='text-center'>
          {/* <h2 className='text-2xl   font-nothing     '> 
          Total Medicine  : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {cart.length} </span></h2> */}
             <div className="flex justify-evenly ">
                <h2 className="md:text-2xl font-bold font-nothing  ">Items: {cart.length}</h2>
                <h2 className="md:text-2xl font-bold font-nothing ">Total Price: {totalPrice}</h2>
              <Link  to='/dashboard/payment'  >  <button  disabled={!cart.length}   className="btn btn-sm  text-white text-xl bg-amber-600  hover:bg-yellow-500   hover:text-slate-800 "> checkout</button></Link>

            </div>
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
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Name</span>
                        </div>
                      </th>
                      <th
                        scope='col'
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Company</span>
                        </div>
                      </th>  
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                        <span>Quantity</span>
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
                  cart?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>
                 
                      <td className='' > {i.name}</td>  
                      
                      
                       <td>  {i.company}</td>
                       <td className='' > {i.quantity}</td> 
                   <td>  {i.price}  </td>
                
                 
                    <td  className="flex py-1 md:gap-2  "  >
                         
                                      <button
                                        onClick={() => handleDelete(i._id)}
                                        className="btn btn-outline btn-sm bg-sky-400 hover:bg-lime-500 ">
                                        <FaTrashAlt className="text-red-800   text-xl "></FaTrashAlt>
                                    </button> 

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


        </div>
    );
};

export default Cart;