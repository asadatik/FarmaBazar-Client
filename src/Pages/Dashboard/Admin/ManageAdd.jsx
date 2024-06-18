import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";

const ManageAdd = () => {

    const axiosSecure = useAxiosSecure();
    const { data: advertisements = [], refetch } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => axiosSecure.get('/advert').then(res => res.data)
    });

    console.log(advertisements);

    // Handle the rejection of an advertisement
    const handleReject = async (id) => {
        try {
            // Update the advertisement status to 'Rejected'
            const status = { status: 'Rejected' };
            const res = await axiosSecure.patch(`/advert/${id}`, status);
            if (res.data.modifiedCount > 0) {
                // Refetch to update the list
                refetch();

                // Remove from slider 
                const deleteRes = await axiosSecure.delete(`/sliders/${id}`);
                if (deleteRes.data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rejected successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error("Error rejecting advertisement:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to reject advertisement.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    // Handle adding an advertisement to the slider
    const HandleDataAdd = async (advert) => {
        try {
         
            const status = { status: 'Running' };
            const res = await axiosSecure.patch(`/advert/${advert._id}`, status);
            if (res.data.modifiedCount > 0) {
              
                refetch();
                const sliderData = {
                    id: advert._id,
                    medicineName: advert.medicineName,
                    medicineImage: advert.image,
                    description: advert.description
                };
                const postRes = await axiosSecure.post('/slider', sliderData);
                if (postRes.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Added to slider successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error("Error adding to slider:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add to slider.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    // const axoisSecure = useAxiosSecure();
    // const { data: advertisements = [], refetch } = useQuery({
    //     queryKey: ['advertisement'],
    //     queryFn: async () => axoisSecure.get('/advert').then(res => res.data)
    // });

    // console.log(advertisements);

    // const handleReject = (id) => {
    //     const status = {
    //         status: 'Rejected'
    //     }
    //     axoisSecure.patch(`/advert/${id}`, status)
    //         .then(res => {
    //             if (res.data.modifiedCount > 0) {
    //                 refetch()
    //                 axoisSecure.delete(`/sliders/${id}`)
    //                     .then(res => {
    //                         console.log(res);
    //                         if (res.data.deletedCount > 0) {
    //                             Swal.fire({
    //                                 position: "top-end",
    //                                 icon: "success",
    //                                 title: "Rejected successfully.",
    //                                 showConfirmButton: false,
    //                                 timer: 1500
    //                             });
    //                         }
    //                     })
    //             }
    //         })
    // }

    // const HandleDataAdd = (i) => {
    //     const status = {
    //         status: 'Running'
    //     }
    //     const sliderData = {
    //         id: i._id,
    //         medicineName: i.medicineName,
    //         medicineImage: i.image,
    //         description: i.description
    //     }
    //     axoisSecure.patch(`/advert/${i._id}`, status)
    //         .then(res => {
    //             if (res.data.modifiedCount > 0) {
    //                 refetch()
    //                 axoisSecure.post('/slider', sliderData)
    //                     .then(res => {
    //                         if (res.data.insertedId) {
    //                             Swal.fire({
    //                                 position: "center",
    //                                 icon: "success",
    //                                 title: " slider Added ",
    //                                 showConfirmButton: false,
    //                                 timer: 1500
    //                             });
    //                         }
    //                     })

    //             }
    //         })
    // }

    return (
        <div>
            <Helmet>
                <title>Manage Banner Advertisements</title>
            </Helmet>

            <div>

                <section className='container p-6  my-10 bg-base-300   mx-auto pt-10'>
                    <div className='text-center'>

                        <div className=" md:flex justify-evenly ">


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
                                                        <span>Description</span>
                                                    </div>
                                                </th>


                                                <th
                                                    scope='col'
                                                    className='py-3.5  text-xl font-normal text-left rtl:text-right '
                                                >
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Seller Email</span>
                                                    </div>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className=' py-3.5 text-xl font-normal text-left rtl:text-right '
                                                >
                                                    <span>Status</span>
                                                </th>

                                                <th className=' py-3.5 text-xl font-normal text-left rtl:text-right '>
                                                    <span>  Action  </span>

                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                advertisements?.map((i, index) => (
                                                    <tr key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                                                        <td className='pl-3 text-lg font-bold  '>
                                                            {index + 1}.
                                                        </td>

                                                        <td className='' > {i.medicineName}</td>

                                                        <td className='' > {i.description}</td>
                                                        <td>  {i.sellerEmail}  </td>
                                                        <td>{i.status}

                                                        </td>

                                                        <td className="py-4 flex space-x-2">
                                                    {i.status === 'Running' ? (
                                                        <button
                                                            className="btn btn-outline btn-sm text-black bg-red-400 hover:bg-red-500"
                                                            onClick={() => handleReject(i._id)}
                                                        >
                                                            Reject
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn text-black btn-outline btn-sm bg-green-400 hover:bg-green-500"
                                                            onClick={() => HandleDataAdd(i)}
                                                        >
                                                            Add to Slider
                                                        </button>
                                                    )}
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

export default ManageAdd;