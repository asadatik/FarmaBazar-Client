import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hook/useCart/useCart";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/AxioSecure/useAxiosSecure";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { PiFlagBannerFoldBold } from "react-icons/pi";




const Dashboard = () => {
    const [cart] = useCart();
    const { user } = useContext(AuthContext);
    console.log(user.email);



    const AxiosSecure = useAxiosSecure();
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosSecure.get('/users');
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="text-center  mt-10 text-xl font-cinzel " >Loading users data

            <span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </span>

        </div>;
    }

    if (error) {
        return <div className="text-center  mt-10 text-xl font-cinzel " >Error loading users data: {error.message}</div>;
    }



    const CurrentUser = users.find(u => u.email === user?.email)
    console.log(CurrentUser)
    const userRole = CurrentUser?.role;


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="md:w-72 min-h-screen bg-[#48bee6]">
                <ul className="menu text-[#333333] text-lg font-inter font-medium md:p-4">
                    {/* admin  */}
                    {userRole === 'admin' &&
                        <>
                          
                          <li>
                                <NavLink to="/dash/adminHome">
                                  
                                    Admin Home</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/users">
                                    <FaUsers></FaUsers>
                                    Manage Users</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/manageCategory">
                                    <FaList></FaList>
                                    Manage Category</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/payManage">
                                    <FaBook></FaBook>
                                    Manage Payment</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/manageBanner">
                                    <PiFlagBannerFoldBold className="text-2xl" />Manage Banner Advertisements
                                </NavLink>
                            </li>


                        </>
                    }
                    {/*seller */}
                    {userRole === 'seller' &&
                        <>
                         <li>
                                <NavLink to="/dash/sellerHome">
                          Seller Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/manageMedi">
                                    <TbMedicineSyrup className="text-xl" />Manage medicines
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/seller-payment-history">
                                    <MdPayment className="text-xl" />Payment history
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/askforAdd">
                                    <RiAdvertisementLine className="text-xl" />Ask for Advertisement
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* user */}
                    {
                        userRole === 'user' &&
                        <>
                            <li>
                                <NavLink to="/dash/userHome">
                                    
                                    User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/payment">
                                    <FaCalendar></FaCalendar>
                                    Reservation</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/cart">
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart ({cart.length})</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/review">
                                    <FaAd></FaAd>
                                    Add a Review</NavLink>
                            </li>
                            <li>-
                                <NavLink to="/dash/bookings">
                                    <FaList></FaList>
                                    My Bookings</NavLink>
                            </li>
                        </>

                    }

                    <div className="  "></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home Page </NavLink>
                    </li>

                </ul>
            </div>
            {/* ////////////////////////////////////////////// */}
            <div className="flex-1  p-8">
               

          


                <div className="my-10" >  <Outlet></Outlet>  </div>

            </div>
        </div>
    );
};

export default Dashboard;