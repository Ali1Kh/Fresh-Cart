import axios from "axios";
import { useQuery } from "react-query";
import "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./products.css";
import CategoriesSlides from "../CategoriesSlider/CategoriesSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
export default function Products() {
  function getProducts() {
    // console.log("pageNumber ", pageNumber);
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?sort=-price&page=${1}&limit=20`
    );
  }
  const { data, isLoading, isFetching, refetch } = useQuery(
    "products",
    getProducts
  );
  // console.log("isLoading ", isLoading);
  // console.log("isFetching ", isFetching);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "linear",
  };

  return (
    <>
      {isLoading ? (
        <div className="vh-100 p-0  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="container p-4">
            <div className="ads mb-3">
              <div className="row g-0">
                <div className="col-md-9">
                  <Slider {...settings}>
                    <div className="adImageContainer">
                      <img
                        className="w-100"
                        src={require("../../imgs/slider-image-1.jpeg")}
                        alt=""
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="adImageContainer">
                      <img
                        className="w-100"
                        src={require("../../imgs/slider-image-2.jpeg")}
                        alt=""
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="adImageContainer">
                      <img
                        className="w-100"
                        src={require("../../imgs/slider-image-3.jpeg")}
                        alt=""
                        style={{ height: "300px" }}
                      />
                    </div>
                    <div className="adImageContainer">
                      <img
                        className="w-100"
                        src={require("../../imgs/grocery-banner-2.jpeg")}
                        alt=""
                        style={{ height: "300px" }}
                      />
                    </div>
                  </Slider>
                </div>
                <div className="col-md-3">
                  <div className="adImageContainer">
                    <img
                      className="w-100"
                      src={require("../../imgs/blog-img-2.jpeg")}
                      alt=""
                      style={{ height: "150px" }}
                    />
                    <img
                      className="w-100"
                      src={require("../../imgs/blog-img-1.jpeg")}
                      alt=""
                      style={{ height: "150px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="popularCategories mb-5">
              <CategoriesSlider />
            </div>
            <div className="row gy-4 mb-5">
              {data?.data.data.map((product) => {
                return (
                  <div key={product._id} className="col-md-3">
                    <div className="cardItem rounded-3 p-1 d-flex flex-column">
                      <Link to={`/productDetails/${product._id}`}>
                        <div className="image"></div>
                        <img
                          src={product.imageCover}
                          alt=""
                          className="w-100"
                        />
                        <h5 className="catigory mainColor">
                          {product.category.name}
                        </h5>
                        <h6 className="title">
                          {product.title.split("").slice(0, 25).concat("...")}
                        </h6>
                        <div className="info d-flex justify-content-between">
                          <span className="price">{product.price} EGP</span>
                          <div className="rate">
                            <i
                              className="fa fa-star me-1"
                              style={{ color: "#ffc908" }}
                            />
                            <span>{product.ratingsAverage}</span>
                          </div>
                        </div>
                      </Link>
                      <div className="btn btn-success my-2">Add To Cart</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div className="pagination d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        refetch();
                        getProducts(1);
                      }}
                      className="page-link cursor-pointer"
                    >
                      1
                    </span>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        refetch();
                        getProducts(2);
                      }}
                      className="page-link cursor-pointer"
                    >
                      2
                    </span>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        getProducts(3);
                        refetch();
                      }}
                      className="page-link cursor-pointer"
                    >
                      3
                    </span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

// import React, { useContext } from "react";
// import { authContext } from "../context/authentication";
//    const {token} =  useContext(authContext)
//    console.log(token);
