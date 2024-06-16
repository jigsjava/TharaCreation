import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import sliderimg1 from "../assets/images/flipcart1.webp"
import sliderimg2 from "../assets/images/flipcart2.webp"
import sliderimg3 from "../assets/images/flipcart3.webp"
import sliderimg4 from "../assets/images/flipcart4.webp"
import sliderimg5 from "../assets/images/flipcart5.webp"
import sliderimg6 from "../assets/images/flipcart6.webp"



const SwiperSlider = () => {
  return (
    <div className='my-5'>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src={sliderimg1} alt='img1' className='img-fluid'/></SwiperSlide>
        <SwiperSlide><img src={sliderimg2} alt='img1' className='img-fluid'/></SwiperSlide>
        <SwiperSlide><img src={sliderimg3} alt='img1' className='img-fluid'/></SwiperSlide>
        <SwiperSlide><img src={sliderimg4} alt='img1' className='img-fluid'/></SwiperSlide>
        <SwiperSlide><img src={sliderimg5} alt='img1' className='img-fluid'/></SwiperSlide>
        <SwiperSlide><img src={sliderimg6} alt='img1' className='img-fluid'/></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SwiperSlider