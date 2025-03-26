import logo from '../../../public/pexels-cottonbro-5722883.jpg'



const PharmaBazarFooter = () => {
  return (
    <footer className="bg-[#1b85db]  py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding and Logo */}
          <div className="sm:col-span-2">
            <div className='lg:flex  gap-4'  >
              
              <h1>
              <a className=" text-3xl  font-bold text-white"><span className='font-nothing text-amber-100 uppercase'>F</span>arma<span className="font-nothing text-amber-100 uppercase">b</span>azar</a>


              </h1>   
            </div>
            <p className="text-gray-200">
              Your trusted partner for all your pharmaceutical needs. Quality products, exceptional service.
            </p>
          </div>     
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><a  className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a className="hover:text-blue-300 transition-colors">Products</a></li>
              <li><a  className="hover:text-blue-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Support and Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Customer Support</h3>
            <ul className="space-y-2">
              <li><a  className="hover:text-blue-300 transition-colors">FAQs</a></li>
              <li><a className="hover:text-blue-300 transition-colors">Support Center</a></li>
              <li><a  className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
              <li><a  className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <div className="flex flex-col lg:flex-row items-center justify-between">
          <p className="text-gray-300 mb-4 lg:mb-0">&copy; 2024 ParmaBazar. All rights reserved.</p>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/PharmaBazar" aria-label="Facebook" className="text-gray-300 hover:text-blue-300 transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.497v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.791 4.657-4.791 1.325 0 2.465.099 2.795.142v3.242l-1.917.001c-1.505 0-1.796.715-1.796 1.763v2.315h3.587l-.467 3.622h-3.12v9.294h6.116c.732 0 1.325-.591 1.325-1.324v-21.351c0-.733-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a  aria-label="Twitter" className="text-gray-300 hover:text-blue-300 transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.39-1.832.654-2.828.774 1.017-.608 1.798-1.569 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.955-2.175-1.55-3.593-1.55-2.717 0-4.917 2.201-4.917 4.917 0 .386.044.762.128 1.124-4.083-.205-7.702-2.162-10.125-5.136-.423.726-.666 1.569-.666 2.468 0 1.704.869 3.207 2.188 4.092-.807-.026-1.566-.248-2.228-.617v.062c0 2.382 1.693 4.373 3.946 4.825-.412.111-.847.171-1.296.171-.316 0-.624-.03-.924-.086.625 1.951 2.443 3.372 4.597 3.413-1.68 1.317-3.808 2.102-6.115 2.102-.398 0-.79-.023-1.175-.068 2.179 1.396 4.768 2.211 7.548 2.211 9.054 0 14.002-7.498 14.002-13.986 0-.213-.004-.426-.014-.637.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a  aria-label="Instagram" className="text-gray-300 hover:text-blue-300 transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.308.976.975 1.246 2.243 1.309 3.609.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.976-2.242 1.246-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.976-.975-1.246-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.976 2.242-1.246 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.67.014-4.947.073-1.365.062-2.606.351-3.677 1.423-1.071 1.071-1.36 2.311-1.423 3.676-.059 1.276-.073 1.688-.073 4.947s.014 3.671.073 4.947c.062 1.365.351 2.606 1.423 3.677 1.071 1.071 2.311 1.36 3.676 1.423 1.276.059 1.688.073 4.947.073s3.671-.014 4.947-.073c1.365-.062 2.606-.351 3.677-1.423 1.071-1.071 1.36-2.311 1.423-3.676.059-1.276.073-1.688.073-4.947s-.014-3.671-.073-4.947c-.062-1.365-.351-2.606-1.423-3.677-1.071-1.071-2.311-1.36-3.676-1.423-1.276-.059-1.688-.073-4.947-.073z" />
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.149c-2.196 0-3.987-1.791-3.987-3.987s1.791-3.987 3.987-3.987 3.987 1.791 3.987 3.987-1.791 3.987-3.987 3.987zm6.406-11.845c-.796 0-1.44.644-1.44 1.44s.644 1.44 1.44 1.44 1.44-.644 1.44-1.44-.644-1.44-1.44-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PharmaBazarFooter;
