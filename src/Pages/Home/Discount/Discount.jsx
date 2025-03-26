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
      
        <div>
        <div>
            <h3 className='lg:text-3xl font-bold my-6  uppercase text-center lg:tracking-[.25em]   w-3/5  border-y-4 border-blue-500  md:p-2 font-cinzel   mx-auto '>
               Our  Discounted Products!
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
                        <SwiperSlide className='border-2 border-gray-400 bg-gradient-to-r from-violet-200 to-[#1b85db] rounded-xl shadow-lg md:p-5 transform transition-transform duration-500 hover:scale-105' key={product._id}>
                            <div className='relative'>
                                <img className='w-full h-64 object-cover rounded-xl' src={product.image} alt={product.name} />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl">
                                    <h3 className="md:text-xl font-nothing md:font-semibold text-white">
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