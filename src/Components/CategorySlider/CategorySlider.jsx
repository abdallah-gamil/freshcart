import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots:false,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }

  let { data } = useQuery('categorySlider', getCategories)
  let categories = data?.data.data
  console.log(categories);
  return <>
    {categories ?
      <div className="mt-3 cursor-pointer">
        <Slider {...settings}>
        {categories.map((category) => <img key={category._id} className='w-100' height={200} src={category.image} alt={category.name} />)}

      </Slider>

  </div >:' '}
    
  </>
}
