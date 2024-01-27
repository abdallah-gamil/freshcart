import React, { useContext } from 'react'
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {
  let { userToken, setuserToken } = useContext(UserContext);
 
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken")
    setuserToken(null);
    navigate('/Login')
  }

  return <>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              <img src={logo} alt="Fresh cart logo" />
            </Link>
          </li>
          {userToken !== null ? <>

            <li className="nav-item ">
              <Link className="nav-link" to=" ">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Cart">Cart</Link>
            </li>

          </> : " "}

        </ul>
        <ul className="navbar-nav ms-auto">
          {userToken !== null ?
            <li className="nav-item">
              <span onClick={() => logout()} className="nav-link cursor-pointer">Logout</span>
            </li>
            : <>
              <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Register">Register</Link>
              </li>

            </>
          }
        </ul>

      </div>
    </nav>
  </>
}
