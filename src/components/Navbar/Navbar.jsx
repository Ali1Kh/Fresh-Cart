import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/freshcart-logo.svg";
import { authContext } from "../context/authentication";
export default function Navbar() {
  const { token , setToken } = useContext(authContext);

  function logout(){
    localStorage.clear("token");
    setToken(null)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="home">
            <img className="w-100" src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav d-flex gap-2 ms-auto list-unstyled">
              {token ? (
                <>
                     <li>
                     <Link
                       className="text-decoration-none text-black me-2"
                       to="profile"
                     >
                       <i className="fa-regular fa-user fs-5"></i>
                     </Link>
                   </li>
                <li>
                  <Link
                    onClick={logout}
                    className="text-decoration-none text-black"
                    to="login"
                  >
                    Logout
                  </Link>
                </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="ms-3 text-decoration-none text-black"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none text-black"
                      to="register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

/*
                 ! Social Icons
         <li>
                <i className="fa-brands fa-instagram cursor-pointer"></i>
              </li>
              <li>
                <i className="fa-brands fa-facebook-f cursor-pointer"></i>
              </li>
              <li>
                <i className="fa-brands fa-tiktok cursor-pointer"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter cursor-pointer"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin-in cursor-pointer"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube cursor-pointer"></i>
              </li>


*/
