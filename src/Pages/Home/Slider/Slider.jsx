import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Slider = () => {
    const axoisPublic = useAxiosPublic();

    const { data: sliders = [] } = useQuery({
        queryKey: ['slider'],
        queryFn: async () => {
            const res = await axoisPublic.get('/slider');
            return res.data;
        }
    });
    console.log(sliders);
    return (


        <Swiper
            slidesPerView={1}
            spaceBetween={30}

            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}

            pagination={{
                clickable: true,

            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >


           { sliders.map( s =>  <SwiperSlide  key={s._id}   >
                      <img className="w-full h-[700px]" src={s.medicineImage} alt="" />
                    </SwiperSlide>
             )
            
           }

        </Swiper>

    );
};

export default Slider;