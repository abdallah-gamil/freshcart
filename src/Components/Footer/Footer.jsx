import React from 'react'
import logo from '../../Assets/images/freshcart-logo.svg'

export default function Footer() {
    return (
        <div className='footer pt-3 bg-main-light text-center text-md-start'>
            <div className="container">
                <div className="row mt-3">
                    <div className="info col-md-6">
                        <img src={logo} alt="" />

                        <h1 className='mt-4 mb-2'>Get the FreshCart App</h1>
                        <p>we will Send you a link...</p>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <input type="text" className='form-control' placeholder='Email' />
                            </div>
                            <div className="col-md-6">
                                <button className='rounded-pill btn bg-main text-white'>send a link</button>
                            </div>
                        </div>

                    </div>
                    <div className="links col-md-4 offset-md-2">
                        <h2 className='fs-3 fw-bolder'>links</h2>
                        <ul className='list-unstyled '>
                            <li><a href="">Home</a></li>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Support</a></li>
                            <li><a href="">Terms and Conditions</a></li>

                        </ul>
                        <div className="icons">
                            <ul className=' d-flex list-unstyled gap-4 mt-4'>
                                <a  href=""><i className="fa-brands facebook fa-facebook "></i></a>
                                <a  href=""><i className="fa-brands linkedin fa-linkedin "></i></a>
                                <a  href=""><i className="fa-brands youtube fa-youtube "></i></a>
                                <a  href=""><i className="fa-brands twitter fa-twitter "></i></a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright text-center pb-2">
                    <span>&copy;-2023- Fresh Cart- all rights reserved</span>
                </div>
            </div>
        </div>
    )
}
