import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/freshcart-logo.svg";
import { authContext } from "../context/authentication";
import { cartContext } from "../context/cartContext";
import { wishContext } from "../context/wishListContext";
import jwtDecode from "jwt-decode";
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { cardItemsCount } = useContext(cartContext);
  const { wishCount } = useContext(wishContext);

  const [name, setName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      const { name } = jwtDecode(localStorage.getItem("Token"));
      setName(name);
    }
  }, []);

  function logout() {
    localStorage.clear("token");
    setToken(null);
    setName(null);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky z-3 top-0 start-0 end-0">
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
            <ul className="navbar-nav d-flex align-items-center gap-2 ms-auto list-unstyled">
              {token ? (
                <>
                  <li>
                    <Link
                      className="text-decoration-none text-black p-1 me-2 position-relative"
                      to="wishlist"
                    >
                      <i className="fa-regular fa-heart fs-4"></i>
                      {wishCount > 0 ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill mainColorBg">
                          {wishCount}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none text-black p-1 me-2 position-relative"
                      to="cart"
                    >
                      <i className="fa-solid fa-cart-shopping fs-4"></i>
                      {cardItemsCount ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill mainColorBg">
                          {cardItemsCount}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-user fs-5 me-2"></i>
                      <span className="me-2">{name?<>Hi,{name}</>:""}</span>
                      {/* <i className="fa-solid fa-chevron-down ms-2 fa-1x"></i> */}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-black"
                          to="profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-black"
                          to="Orders"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-decoration-none text-black"
                          to="wishlist"
                        >
                          Saved Items
                        </Link>
                      </li>
                    </ul>
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
