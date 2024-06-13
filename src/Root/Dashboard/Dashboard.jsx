import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hook/useCart/useCart";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";




const Dashboard = () => {
    const [cart] = useCart();
    const {user} = useContext(AuthContext);
    console.log(user.email);




    const AxiosPublic = useAxiosPublic();
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/users');
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="text-center  mt-10 text-xl font-cinzel " >Loading users data...</div>;
    }

    if (error  ) {
        return <div   className="text-center  mt-10 text-xl font-cinzel " >Error loading users data: {error.message}</div>;
    }   

     
        
    const CurrentUser = users.find(u => u.email === user?.email)
    console.log(CurrentUser)
    const  userRole =   CurrentUser.role ;

             
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="md:w-64 min-h-screen bg-[#48bee6]">
                <ul className="menu text-[#333333] text-lg font-inter font-medium md:p-4">
              {/* admin  */}
                    { userRole==='admin' &&
                        <>
                            <li>
                                <NavLink to="/dash/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/users">
                                    <FaUsers></FaUsers>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/manageItem">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>

                        </>
                           }
                 {/*seller */}
                       { userRole==='seller' &&
                        <>
                            <li>
                                <NavLink to="/dash/userHome">
                                    <FaHome></FaHome>
                                    seller Home</NavLink>
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
              {/* user */}
                        {
                           userRole==='user' &&
                            <>
                                <li>
                                    <NavLink to="/dash/userHome">
                                        <FaHome></FaHome>
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

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>

                </ul>
            </div>
            {/* ////////////////////////////////////////////// */}
            <div className="flex-1  p-8">
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;