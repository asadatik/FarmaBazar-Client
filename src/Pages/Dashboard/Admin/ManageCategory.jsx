import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";

import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";




const ManageCategory = () => {
  const axiosPublic = useAxiosPublic();

  const [Categoryid, setId] = useState();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const navigate = useNavigate()

  const { data: category = [], isPending: loading, refetch } = useQuery({
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

  const handleDelete = user => {
    console.log(user)
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

        axiosPublic.delete(`/category/${user._id}`)
          .then(res => {
            console.log(res)
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Category has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }


  //ADD NEW CATEGORY 
  const handleAdd = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const image = form.image.value
    const itemCount = parseInt(form.item.value)
    const Data = {
      name, image, itemCount
    }

    const res = await axiosPublic.post('/category', Data);

    if (res.data.insertedId) {
      console.log('user added to the database');

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New Category Added  successfully.',
        showConfirmButton: false,
        timer: 2500
      });
      refetch();
    }
  }








  // Get One Category //

  const toHandle = (id) => {
    const Id = category.find(i => i._id === id)
    setId(Id)

  }
  // updated 
  const handleUpdate = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const image = form.image.value
    const itemCount = parseInt(form.item.value)
    const Data = {
      name, image, itemCount
    }

    ////////// data update in database 
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/category/${Categoryid._id}`, Data)
      console.log(data)
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated Successfully",
        showConfirmButton: false,
        timer: 2000
      });

      navigate("/dash")
    }

    catch (err) {
      console.log(err)
      toast.error('Something Wrong')
    }

  }




  return (
    <div>
              <Helmet>
                <title>Manege Category</title>
            </Helmet>

      <h1 className="lg:text-3xl font-bold  uppercase  lg:tracking-[.25em]  text-center md:w-2/4  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " > Manage Category </h1>




      <section className='container p-4  my-3 bg-base-300   mx-auto pt-12'>
        <div className=' text-center  '>
          <h2 className='text-2xl font-bold  font-nothing     '>
            Total categories : <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '  > {category.length} </span></h2>
          <div className="flex  justify-end "  >   <button onClick={() => setIsOpenAdd(true)} className=" md:text-lg font-medium bg-gradient-to-r from-sky-500 to-indigo-200  btn btn-sm  btn-outline text-black " >Add Category</button>      </div>
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
                        className='py-3.5 px-4 lg:text-xl lg:font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                        </div>
                      </th>

                      <th
                        scope='col'
                        className='py-3.5 lg:text-xl lg:font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center gap-x-1'>
                          <span>Image </span>
                        </div>
                      </th>

                      <th
                        scope='col'
                        className='py-3.5  lg:text-xl lg:font-normal text-left rtl:text-right '
                      >
                        <div className='flex items-center '>
                          <span>Category Name</span>
                        </div>
                      </th>



                      <th
                        scope='col'
                        className=' py-3.5 lg:text-xl lg:font-normal text-left rtl:text-right '
                      >
                        Number of Medicine
                      </th>
                      <th
                        scope='col'
                        className=' py-3.5  lg:text-xl lg:font-normal text-left rtl:text-right '
                      >
                        Action
                      </th>


                    </tr>
                  </thead>

                  <tbody>
                    {/* conditional */}
                    {
                      category?.map((i, index) => (
                        <tr key={i._id} className={`font-medium  text-black font-inter lg:text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                          <td className='pl-3 text-lg font-bold  '>
                            {index + 1}.
                          </td>


                          <td>   <img className="mask rounded-2xl w-12 h-12" src={i.image} alt="" />                </td>
                          <td className='' > {i.name}</td>
                          <td>  {i.itemCount}</td>
                          {/*    Updated  or dlt */}

                          <td className='lg:flex   gap-3 lg:py-2  ' >  <button onClick={() => { setIsOpen(true); toHandle(i._id); }} className='btn btn-sm btn-info  text-lg ' >Update</button>
                            <button onClick={() => handleDelete(i)} className='btn btn-sm btn-secondary  text-lg ' >delete</button>
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

      {/* Add Model  */}
      <div className="relative flex justify-center">

        {isOpenAdd && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4  pb-20  text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              {/* modal body  */}
              <div className="relative   inline-block px-4 pt-5 pb-4  overflow-hidden text-left align-bottom transition-all transform  rounded-lg shadow-xl rtl:text-right bg-gray-800 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <h2 className=' border-b-4 pb-2 lg:text-xl font-bold text-yellow-100 text-center'>
                  Add a New Category
                </h2>
                <form onSubmit={handleAdd} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white  ">Category Name</span>
                    </label>
                    <input type="text" name="name" className="input input-bordered" required />
                  </div>


                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white ">Image</span>
                    </label>
                    <input type="text" name="image" className="input input-bordered" required />

                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white ">Total Item</span>
                    </label>
                    <input type="number" name="item" className="input input-bordered" required />

                  </div>


                  <div className="form-control mt-4">
                    <button className="btn  md:text-lg font-medium bg-gradient-to-r from-sky-500 to-indigo-400  btn-sm  btn-outline text-black   ">Add</button>
                  </div>
                </form>

                <div className=" flex items-center justify-center ">


                  <div className="sm:flex  text-center  sm:items-center">
                    <button
                      onClick={() => setIsOpenAdd(false)}
                      className="w-full flex lg:px-4 text-xl bg-pink-300   font-semibold text-black"
                    >
                      <HiArrowLongLeft className="text-3xl font-bold   w-10 " />   Back
                    </button>


                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* updated  Model */}

      <div className="relative flex justify-center">

        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4  pb-20  text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              {/* modal body  */}
              <div className="relative   inline-block px-4 pt-5 pb-4  overflow-hidden text-left align-bottom transition-all transform  rounded-lg shadow-xl rtl:text-right bg-gray-800 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <h2 className=' border-b-4 pb-2 lg:text-xl font-bold text-yellow-100 text-center'>
                  Update <span className="text-emerald-400">{Categoryid.name}</span> Category
                </h2>
                <form onSubmit={handleUpdate} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white  ">Category Name</span>
                    </label>
                    <input type="text" name="name" defaultValue={Categoryid.name} className="input input-bordered" required />
                  </div>


                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white ">Image</span>
                    </label>
                    <input type="text" name="image" defaultValue={Categoryid.image} className="input input-bordered" required />

                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white ">Total Item</span>
                    </label>
                    <input type="number" name="item" defaultValue={Categoryid.itemCount} className="input input-bordered" required />

                  </div>


                  <div className="form-control mt-4">
                    <button className="btn btn-primary">Update</button>
                  </div>
                </form>

                <div className=" flex items-center justify-center ">


                  <div className="sm:flex  text-center  sm:items-center">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full flex lg:px-4  font-semibold tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    >
                      <HiArrowLongLeft className="text-2xl   w-10 " />Back
                    </button>


                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>



      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageCategory;