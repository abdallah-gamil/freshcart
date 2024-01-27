import React, { useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Cartcontext } from '../../Context/Cartcontext';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';


export default function ProductDetails() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let { addToCart } = useContext(Cartcontext);
  let params = useParams();
  console.log(params.id);
  async function addProduct(id) {
    let response = await addToCart(id)

    if (response?.data.status === "success") {
      toast.success('product added successfully', {
        duration: 1500
      })
    }
    console.log(response);
  }

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data } = useQuery('productDetails', () => getProductDetails(params.id));
  console.log(data);

  let productDetails = data?.data.data;

  return <>

    <div>

      {productDetails ? <div className="row py-4 d-flex align-items-center">
        <Helmet>
          <title>{productDetails.title}</title>
        </Helmet>

        <div className="col-md-4 text-center mb-2">
          <Slider {...settings}>
            {productDetails.images.map((img) => <img className='w-75' src={img} alt={productDetails.title} />)}
          </Slider>
        </div>

        <div className="col-md-8">
          <h2 className='py-2'>{productDetails.title}</h2>
          <p>{productDetails.description}</p>
          <h6 className='text-main'>{productDetails.category.name}</h6>
          <h6 className='text-main'>Price: {productDetails.price} EGP</h6>
          <div className="d-flex justify-content-between py-4" >
            <span> ratingQuantity :{productDetails.ratingsQuantity}</span>
            <span> <i className='rating-color fas fa-star'></i>{productDetails.ratingsAverage}</span>
          </div>
          <button onClick={() => addProduct(params.id)} className='text-white w-100 bg-main btn mt-3'>Add to Cart</button>


        </div>
      </div> :
        <div className='loader d-flex align-items-center justify-content-center'>

          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>}


    </div>

  </>
}
