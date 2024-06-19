import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";


const ManagePayment = () => {


    const axiosSecure = useAxiosSecure();
    
  
    const {data: payment = [], refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => axiosSecure.get('/allpayment').then(res => res.data)
    });

 console.log(payment)

    const HandlePaid = (id) => {
        console.log(id)
        axiosSecure.patch(`/payment/${id}`)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Payment accepted!",
                        showConfirmButton: false,
                        timer: 2500
                      });
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Payment Management</title>
            </Helmet>
            <div>


            </div>
           
           <section className='container p-6  my-10 bg-base-300   mx-auto pt-10'>
                    <div className='text-center'>

                    <h1 className="lg:text-3xl font-bold  uppercase  lg:tracking-[.25em]  text-center md:w-2/4  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto    " > All Payment  Management</h1>
                       
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
                                                        <span>Customer  Email</span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='py-3.5  text-xl font-normal text-left rtl:text-right '
                                                >

                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Total Cost</span>
                                                    </div>
                                                </th>


                                                <th
                                                    scope='col'
                                                    className='py-3.5  text-xl font-normal text-left rtl:text-right '
                                                >

                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Transaction ID</span>
                                                    </div>
                                                </th>


                                                <th
                                                    scope='col'
                                                    className='py-3.5  text-xl font-normal text-left rtl:text-right '
                                                >
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Status</span>
                                                    </div>
                                                </th>
                                            

                                                <th className=' py-3.5 text-xl font-normal text-left rtl:text-right '>
                                                    <span>  Change Status  </span>

                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                              payment?.map((i, index) => (
                                                    <tr key={i._id} className={`font-medium  text-black font-inter text-xl  ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}  >
                                                        <td className='pl-3 text-lg font-bold  '>
                                                            {index + 1}.
                                                        </td>
                                                        
                                                        <td className='' > {i.email}</td>
                                                        <td>  {i.price}    </td>
                                                        <td className='' > {i.transactionId}</td>
                                                        <td>  {i.status}  </td>
                                                   

                                                
                                                         <td>
                                                            {i.status == 'Pending' ? <button onClick={() => HandlePaid(i._id)} className="btn my-1 btn-sm btn-secondary text-black text-lg">Paid</button> : ''}</td>
                                                    
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

export default ManagePayment;