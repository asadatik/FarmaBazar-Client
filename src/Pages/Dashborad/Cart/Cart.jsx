
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";



import useCart from "../../../Hook/useCart/useCart";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";


const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);



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

        axiosSecure.delete(`/cart/${id}`)
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

  // all delete
  const handleAllDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete All!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/carts/${user?.email}`)

          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your All Selected Medicine Deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }

  //  UPDATED QUANTITY

  // Handle quantity increment
const handleIncrement = (item) => {
  const updatedItem = { ...item, quantity: item.quantity + 1 };
  axiosSecure.put(`/carts/${item._id}`, { quantity: updatedItem.quantity })
      .then(res => {
          if (res.data.modifiedCount > 0) {
              refetch(); // Refresh the cart data
          }
      });
};

// Handle quantity decrement
const handleDecrement = (item) => {
  if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      axiosSecure.put(`/carts/${item._id}`, { quantity: updatedItem.quantity })
          .then(res => {
              if (res.data.modifiedCount > 0) {
                  refetch(); // Refresh the cart data
              }
          });
  } 
   
};






  return (
    <div>
        <Helmet>
                <title>Your Cart</title>
            </Helmet> 
      <div className="my-14"   >
        <h1 className="text-4xl font-bold    text-center md:w-1/3  border-y-4  border-cyan-700  p-4 font-cinzel   mx-auto    " > Your Selected Medicine </h1>


        <section className='container p-6  my-10 bg-base-300   mx-auto pt-10'>
          <div className='text-center'>

            <div className=" md:flex justify-evenly ">
              <h2 className="md:text-2xl font-bold font-nothing  ">Items: {cart.length}</h2>
              <h2 className="md:text-2xl font-bold font-nothing ">Total Price: {totalPrice}</h2>

              <button disabled={!cart.length}
                onClick={handleAllDelete}
                className="btn text-white md:text-xl  btn-outline btn-sm bg-lime-500 ">
                Clear All <FaTrashAlt className="text-red-800   text-xl "></FaTrashAlt>
              </button>

              <Link to='/payment'  >  <button disabled={!cart.length} className="btn btn-sm  text-white text-xl bg-amber-600  hover:bg-yellow-500   hover:text-slate-800 "> checkout</button></Link>

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
                        cart?.map((i, index) => (
                          <tr key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                            <td className='pl-3 text-lg font-bold  '>
                              {index + 1}.
                            </td>

                            <td className='' > {i.name}</td>


                            <td>  {i.company}</td>
                            {/* <td className='' > {i.quantity}</td> */}
                            <td className="flex gap-3">
                              <span>{i.quantity}</span>
                              <button onClick={() => handleDecrement(i)} className="btn btn-xs   bg-red-500 text-white rounded"><FaMinus /></button>

                              <button onClick={() => handleIncrement(i)} className=" btn btn-xs  bg-green-500 text-white rounded"><FaPlus /></button>
                            </td>
                            <td>  {i.price}  </td>


                            <td className="flex py-1 md:gap-2  "  >

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







// /////////////////////////


// {/* <div>
// <div className="my-14">
//     <h1 className="text-4xl font-bold text-center md:w-1/3 border-y-4 border-cyan-700 p-4 font-cinzel mx-auto">
//         Your Selected Medicine
//     </h1>
//     <section className="container p-6 my-10 bg-base-300 mx-auto pt-10">
//         <div className="text-center">
//             <div className="md:flex justify-evenly">
//                 <h2 className="md:text-2xl font-bold">Items: {cart.length}</h2>
//                 <h2 className="md:text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
//                 <button
//                     disabled={!cart.length}
//                     onClick={handleAllDelete}
//                     className="btn text-white md:text-xl btn-outline btn-sm bg-lime-500"
//                 >
//                     Clear All <FaTrashAlt className="text-red-800 text-xl" />
//                 </button>
//                 <Link to='/payment'>
//                     <button
//                         disabled={!cart.length}
//                         className="btn btn-sm text-white text-xl bg-amber-600 hover:bg-yellow-500 hover:text-slate-800"
//                     >
//                         Checkout
//                     </button>
//                 </Link>
//             </div>
//         </div>
//         <div className="flex flex-col mt-6">
//             <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//                     <div className="overflow-hidden border border-gray-200 md:rounded-lg">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-blue-500 text-white">
//                                 <tr>
//                                     <th className="py-3.5 px-4 text-xl font-normal text-left">
//                                         #
//                                     </th>
//                                     <th className="py-3.5 text-xl font-normal text-left">
//                                         Name
//                                     </th>
//                                     <th className="py-3.5 text-xl font-normal text-left">
//                                         Company
//                                     </th>
//                                     <th className="py-3.5 text-xl font-normal text-left">
//                                         Quantity
//                                     </th>
//                                     <th className="py-3.5 text-xl font-normal text-left">
//                                         Price per Unit
//                                     </th>
//                                     <th className="py-3.5 text-xl font-normal text-left">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {cart.map((item, index) => (
//                                     <tr key={item._id} className={`font-medium text-black text-xl ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}>
//                                         <td className="pl-3 text-lg font-bold">{index + 1}.</td>
//                                         <td>{item.name}</td>
//                                         <td>{item.company}</td>
//                                         {/* <td className="flex items-center justify-center gap-2">
//                                             <button onClick={() => handleDecrement(item)} className="px-2 py-1 bg-red-500 text-white rounded"><FaMinus /></button>
//                                             <span>{item.quantity}</span>
//                                             <button onClick={() => handleIncrement(item)} className="px-2 py-1 bg-green-500 text-white rounded"><FaPlus /></button>
//                                         </td> */}
//                                         <td>${item.price.toFixed(2)}</td>
//                                         <td className="flex py-1 gap-2">
//                                             <button
//                                                 onClick={() => handleDelete(item._id)}
//                                                 className="btn btn-outline btn-sm bg-sky-400 hover:bg-lime-500"
//                                             >
//                                                 <FaTrashAlt className="text-red-800 text-xl" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// </div>
// </div> */}