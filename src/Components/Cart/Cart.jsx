import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from '../../Context/Cartcontext'
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  let { loggedUserCard, RemoveCartItem, UpdateCartQuantity } = useContext(Cartcontext);

  async function RemoveItem(id) {
    let { data } = await RemoveCartItem(id);
    setcartDetails(data);
  }

  async function getCard() {
    let { data } = await loggedUserCard();
    setcartDetails(data);
  }

  async function UpdateCart(id, count) {
    let { data } = await UpdateCartQuantity(id, count)
    setcartDetails(data);
  }

  useEffect(() => {
    getCard()
  }, [])

  return <>

    {cartDetails ? <div className="w-75 mx-auto bg-main-light m-4 p-3">
      <div className='text-center'>
        <h3>Shopping Cart</h3>
        <h4 className='text-main fw-bolder'> Num of cart items: {cartDetails.numOfCartItems}</h4>
        <h4 className='text-main fw-bolder'> Total cart price: {cartDetails.data.totalCartPrice} EGP</h4>

      </div>
      <hr />

      {cartDetails.data.products.map((product) => <div key={product.product.id} className="row cart-row py-3">
        <div className="col-md-2">
          <img className='w-50' src={product.product.imageCover} alt="" />
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center ">
            <div>
              <h6>{product.product.title.split(' ').slice(0, 3).join(' ')}</h6>
              <h6 className='text-main'>Price: {product.price} EGP</h6>
            </div>
            <div>
              <button onClick={() => UpdateCart(product.product.id, product.count + 1)} className='border-main bg-main text-white'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => UpdateCart(product.product.id, product.count - 1)} className='border-main bg-main text-white'>-</button>
            </div>
          </div>
          <span className='cursor-pointer ' onClick={() => RemoveItem(product.product.id)}>

            <i className='text-danger fas fa-trash-can'></i>
            <span className='mx-2'>Remove</span>

          </span>

        </div>
      </div>
      )}
      <div className="text-center">
        <Link className='text-white bg-main btn mt-3 w-50' to={'/Address'}>Online Payment</Link>
      </div>
    </div> : <div className='loader d-flex align-items-center justify-content-center'>

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
