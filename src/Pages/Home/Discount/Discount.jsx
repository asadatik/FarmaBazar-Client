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
      <h2 className="text-xl  md:text-3xl font-extrabold  uppercase  font-cinzel lg:text-3xl text-center">🚨 Our Discounted Products! 🎉 </h2>
                    <div className=" mb-3 text-center">
                        <span className="inline-block  md:w-44 h-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block md:w-32 w-20 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-10 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-6 h-1 ml-1 bg-blue-500 rounded-full"></span>

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
                        <SwiperSlide className='border-2 border-gray-400 bg-gradient-to-t from-blue-200 to-[#127dd4] rounded-xl shadow-lg md:p-5 transform transition-transform duration-500 hover:scale-105' key={product._id}>
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