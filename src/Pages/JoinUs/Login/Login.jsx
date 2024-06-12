
import {  Link, useLocation, useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';


const Login = () => {
    const{ login,googleLogin } = useContext(AuthContext);
    const Location = useLocation();
         const Navigate =  useNavigate();

 // Email+Pass
    const handleSignIn=(e)=>{
      e.preventDefault()
      const from = new FormData(e.currentTarget);
      const email = from.get('email')  ;
      const password = from.get('password')  ; 
      console.log(email,password) 
      login(email,password)
      .then( Result=>{
            console.log(Result.user) 
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Login Successfully",
              showConfirmButton: false,
              timer: 2500
            });
    
       Navigate(  Location?.state ? Location.state : '/' )
    }     )
    .catch(error=>{
     console.error(error.message)  
      Swal.fire({
      icon: "error",
      title: "Oops...",
       text: "Something Wrong .Please try again!",
  
});          
    })

     


    }  
    
    // goggle
    const LoginWithGoogle=()=>{        
        googleLogin()
        .then(result =>  {
        console.log(result.user) 
       Navigate(  Location?.state ? Location.state : '/' )
        
     
        } )
        }
          


    return (
        <div className="flex items-center  lg:min-h-screen  rounded-b-3xl  "  style={{backgroundImage: 'url(https://i.ibb.co/7Nntrwf/user-typing-login-and-password-cyber-security-concept-1.jpg)'}}  > 
       
           
            <div className="lg:flex justify-center gap-10   ">
                      <div className='lg:w-2/5'>
                    <img src={`https://i.ibb.co/7Nntrwf/user-typing-login-and-password-cyber-security-concept-1.jpg`} alt="" />
                     </div>
                 <div>
                 <div className=' px-6 py-4 lg:w-[550px] h-full  bg-slate-100  md:px-8'>
                  
          <p className='mt-3 text-3xl font-bold uppercase text-center text-sky-600  '>
            Please Login Here!
          </p>

          <div
            onClick={LoginWithGoogle}
            className='flex cursor-pointer items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-300 hover:to-pink-300 ...'
          >
            <div className='px-4 py-2  '>
              <svg className='w-10 h-10' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>

            <span className='w-5/6 px-4 py-3 text-lg text-white font-bold text-center'>
              Sign in with Google
            </span>
          </div>
          <span className='w-1/5 border-b  md:w-1/4'></span>


          <form onSubmit={handleSignIn}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-xl font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                placeholder='enter your email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-xl font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                placeholder='password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-xl font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-xl text-center text-gray-400">Don`t have an account yet?<Link to='/signup' > <a  className="text-blue-500  focus:outline-none focus:underline hover:underline">Sign up</a></Link>.</p>
         
                     </div>


                 </div>           
            </div>
        </div>
    );
};

export default Login;


