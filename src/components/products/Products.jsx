import axios from "axios";
import { useQuery } from "react-query";
import "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import "./products.css";
import $ from "jquery";
import { wishContext } from "../context/wishListContext";
export default function Products() {
  const { cId, bId } = useParams();
  function getProducts() {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?sort=-price&${
          cId ? `category[in]=${cId}` : ""
        }&${bId ? `brand=${bId}` : ""}`
      );
    } catch (ex) {
      console.log(ex);
    }
  }
  const { data, isLoading } = useQuery("products", getProducts, {
    cacheTime: 0,
  });
  const { addToCart } = useContext(cartContext);
  async function addProduct(id) {
    try {
      const responseData = await addToCart(id);
      if (!responseData) {
        toast.error("Error", { position: "top-right" });
      } else if (responseData.status == "success") {
        toast.success("Product Added To Cart Successfully", {
          duration: 1000,
          position: "top-right",
        });
      }
    } catch (e) {
      console.log(e);
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
              {data?.data.data.length > 0 ? (
                <>
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
                            <div className="head d-flex justify-content-between align-items-center">
                              <h5 className="category mainColor">
                                {product.category.name}
                              </h5>
                              <i
                                onClick={(e) => addToWish(e, product._id)}
                                className="wishBtn fa-regular fa-heart fs-5 me-2 mainColor"
                              ></i>
                            </div>
                            <h6 className="title">
                              {product.title
                                .split("")
                                .slice(0, 25)
                                .concat("...")}
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
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center align-items-center flex-column p-5">
                    <i className="fa-regular fa-face-frown fa-5x mb-4"></i>
                    <h3>
                      Sorry, There's No Products in this Category Right Now.
                    </h3>
                  </div>
                </>
              )}
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
