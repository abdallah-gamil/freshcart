import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/grocery-banner.png'
import blog2 from '../../Assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {
  var settings = {
    infinite: true,
    arrows:false,
    dots:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <>
    <div className="row g-0 pb-3">
      <div className="col-md-9">
        <Slider {...settings}>
          <img height={400} className='w-100 rounded-bottom' src={slide1} alt="" />
          <img height={400} className='w-100 rounded-bottom' src={slide2} alt="" />
          <img height={400} className='w-100 rounded-bottom' src={slide3} alt="" />
        </Slider>

      </div>
      <div className="col-md-3">
        <img height={200} className='w-100' src={blog1} alt="" />
        <img height={200} className='w-100' src={blog2} alt="" />

      </div>
    </div>

  </>
}
