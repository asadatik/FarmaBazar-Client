


import AOS from 'aos';
import 'aos/dist/aos.css';




const HelthTips = () => {




    const healthTips = [
        {
            title: '5 Ways to Boost Your Immunity',
            content: 'Learn how to strengthen your immune system with these simple and effective tips.',
            image: 'https://i.ibb.co/8sHtb00/pexels-cottonbro-3951373.jpg'
        },
        {
            title: 'Healthy Eating Habits',
            content: 'Discover the benefits of balanced nutrition and how to incorporate it into your daily routine.',
            image: 'https://i.ibb.co/MMNzCBt/pexels-myfoodie-2664443.jpg'
        },
        {
            title: 'Exercise for Mental Health',
            content: 'Understand the connection between physical activity and mental well-being.',
            image: 'https://i.ibb.co/NZzH2w5/pexels-mikhail-nilov-8297213.jpg'
        },

        {
            title: 'The Importance of Sleep',
            content: 'Learn about the vital role of sleep in maintaining overall health and wellness.',
            image: 'https://i.ibb.co/1KmYrgG/pexels-pixabay-267684.jpg'
        },
        {
            title: 'Hydration and Health',
            content: 'Find out why staying hydrated is crucial and tips to ensure you drink enough water.',
            image: 'https://i.ibb.co/927prms/pexels-yaroslav-shuraev-8691695.jpg'
        },
        {
            title: 'Stress Management Techniques',
            content: 'Explore effective strategies to manage and reduce stress in your daily life.',
            image: 'https://i.ibb.co/RCwQL46/pexels-allan-mas-5368943.jpg'
        }
    ];


    const testimonials = [
        {
            name: 'John Doe',
            feedback: 'FarmaBazar made getting my prescriptions so easy and convenient. Highly recommended!',
            image: 'https://i.ibb.co/0QLc5dN/pexels-gustavo-fring-4173239.jpg'
        },
        {
            name: 'Jane Smith',
            feedback: 'Excellent customer service and fast delivery. I trust FarmaBazar for all my healthcare needs.',
            image: 'https://i.ibb.co/L8k4xhk/pexels-tima-miroshnichenko-5452268.jpg'
        },
        {
            name: 'Alice Johnson',
            feedback: 'The best online store for health products. Great prices and a wide selection.',
            image: 'https://i.ibb.co/CPvQDkk/MAN.jpg'
        }
    ];

    return (
        <div className="home-page  ">



            {/* Health Tips & Articles Section */}
            <section className="bg-white py-10">
                <div className="container mx-auto px-6">
                    <h2 className="text-xl  md:text-3xl font-extrabold text-black uppercase  font-cinzel lg:text-3xl text-center">Health Tips & Articles</h2>
                    <div className="mt-2 text-center">
                        <span className="inline-block  md:w-40 h-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-20 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-10 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-6 h-1 ml-1 bg-blue-500 rounded-full"></span>

                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {healthTips.map((tip, index) => (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <img src={tip.image} alt={tip.title} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800">{tip.title}</h3>
                                <p className="mt-2 text-gray-600">{tip.content}</p>
                                <button className="mt-4 p-2 bg-gradient-to-r from-blue-400 to-pink-500 text-white rounded-lg">Read More</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Testimonials Section */}
            <section className="bg-gray-300 py-10">
                <div className="container mx-auto px-6">
                    <h2 className="text-xl  md:text-3xl font-bold text-black font-cinzel uppercase  lg:text-3xl text-center">Customer Testimonials</h2>
                    <div className="mt-2 text-center">
                        <span className="inline-block  md:w-32 h-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block  md:w-16 h-1 bg-blue-500 rounded-full"></span>

                        <span className="inline-block w-20 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-10 h-1 ml-1 bg-blue-500 rounded-full"></span>
                        <span className="inline-block w-6 h-1 ml-1 bg-blue-500 rounded-full"></span>

                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1500"

                                key={index} className="p-4 bg-white rounded-lg shadow-md text-center">
                                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 mx-auto rounded-full" />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                                <p className="mt-2 text-gray-600">`{testimonial.feedback}`</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center'  >

                    <button className="mt-8 btn  text-lg font-nothing bg-gradient-to-r from-blue-700 to-pink-500 text-white rounded-full">See More...</button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelthTips;
