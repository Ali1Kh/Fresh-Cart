import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading, isFetching, refetch } = useQuery(
    "categories",
    getCategories
  );
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <>
      <div className="row">
        <Slider {...settings}>
          {data?.data.data.map((category, idx) => {
            return (
              <div id={idx} className="col-md-2 g-0 m-0">
                <div
                  className="category text-center"
                 
                >
                  <img className="w-100 mb-4" src={category.image} alt=""  style={{ height: "200px" }} />
                  <h6>{category.name}</h6>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
