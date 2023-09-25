import React from "react";
import "./footer.css";
export default function Footer() {

  return (
    <>
      <footer className="lightColorBg p-3 "> {/*position-absolute start-0 end-0 bottom-0 */}
        <div className="container">
          <div className="getApp mb-4 p-2">
            <h3>Get The FreshCart app</h3>
            <p>
              We Will Send You a link, open it on your phone to download the
              app.
            </p>
            <div className="getAppMail d-flex gap-3">
              <input
                className="form-control w-75 p-2"
                type="email"
                placeholder="Email.."
              />
              <button className="btn w-25 mainColorBg text-white">
                Share App Link
              </button>
            </div>
          </div>
          <div className="info mb-4 ps-0 p-4 border border-start-0 border-end-0 d-flex justify-content-between">
            <div className="infoItem">
              <div className="payment d-flex align-items-center gap-3">
                <h6>Payment Partners :-</h6>
                <img
                  className="w-100"
                  src={require("../../imgs/amazon.png")}
                  alt=""
                />
                <img
                  className="w-100"
                  src={require("../../imgs/visa.png")}
                  alt=""
                />
                <img
                  className="w-100"
                  src={require("../../imgs/masterCard.png")}
                  alt=""
                />

                <img
                  className="w-100"
                  src={require("../../imgs/paypal.png")}
                  alt=""
                />
              </div>
            </div>
            <div className="infoItem">
              <div className="getAppIcon d-flex align-items-center gap-2">
                <h6 className="mb-0">Get Deliveries with FreshCart</h6>
                <img className="cursor-pointer" src={require("../../imgs/googlePlay.png")} alt="" />
                <img className="cursor-pointer" src={require("../../imgs/apple.png")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
