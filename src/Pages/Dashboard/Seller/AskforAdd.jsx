
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { HiArrowLongLeft } from "react-icons/hi2";

const AskforAdd = () => {

    const { user } = useContext(AuthContext);
    const axoisSecure = useAxiosSecure();
    const axoisPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axoisPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const image = res.data.data.display_url;
        data.image = image;
        const info = {
            medicineName: data.medicineName,
            description: data.description,
            image: image,
            status: 'Request',
            sellerEmail: user?.email
        }
        if (res.data.success) {
            refetch()
            axoisSecure.post('/advert', info)
                .then(res => {
                    refetch()
                    console.log(res);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Send your advertisement request.",
                        showConfirmButton: false,
                        timer: 2500
                    });
                })
        }

    };

    const { data: advertisement = [], refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => axoisSecure.get(`/advertisement?email=${user.email}`).then(res => res.data)
    })

    console.log(advertisement);

    return (
        <div>
            <Helmet>
                <title>Ask for Advertisement</title>
            </Helmet>
            <h1 className="lg:text-3xl font-bold  uppercase  lg:tracking-[.25em]  text-center  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " >     Manage Your Advertisement Slide      </h1>
            <div>
                <div className="flex justify-end my-4   ">      <button className="btn text-lg font-semibold  text-black  btn-secondary  " onClick={() => document.getElementById('modal').showModal()}>Add Advertise</button>  </div>
                <dialog id="modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box  bg-cyan-400  ">
                        <div className="mb-4">
                            <h3 className="font-bold text-lg text-black border-b-2 border-black text-center">Highlight Your Medicines</h3>
                        </div>

                        <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                          
                            <div className="space-y-1 text-sm">
                                <label htmlFor="medicineName" className="block text-black">Name Of Medicine  </label>
                                <input type="text" name="medicineName" id="medicineName" placeholder="Medicine Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 text-black dark:text-gray-800 focus:dark:border-violet-600" {...register('medicineName', { required: true })} />
                                {errors.medicineName && <span>{errors.medicineName.message}</span>}
                            </div>

                            <div className="space-y-1 text-sm">
                                <label htmlFor="description" className="block text-black">Description</label>
                                <input type="text" name="description" id="description" placeholder="Description" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 text-black dark:text-gray-800 focus:dark:border-violet-600" {...register('description', { required: true })} />
                                {errors.description && <span>{errors.description.message}</span>}
                            </div>

                            <div className="space-y-1 text-sm">
                                <input type="file" className="file-input w-full text-black" {...register('image', { required: true })} />
                                {errors.image && <span>{errors.image.message}</span>}
                            </div>
                            <div>
                                <button className="block w-full text-black text-center rounded-md font-bold  bg-gradient-to-r from-sky-500 to-indigo-200   btn-outline   btn">Add Advertise</button>
                            </div>
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
            </div>
            <div className="mt-6">
            <section className='container p-4  my-10 bg-base-300   mx-auto pt-12'>
            <div className='text-center'>
          <h2 className='text-2xl font-bold  font-nothing     '> 
          Total Medicine  : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > </span></h2>
  
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
                          <span>Image</span>
                        </div>
                      </th>
                      <th
                        scope='col'
                        className='py-3.5  text-xl font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-3'>
                          <span>Medicine  Name</span>
                        </div>
                      </th>  
                      <th
                        scope='col'
                        className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                      >
                        <span>Status</span>
                      </th>
                    
  
                      
  
                      </tr>
                  </thead>
                     
                  <tbody>
                
                 {
                  advertisement?.map((i,index)  => (    
                         <tr   key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>
                      
                      <td className='' > <img className="lg:w-20 rounded-xl my-1 h-12"  src={i.image} alt="" /></td>  
                       <td>  {i.medicineName}</td>
                       <td className='' > {i.status}</td> 
                  
                                    
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

export default AskforAdd;