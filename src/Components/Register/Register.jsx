import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


export default function Register() {
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function submitRegister(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message)
      })

    if (data.message === 'success') {
      setisLoading(false);
      navigate('/login');

    }

  }


  let PhoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(10).required('name is required'),
    phone: Yup.string().matches(PhoneRegex, 'phone is invalid').required('phone is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upper case'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password and rePassword is not match')

  })



  let Formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    }, validationSchema,

    onSubmit: submitRegister
  });



  return <>
    <div className="mx-auto w-75 py-4">

      {error !== null ? <div className="alert alert-danger">{error}</div> : " "}
      <h3>Register Now</h3>
      <div className="form py-4">
        <form onSubmit={Formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input className='form-control' name='name' type='text' id='name' onChange={Formik.handleChange} value={Formik.values.name} onBlur={Formik.handleBlur} />
          {Formik.errors.name ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.name}</div> : " "}


          <label htmlFor="name">Phone:</label>
          <input className='form-control' name='phone' type='tel' id='phone' onChange={Formik.handleChange} value={Formik.values.phone} onBlur={Formik.handleBlur} />
          {Formik.errors.phone && Formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.phone}</div> : " "}

          <label htmlFor="name">Email:</label>
          <input className='form-control' name='email' type='text' id='email' onChange={Formik.handleChange} value={Formik.values.email} onBlur={Formik.handleBlur} />
          {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.email}</div> : " "}

          <label htmlFor="name">password:</label>
          <input className='form-control' name='password' type='password' id='password' onChange={Formik.handleChange} value={Formik.values.password} onBlur={Formik.handleBlur} />
          {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.password}</div> : " "}

          <label htmlFor="name">rePassword:</label>
          <input className='form-control' name='rePassword' type='rePassword' id='rePassword' onChange={Formik.handleChange} value={Formik.values.rePassword} onBlur={Formik.handleBlur} />
          {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.rePassword}</div> : " "}
          {isLoading ? <button type='button' className='bg-main text-white mt-2 btn'>

            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />


          </button> : <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='bg-main text-white mt-2 btn'>Register</button>}

        </form>
      </div>



    </div>
  </>

}
