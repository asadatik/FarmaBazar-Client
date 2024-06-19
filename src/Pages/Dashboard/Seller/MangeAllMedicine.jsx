
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useContext } from "react";


const MangeAllMedicine = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
  
console.log(user.email)
    const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {

        if (!data.discountPercentage) {
            data.discountPercentage = 0;
        }

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const medicine = {
            sellerEmail: user?.email,
            image: res.data.data.display_url,
            description: data.description,
            price: parseFloat(data.price),
            company: data.company,
            genericName: data.genericName,
            name: data.name,
            category: data.select,
            quantity:data.quantity
        }

        if (res.data.success) {
            axiosSecure.post('/allMedicine', medicine)
                .then(res => {
                    if (res.data.insertedId) {
                        reset()
                        refetch()
                        Swal.fire({
                            position: "top-right",
                            icon: "success",
                            title: "Medicine added successfully.",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }

                })
        }
    }

    const { data: allMedicine = [], refetch } = useQuery({
        queryKey: ['allMedicine', user?.email],
        queryFn: async () => {
            const res = await  axiosSecure.get(`/allMedicines/${user?.email}`);
            return res.data;} 
    });


    return (
        <div>
            <Helmet>
                <title> Manage Medicine </title>
            </Helmet>

            <h1 className="lg:text-3xl font-bold  uppercase  lg:tracking-[.25em]  text-center md:w-2/4  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " >  Medicine Management </h1>
                <div className="flex justify-end my-4   ">      <button className="btn text-lg font-semibold  text-black  btn-secondary  " onClick={() => document.getElementById('modal').showModal()}>Add Medicine</button>  </div>
                   
            <dialog id="modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-cyan-400  ">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-black border-b-2 border-black text-center">Add A new Medicine</h3>
                    </div>

                    {/* form  */}
                    <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="name" className="block text-black">Name</label>
                                <input type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('name', { required: true })} />
                                {errors.name && <span>{errors.name.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="genericName" className="block text-black">Generic Name</label>
                                <input type="text" name="genericName" id="genericName" placeholder="Generic Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('genericName', { required: true })} />
                                {errors.genericName && <span>{errors.genericName.message}</span>}
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="description" className="block text-black">Discount Percentage</label>
                                <input type="number" name="discountPercentage" id="discountPercentage" placeholder="Discount Percentage" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('discountPercentage')} />
                                {errors.discountPercentage && <span>{errors.discountPercentage.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="description" className="block text-black">Category Selection</label>
                                <select
                                    className="select select-bordered w-full"
                                    {...register('select', { required: 'This field is required' })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Category Selection</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Supplement">Supplement</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Ointment">Ointment</option>
                                    <option value="Herbal Remedies">Herbal Remedies</option>
                                    <option value="Medical Devices">Medical Devices</option>
                                    <option value="Personal Care">Personal Care</option>

                                </select>
                                {errors.select && <span>{errors.select.message}</span>}
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="company" className="block text-black">Company</label>
                                <input type="text" name="company" id="company" placeholder="Company" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('company', { required: true })} />
                                {errors.company && <span>{errors.company.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="price" className="block text-black">Price</label>
                                <input type="number" name="price" id="price" placeholder="Price" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('price', { required: true })} />
                                {errors.price && <span>{errors.price.message}</span>}
                            </div>
                        </div>
                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="description" className="block text-black">Description</label>
                            <input type="text" name="description" id="description" placeholder="Description" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('description', { required: true })} />
                            {errors.description && <span>{errors.description.message}</span>}
                        </div>

                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="quantity" className="block dark:text-gray-600">quantity</label>
                            <input type="text" name="quantity" id="quantity" placeholder="quantity" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('quantity', { required: true })} />
                            {errors.quantity && <span>{errors.quantity.message}</span>}
                        </div>


                        <div className="space-y-1 text-sm">
                            <input type="file" className="file-input  w-full" {...register('image', { required: true })} />
                            {errors.image && <span>{errors.image.message}</span>}
                        </div>

                        <button className="block w-full p-3 text-center rounded-md font-bold text-lg btn-secondary btn ">Add Medicine</button>
                    </form>


                    <div className="modal-action">
                        <form method="dialog">

                            <button

                                className="w-full flex lg:px-4 text-xl bg-pink-300   font-semibold text-black"
                            >
                                <HiArrowLongLeft className="text-3xl font-bold   w-10 " />   Back
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
           <div>

           <section className='container p-4  my-10 bg-base-300   mx-auto pt-12'>
            <div className='text-center'>
          <h2 className='text-2xl font-bold  font-nothing     '> 
        Your Added Medicine  : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {allMedicine?.length}  </span></h2>
  
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
                          <span>Category</span>
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
                        <span>Quantity</span>
                      </th>
                      
  
                      </tr>
                  </thead>
                     
                  <tbody>
                
                 {
                  allMedicine?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>
                      
                   
                       <td>  {i.name}</td>
                        <td> {i.category}  </td>
                        <td>  {i.company} </td>
                        <td> {i.quantity}  </td>   

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

export default MangeAllMedicine;