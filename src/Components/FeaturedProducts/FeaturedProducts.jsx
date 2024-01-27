import React, { useContext } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { Cartcontext } from '../../Context/Cartcontext';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {
  let {addToCart} = useContext(Cartcontext);
 async function addProduct(id){
    let response = await addToCart(id);
    if (response.data.status === 'success'){
      toast.success('product added successfully',{
        duration:1500,
      })
    }
    else
    {
      toast.error('Error adding product')
    }
  }

  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data } = useQuery('FeaturedProducts', getFeaturedProducts);
  // console.log(data?.data.data);
  let products = data?.data.data;

  return <>
    {products ? <div className="container mt-4">
      <div className="row mt-4">
        {products.map((product) =>
          <div key={product.id} className="col-md-2">
            < div className=" product cursor-pointer py-3 px-3">
              <Link to={`/productDetails/${product.id}`}>

                <img className='w-100' src={product.imageCover} alt={product.title} />
                <span className='text-main fw-bolder font-sm'>{product.category.name}</span>
                <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>
                <div className="d-flex justify-content-between mt-4">
                  <span>{product.price} EGP</span>
                  <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
                </div>

              </Link>
              <button onClick={()=>addProduct(product.id)} className='btn bg-main mt-2 w-100 btn-sm'>Add to Cart</button>

            </div>
          </div>)}

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
  </>
}
