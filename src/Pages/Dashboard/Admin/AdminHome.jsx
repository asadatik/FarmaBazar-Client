import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";


const AdminHome = () => {
    const axoisSecure = useAxiosSecure();

    // const { data: AllPay = [] } = useQuery({
    //     queryKey: ['all-payments'],
    //     queryFn: async () => axoisSecure.get('/all-payments').then(res => res.data)
    // })

    const { data: AllPay = [] } = useQuery({
        queryKey: ['allPayment'],
        queryFn: async () => {
            const res = await axoisSecure.get('/allPayment');
            return res.data;
        }
    })

    const TotalPaid = AllPay.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.price, 0);
    const PayPanding = AllPay.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.price, 0);

    
    return (
        <div>
            <Helmet>
                <title>Admin Home</title>
            </Helmet>

            <div className=""  >
                <header className="text-center border-b-cyan-600 border-b-2  ">
                    <h1 className="text-4xl font-cinzel uppercase  font-bold my-6">Admin Dashboard</h1>
                    <p className="text-xl  mb-8">
                        Welcome to your admin dashboard. Here, you can monitor the financial health of your business, track total sales revenue, and manage pending payments. Stay on top of your finances and ensure smooth operations with real-time insights.
                    </p>
                </header> 


                <h2 className='text-center md:text-3xl font-bold my-5 bg-amber-500 text-black md:w-1/4 mx-auto'> Sales Revenue</h2>
                <div className='md:flex space-y-4 md:space-y-0 font-nothing justify-evenly '>
                    <p className='md:text-2xl '>Paid Total:  <span className=' md:px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '    > $ {TotalPaid}</span> </p>
                    <p className='md:text-2xl '>Pending Total:  <span  className=' md:px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '   >$  {PayPanding}</span>  </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;