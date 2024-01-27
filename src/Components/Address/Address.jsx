import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Cartcontext } from '../../Context/Cartcontext';


export default function Address() {

  let { OnlinePayment, cardId } = useContext(Cartcontext)

  async function handleAddressSubmit(values) {
    let response = await OnlinePayment(cardId, values)
    console.log(response.data.session.url);
    window.location.href = response.data.session.url;
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    }, onSubmit: handleAddressSubmit
  })

  return <div id="address">
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details"> Details: </label>
      <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' type="text" id='details' name='details' />
      <label htmlFor="phone"> Phone: </label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' type="tel" id='phone' name='phone' />
      <label htmlFor="city"> City: </label>
      <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' type="text" id='city' name='city' />
      <button type='submit' className='bg-main text-white btn'>Pay Now</button>
    </form>

  </div>

}
