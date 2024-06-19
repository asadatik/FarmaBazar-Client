import { useQuery } from '@tanstack/react-query';
import logo from '../../../public/pexels-padrinan-806427.jpg';


import { useContext, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/AxioSecure/useAxiosSecure';
import useCart from '../../Hook/useCart/useCart';

const Invoice = () => {
    const { user } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure(); 
    const printAreaRef = useRef(null); 

    // Fetch user data using react-query
    const { data: userDetails = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/${user.email}`);
            return response.data;
        }
    });

    const [cartItems, refreshCart] = useCart(); // Retrieve cart data

    // Function to handle printing the invoice
    const handlePrintInvoice = () => {
        axiosSecure.delete(`/carts/${user.email}`)
            .then(response => {
                if (response.data.deletedCount > 0) {
                    refreshCart(); // Refresh cart data
                    const printContent = printAreaRef.current.innerHTML;
                    const originalContent = document.body.innerHTML;
                    document.body.innerHTML = printContent;
                    window.print();
                    document.body.innerHTML = originalContent;
                }
            });
    };

    // Calculate total price of items in the cart
    const computeTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    // Loading indicator for user data fetch
    if (userLoading) {
        return <div className="flex justify-center items-center my-20">
          <span className="loading loading-dots loading-md"></span>
          <span className="loading loading-dots loading-lg"></span>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-gray-100 shadow-lg">
            <Helmet>
                <title>Invoice\Page</title>
            </Helmet>
            <div className='border-2 p-4' ref={printAreaRef}>
                <header className="text-center mb-8">
                    <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" />
                    <h1 className="text-3xl border-b-4 w-1/2 mx-auto border-y-cyan-600 font-bold">Invoice</h1>
                </header>
                <section className="mb-8 text-lg font-semibold font-cinzel border-4 lg:w-1/2 lg:p-4 mx-auto border-violet-400 text-center  ">
                   
                    <p className="mb-2   "><strong> Customer   Name:</strong> {userDetails?.name}</p>
                    <p    ><strong> Customer   Email:</strong> {userDetails?.email} </p>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl  text-center font-nothing font-bold mb-4">Order Summary</h2>
                
                    <table className="min-w-full  bg-sky-300 text-black border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Medicine Name</th>
                                <th className="py-2 px-4 border">Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length > 0 ? (
                                cartItems.map((i) => (
                                    <tr key={i._id}>
                                        <td className="py-2 px-4 border">{i.name}</td>
                                        <td className="py-2 px-4 border">${i.price.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-2 px-4 border" colSpan="2">Your cart is empty</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
                {cartItems.length > 0 && (
                    <div className="text-right mt-4">
                        <h3 className="text-xl font-semibold">Total Amount: ${computeTotalPrice()}</h3>
                    </div>
                )}
            </div>
          <div  className='flex justify-end mt-4'  >
          <button
                onClick={handlePrintInvoice}
                className=" btn   bg-gradient-to-r from-violet-500 to-fuchsia-500  text-white text-lg"
            >
                Print Invoice
            </button>


          </div>
        </div>
    );
};

export default Invoice;
