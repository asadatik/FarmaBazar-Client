import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/AxiosPublic/useAxiosPublic';


const Discount = () => {
    const axoisPublic = useAxiosPublic();

    const { data: discountProduct = [] } = useQuery({
        queryKey: ['discountProduct'],
        queryFn: async () => {
            const res = await axoisPublic.get('/offer');
            return res.data;
        }
    })
console.log(discountProduct)
    return (
        // <div className=''>
        //     <div>
        //         <h3 className='lg:text-3xl font-bold my-6  uppercase text-center    md:w-2/3  border-y-4  border-cyan-700  p-2 font-cinzel   mx-auto '>Discover Our Exciting Range of Discounted Products!</h3>
        //     </div>
        //     <Swiper
        //         slidesPerView={3}
        //         spaceBetween={30}
        //         freeMode={true}
        //         autoplay={{
        //             delay: 2500,
        //             disableOnInteraction: false,
        //         }}
        //         pagination={{
        //             clickable: true,
        //         }}
        //         modules={[FreeMode, Pagination]}
        //         className="mySwiper"
        //     >
        //         <div >
        //             {
        //                 discountProduct.map(pic => <SwiperSlide className='border-2 rounded-xl p-5' key={pic._id}>
        //                     <img className='w-96 h-96' src={pic.image} alt="" />
        //                     <h3 className="lg:text-3xl  font-normal  uppercase   ml-2  -mt-16 text-black">Salads</h3>
                        
        //                 </SwiperSlide>)
        //             }
        //         </div>
        //     </Swiper>
        // </div>

        <div>
        <div>
            <h3 className='lg:text-4xl font-extrabold my-8 uppercase text-center text-indigo-900 md:w-2/3 border-y-4 border-indigo-600 p-4 mx-auto tracking-wide'>
                Discover Our Exciting Range of Discounted Products!
            </h3>
        </div>
        <Swiper
            slidesPerView={3}
            spaceBetween={40}
            freeMode={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
            <div>
                {
                    discountProduct.map(product => (
                        <SwiperSlide className='border-4 border-x-fuchsia-400 rounded-xl shadow-lg p-5 transform transition-transform duration-500 hover:scale-105' key={product._id}>
                            <div className='relative'>
                                <img className='w-full h-64 object-cover rounded-xl' src={product.image} alt={product.name} />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl">
                                    <h3 className="text-xl font-semibold text-white">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </div>
        </Swiper>
    </div>
    );
};

export default Discount;