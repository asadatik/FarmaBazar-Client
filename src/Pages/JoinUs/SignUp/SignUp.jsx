

import { Link ,useNavigate,useLocation} from "react-router-dom";

import { useContext, useState } from "react";


import { MdOutlineError } from "react-icons/md";
import Swal from 'sweetalert2'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";

const SignUp = () => {

  const axiosPublic = useAxiosPublic();
         

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
           

    const [Error,setError] = useState('')
    const [ showPass , SetShowPass       ]     = useState(false)
    // const axiosPublic = useAxiosPublic();
        

const{ Creatuser , updatedUserProfile} = useContext(AuthContext);

const Location = useLocation();

console.log("Location in the register page",Location);

const Navigate =  useNavigate(); 

const HandleLogin = (e)=>{
    e.preventDefault()
    const from = new FormData(e.currentTarget);
           console.log(from)
      const Name =  (from.get('name'));
      const Photo =  (from.get('photo'));
      const email  =  (from.get('email'));
      const  password =  (from.get('password'))
      const role = (from.get('role'))

      console.log(Photo); 
         //  reset error 
         setError('')
          
      if(password.length<6){
        setError('Password should be at least 6 characters.')
                return;
            }
          else if ( !/[A-Z]/.test(password) ){
            toast.error("Password should be an Uppercase Letter!")
           return;
          }
          else if(  !/[a-z]/.test(password ) ){
            toast.error("Password should be an Lowercase Letter!!")
            return 
          }
    /////////// create User //////////////////
           Creatuser(email,password,Name,Photo) 
          
           .then( Result=>  {

   // user info //
            const userInfo = {
              name: Name,
              email:email
          }
        //   axiosPublic.post('/users', userInfo)
        //   .then(Result => {
           
        //         Swal.fire({
        //             position: 'top-end',
        //             icon: 'success',
        //             title: 'User created successfully.',
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //         Navigate('/');
        //         console.log(Result.user)
            
        // })

            updatedUserProfile(Name,Photo)
           
            Navigate(  Location?.state ? Location.state :'/' ) 
              console.log(Result.user) 
           }     )
            
    
    
           .catch((error)=>{
               setError(error.message)
            Swal.fire({
              icon: "error",
              title: "Oops...",
               text:"Something Wrong! please try again" ,
           })
    }   )

}


    return (
          <div className="mt-10    hero  " >

             
             
              <div  className=" my-10  lg:flex  " >


              <div className="   md:mt-10 "     >
                   <img src="https://i.ibb.co/hYd59np/sign-up-concept-illustration-114360-7895-1.jpg" alt="" className="rounded-l-xl" />    
              </div>
               <div className="mx-auto rounded-r-xl  px-2 py-2  lg:w-[700px]  md:px-8 mt-8  bg-base-200  ">
       <h1 className="lg:text-4xl font-bold text-center  border-b-4 border-y-indigo-600 pb-1 "  >  Create A  Account</h1> 
            <form onSubmit={HandleLogin} className="card-body">
            <div className="form-control">
        <label className="label">
        <span className="label-text font-medium ">  Username</span>
      </label>
      <input type="text"  placeholder="Your Name"  name="name" className="input input-bordered" required />
    </div>
   
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium ">   Email</span>
      </label>
      <input type="email" placeholder="Enter Your email"  name="email" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium ">Password</span>
      </label>
          
        <div className="relative  "  > 
          <input 
          type= {showPass ? 'text' :   "password" }  
            placeholder="password" 
             name="password" 
              className="input w-full input-bordered" required/>
           <span className="absolute top-4 right-4  " onClick={() =>SetShowPass (!showPass )}> 
            { showPass ?<FaEyeSlash className="w-14" />  :       <FaEye className="w-12" />    }
           </span>
          </div> 
      
    </div>
{/* IMAGE UPLOAD     */}
    <div className="form-control w-full ">
    <label className="label">
        <span className="label-text font-medium ">Upload Your Photo</span>
      </label>
                        <input required  name="photo"    type="file" className="file-input w-full" />
                    </div>

{/* role */}
<div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium   ">Select Role</span>
                            </label>
                            <select name="role" 
                                className="select  select-bordered w-full">
                                  
                                  <option value="user">User</option>
                                  <option value="seller">Seller</option>
                            </select>
                        </div>

    {  Error && <p className=" text-xl lg:ml-10 flex gap-1 text-red-600 " ><MdOutlineError  className="text-2xl"/>{Error}</p>     }
    <div className="form-control ">
      <button className="btn text-2xl font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500">Register</button>       
    </div>
  </form>
      <h1 className="text-center text-xl  "  >Already have an Account ? < Link to='/joinUs' className=" font-bold text-green-700 text-2xl  " >Login</Link></h1>
               </div>


              </div>
   
           <ToastContainer />
           </div>
    );
};

export default SignUp;