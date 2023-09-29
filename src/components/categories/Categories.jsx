import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("allCategories", getCategories,{cacheTime:0});
  return (
    <>
      <title>Categories</title>
      <div className="container">
        <div className="row gy-3 my-4">
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
            data?.data.data.map((category, idx) => {
              return (
                <Link to = {`/products/category/${category._id}`} key={idx} className="col-md-4">
                  <div className="inner text-center shadow rounded-3 p-2">
                    <img
                      className="w-100 mb-2"
                      style={{ height: "400px" }}
                      src={category.image}
                      alt={category.name}
                    />
                    <h6>{category.name}</h6>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
