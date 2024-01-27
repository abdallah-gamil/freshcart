import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const {setuserToken} = useContext(UserContext);

  async function submitLogin(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message)
      })

    if (data.message === 'success') {
      setisLoading(false);
      localStorage.setItem('userToken', data.token)
      setuserToken(data.token);
      navigate('/');
    }

  }


  let PhoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;

  const validationSchema = Yup.object({

    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with upper case'),
    
  })

  let Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema,

    onSubmit: submitLogin
  });

  return <>
    <div id='login' className="mx-auto mt-5 w-75 p-4">

      {error !== null ? <div className="alert alert-danger">{error}</div> : " "}
      <h3>Login Now</h3>
      <div className="form py-4">
        <form onSubmit={Formik.handleSubmit}>

          <label htmlFor="email">Email:</label>
          <input className='form-control' name='email' type='text' id='email' onChange={Formik.handleChange} value={Formik.values.email} onBlur={Formik.handleBlur} />
          {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.email}</div> : " "}

          <label htmlFor="password">password:</label>
          <input className='form-control' name='password' type='password' id='password' onChange={Formik.handleChange} value={Formik.values.password} onBlur={Formik.handleBlur} />
          {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{Formik.errors.password}</div> : " "}
          {isLoading ? <button type='button' className='bg-main text-white p-1 mt-2 btn'>

            <Oval
              height={30}
              width={50}
              color="#ffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />

          </button> :
         <div className="d-flex align-items-center mt-3">
           <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='bg-main text-white mt-2 btn mx-2'>Login </button> <Link to={'/Register'}>Register Now</Link>
         </div>
         }
          

        </form>
      </div>

    </div>
  </>

}

