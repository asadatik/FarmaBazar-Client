import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const SellerHome = () => {

    const axoisSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);


    const { data: pay = [] ,isLoading } = useQuery({
        queryKey: ['payment' ,user?.email ],
        queryFn: async () => {
            const res = await axoisSecure.get(`/payment?email=${user.email}`);
            return res.data;
        },

        enabled: !!user?.email, 


    })


      console.log(pay)


      console.log(pay)


    const TotalPaid = pay.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.price, 0);
    const PayPanding = pay.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.price, 0);

    if (isLoading) {
        return <div className="text-center  mt-10 text-2xl font-nothing" >

            <span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </span>

        </div>;
    }




    return (
        <div>
            <Helmet>
                <title>Seller Home</title>
            </Helmet>

            <div className=""  >
                <header className="text-center border-b-cyan-600 border-b-2  ">
                    <h1 className="text-4xl font-cinzel uppercase  font-bold my-6">Seller Dashboard</h1>
                    <p className="text-xl  mb-8">
                    Welcome to your seller dashboard. Here, you can easily manage your products, monitor sales performance, and handle orders efficiently. Stay organized and keep track of your business operations with our user-friendly tools.
                    </p>
                </header>


                <h2 className='text-center lg:text-3xl font-bold my-5 py-2 bg-amber-500 text-black md:w-1/4 mx-auto'> Sales Revenue</h2>
                <div className='flex font-nothing justify-evenly '>
                    <p className='text-2xl'>Paid Total:  <span className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '    > $ {TotalPaid}</span> </p>
                    <p className='text-2xl'>Pending Total:  <span  className=' px-2 py-1 md:text-xl text-center font-extrabold text-white uppercase transition-colors duration-300 transform bg-gradient-to-r from-cyan-500 to-blue-500 rounded   '   >$  {PayPanding}</span>  </p>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;