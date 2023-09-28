import axios from "axios";
import { useQuery } from "react-query";
import "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
export default function Products() {
  function getProducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?sort=-price&page=${1}&limit=30`
    );
  }
  const { data, isLoading, isFetching, refetch } = useQuery(
    "products",
    getProducts
  );
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
  const { addToCart } = useContext(cartContext);
  async function addProduct(id) {
    const responseData = await addToCart(id);
    toast.success(responseData.message, {
      duration: 1000,
      position: "top-right",
    });
  }
  return (
    <>
      <title>Products</title>
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
                      <button
                        onClick={() => {
                          addProduct(product._id);
                        }}
                        className="btn btn-success my-2"
                      >
                        Add To Cart
                      </button>
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
