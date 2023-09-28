import Slider from "react-slick";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import Products from "../products/Products";
export default function Home() {
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
      <title>Home</title>
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
        <div className="products">
          <Products />
        </div>
      </div>
    </>
  );
}
