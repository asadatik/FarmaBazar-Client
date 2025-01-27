
import { Link,  useLocation,  useNavigate,  useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { useContext, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { FcPlus } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCart from "../../../Hook/useCart/useCart";
import axios from "axios";

const MedicineDtls = () => {
  // const data = useLoaderData()

  const axiosPublic = useAxiosPublic();
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();

  const { data: categories = [], isPending: loading } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await axiosPublic.get('/allmedi');
      return res.data;
    }
  })


  // Get One Medicine

  const toHandle = (id) => {
    // console.log(id) 

    const Id = Category.find(i => i._id === id)

    setId(Id)

  }

  const handleAddToCart = (id) => {
    const Id = categories.find(i => i._id === id)
    if (user && user.email) {
      // send cart item to the database
      const cartItem = {
        menuId: Id._id,
        email: user.email,
        name: Id.name,
        company: Id.company,
        quantity: Id.quantity,
        price: Id.price,
        image: Id.image,
        sellerEmail : Id.sellerEmail ? Id.sellerEmail : 'no found' 
          
      }
      console.log(cartItem)
      axios.post(`${import.meta.env.VITE_API_URL}/carts`, cartItem)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${Id.name} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update the cart items count
            refetch()
          }

        })
    }
    else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/joinUs", { state: { from: location } });
        }
      });
    }
  }



  // LOADING GIF
  if (loading) {
    return <div className=" my-24 flex justify-center    "  >

      <img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />
    </div>

  }


  const Category = categories.filter(item => item.category === params.name);
  console.log(Category)
  // { name,company,price per unit}  



  return (

    <div>

      {

       Category.length === 0?  <div className=" text-center my-10  " >    <p className=" text-3xl font-semibold font-cinzel text-rose-600 " >    No Medicine available now...     </p> 
                              <Link to='/'  >   <button className="btn btn-sm mt-4 btn-secondary  text-black" >   Explore Others Category  </button>     </Link>
                                  </div>
                                                                                            
       :
      <div>
        <h1 className="text-3xl font-bold  text-center w-2/3  border-y-4  border-cyan-700  p-4 font-cinzel   mx-auto    " >All medicines Of  :  <span className="uppercase md:ml-2 font-extrabold text-blue-600 md:tracking-[.35em]" > {params.name}</span>. </h1>

        {/*  */}

        <section className='container p-4  my-10 bg-base-300   mx-auto pt-12'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold  font-nothing     '>
              Total Medicine  : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {Category.length} </span></h2>

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
                        Category?.map((i, index) => (
                          <tr key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                            <td className='pl-2 text-lg font-bold  '>
                              {index + 1}.
                            </td>

                            <td className='' > {i.name}</td>
                            <td>  {i.company}</td>
                            <td>  {i.price}  </td>


                            <td className="flex py-2 gap-4  "  >
                              <button onClick={() => handleAddToCart(i._id)} className='btn btn-sm   btn-outline  border-0 bg-slate-100 border-b-4 border-orange-400  text-lg   text-black ' >select   </button>

                              <button onClick={() => { setIsOpen(true); toHandle(i._id); }} className='btn btn-sm rounded-full   text-xl bg-violet-400   text-black ' > <FaEye className="text-xl" /> </button>

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

        {/* modal */}
        <div className="relative flex justify-center">

          {isOpen && (
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                {/* modal body  */}
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <img className="rounded-2xl    " src={id.image} alt="" />

                    <div className="mt-2 ">
                      <h3
                        className="text-xl font-semibold font-cinzel flex gap-2 leading-6 text-gray-800 capitalize dark:text-white"
                        id="modal-title"
                      >
                        <span className="text-2xl"  ><FcPlus />  </span>      {id.name}
                      </h3>
                      <p className=" text-lg text-gray-500 dark:text-gray-400">
                        Category  :  <span className="font-medium  text-green-300  font-nothing"  > {id.category} </span>.
                      </p>

                      <p className=" text-lg text-gray-500 dark:text-gray-400">
                        Company :  <span className="font-medium  text-green-300 font-nothing   "  > {id.company} </span>.
                      </p>
                      <p className=" text-lg text-gray-500 dark:text-gray-400">
                        Price per unit :  <span className="font-medium  text-green-300 font-nothing   "  >${id.price} </span>.
                      </p>
                      <p className=" text-lg text-gray-500 dark:text-gray-400">
                        Quantity  :<span className="font-medium  text-green-300 font-nothing   "  >  {id.quantity} </span>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center ">


                    <div className="sm:flex  text-center  sm:items-center">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full flex lg:px-4 py-1 mt-2 font-semibold tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        <HiArrowLongLeft className="text-2xl   w-10 " />  back
                      </button>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
       }
    </div>
  );
};

export default MedicineDtls;


