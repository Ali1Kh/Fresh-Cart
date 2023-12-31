import axios from "axios";
import React, { useContext, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./productDetails.css";
import { cartContext } from "../context/cartContext";
import toast from "react-hot-toast";
import $ from "jquery";
import { wishContext } from "../context/wishListContext";
export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useQuery("getProductDetails", getProductDetails, {
    cacheTime: 0,
  });
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let productDetailes = data?.data.data;
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  let [mainImage, setMainImage] = useState(null);
  const { addToCart } = useContext(cartContext);
  async function addProduct(id) {
    const responseData = await addToCart(id);
    if (!responseData) {
      toast.error("Error", { position: "top-right" });
    } else if (responseData.status == "success") {
      toast.success("Product Added To Cart Successfully", {
        duration: 1000,
        position: "top-right",
      });
    }
  }
  const { addToWishlist } = useContext(wishContext);
  function addToWish(e, id) {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(id);
  }
  $(".wishBtn").hover(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      $(e.target).removeClass("fa-regular");
      $(e.target).addClass("fa-solid");
    },
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      $(e.target).addClass("fa-regular");
      $(e.target).removeClass("fa-solid");
    }
  );
  return (
    <>
      <title>Product Details</title>
      {isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <div className="container p-5">
            <div className="row">
              {productDetailes ? (
                <>
                  <div className="col-md-4">
                    <img
                      className="w-100 mb-3"
                      src={mainImage ? mainImage : productDetailes.imageCover}
                      alt=""
                    />
                    <div className="text-center">
                      <Slider {...settings}>
                        {productDetailes.images.map((image, idx) => {
                          return (
                            <div key={idx}>
                              <img
                                className="subImage w-75"
                                src={image}
                                alt=""
                                onClick={() => {
                                  setMainImage(image);
                                }}
                              />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                  <div className="col-md-8 d-flex flex-column justify-content-center">
                    <div className="details">
                      <div className="head d-flex justify-content-between align-items-center mb-2">
                        <h5 className="titleInfo my-0">
                          {productDetailes.title}
                        </h5>
                        <i
                          onClick={(e) => addToWish(e, productDetailes._id)}
                          className="wishBtn cursor-pointer fa-regular fa-heart fs-4 me-2 my-0 mainColor"
                        ></i>
                      </div>
                      <p className="description p-1 text-muted">
                        {productDetailes.description}
                      </p>
                      <h6 className="mainColor">
                        {productDetailes.category.name}
                      </h6>
                      <div className="info d-flex justify-content-between">
                        <div className="price">{productDetailes.price} EGP</div>
                        <div className="rate">
                          <i
                            className="fa fa-star"
                            style={{ color: "#ffc908" }}
                          />{" "}
                          {productDetailes.ratingsAverage}
                        </div>
                      </div>
                      <div className="addToCart my-3 p-2">
                        <button
                          onClick={() => {
                            addProduct(productDetailes._id);
                          }}
                          className="btn btn-success w-100"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
