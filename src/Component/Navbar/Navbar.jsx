import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../Hook/useCart/useCart";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
    const { user,LogOut } = useContext(AuthContext)
    const[theme,setTheme] = useState('light')  
     
    const [cart] = useCart();
console.log(cart);

    useEffect(()=>{
     localStorage.setItem('theme',theme)
     const localTheme = localStorage.getItem('theme')
     document.querySelector('html').setAttribute('data-theme' , localTheme)
    },[theme])  

       const handleToggole =(e)=> {
         if(e.target.checked){
           setTheme('dark')
         }
          else
          {setTheme('light') }
       }
    return (
        <div className="bg-blue-700 text-white "  >
              <div className="navbar  bg-gradient-to-t  from-neutral-800 ...  ]  mb-4 lg:px-20">
        <div className="navbar-start   ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5  text-white w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
            <a className="text-base  text-white " >  <NavLink   to="/">  Home </NavLink></a>
            <a className="text-base  text-white " >  <NavLink  to='/shop' > Shop </NavLink></a>
             <a className="text-base text-white  " >  <NavLink to="/cart">
                <button className="btn bg-violet-100 btn-sm ">
                        {/* <TiShoppingCart  className="mr-2 text-black text-xl  "><TiShoppingCart /> */}
                        <TiShoppingCart    className=" text-black text-xl  "     />
                        <div className="badge  badge-secondary">+{cart.length} </div>
                         </button>
                         </NavLink>
           </a>
           <a >  <div className="dropdown dropdown-bottom">
                     <div tabIndex={0} role="button" className="text-base text-white ">languages</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-52">
                 <li>
                    <h1>  English  </h1>
                  </li> 
                  <li>
                     <h1>  Bangla    </h1>
                  </li>
                </ul>
             </div>  </a> 

            </ul>
          </div>
         <div>
         <a className="  lg:text-3xl font-extrabold font-cinzel uppercase text-indigo-300  ">farma<span className="text-pink-400" >bazar</span> </a>
         </div>
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="menu menu-horizontal   lg:space-x-12 ">
           <a className="text-2xl text-white font-semibold " >  <NavLink   to="/">Home</NavLink></a>
           <a className="text-2xl text-white font-semibold " >  <NavLink to='/shop'  >Shop</NavLink></a>
          
            <a >  <div className="dropdown dropdown-bottom z-50  ">
                     <div tabIndex={0} role="button" className="text-2xl text-white font-semibold">languages</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-52">
              <li>
                    <h1>  English  </h1>
                  </li> 
                  <li>
                     <h1>  Bangla    </h1>
                  </li>
                </ul>
                                   </div>  </a>
           <a className="text-2xl text-white font-semibold " >  <NavLink to="/cart">
                <button className="btn bg-violet-100 btn-sm ">
                        {/* <TiShoppingCart  className="mr-2 text-black text-xl  "><TiShoppingCart /> */}
                        <TiShoppingCart    className=" text-black text-xl  "     />
                        <div className="badge  badge-secondary">+{cart.length} </div>
                         </button>
                         </NavLink>
           </a>
         

          </ul>
        </div>
        <div className="navbar-end space-x-2 lg:space-x-10  md:space-x-6   "> 
       <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" onChange={handleToggole}  className="theme-controller"  />
  
  {/* sun icon */}
  <svg className="swap-off text-white  fill-current W-6 h-6 lg:w-8 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-on text-white fill-current w-6 h-6 lg:w-8 lg:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
{user ? 
          <div className='dropdown  dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn  btn-sm md:btn-md btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='md:w-12  rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm text-2xl font-cinzel  dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52'
            >
              <li>
                    <h1>  Update Profile  </h1>
                  </li> 
                  <li>
                 <Link to='dash'   >    <h1>  Dashboard   </h1></Link>
                  </li>
                  <li className="">
                  <Link onClick={LogOut} className="  p-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white  flex justify-center  "  >Log Out</Link> 
                  </li>
            </ul>
          </div>  
           :  <div >
           <a className="lg:text-2xl text-white  md:font-semibold " >    <NavLink  to="/joinUs"> Joni Us   </NavLink></a>   
           </div>
        }
                 
                    
                    
                       </div>
                      </div>

        </div>
    );
};

export default Navbar;