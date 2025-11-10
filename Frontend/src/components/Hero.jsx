import React from "react";
import SliderReview from "./clients";

function Hero() {
  return (
    <>
      <div className="text-center font-light m-10 bg-gray-100 rounded-2xl   h-auto mt-10 shadow-gray-500 ">
        <img src="./src/assets/banner.png" className="p-2 rounded" alt="" />
      </div>
      <div className="text-center font-light m-10 bg-gray-100 rounded-2xl p-5  h-auto mt-10 shadow-gray-500 ">
        <h1 className="text-xl font-semibold">Welcome to Homzy </h1>
        <p>_________________</p>
        <p className="p-5  font-light  italic  text-xl">
          ❝At Homzy, we make finding your perfect home simple and stress-free.
          Whether you’re looking to buy, rent, or sell, our all-in-one platform
          puts verified listings, trusted agents, and powerful tools at your
          fingertips. From browsing detailed property information to connecting
          directly with professionals, Homzy streamlines every step of the real
          estate journey. With us, managing your property search or sale is
          effortless — because at Homzy, we believe that finding a home should
          be as easy as living in one. ❞
        </p>
      </div>

      <div>
        <div className=" bg-gray-100 rounded-xl m-10 text-center p-5">
          <b className="text-center font-extralight border-b-2 p-2">
            Why to choose homzy?
          </b>

          <div className="p-5 mt-5 flex flex-wrap justify-center items-center gap-10">
            <div className=" shadow-xs shadow-gray-500 bg-gray-100 p-7 h-40 rounded-xl  text-center flex flex-col justify-center items-center">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/sell.png"
                alt="sell"
              />
              <br />
              <p className="font-mono ">1000+ Deals</p>
            </div>

            <div className=" shadow-xs shadow-gray-500 bg-gray-100 p-7 h-40 rounded-xl  text-center flex flex-col justify-center items-center">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/?size=100&id=15466&format=png"
                alt="sell"
              />
              <br />
              <p className="font-mono ">Trusted agents</p>
            </div>

            <div className=" shadow-xs shadow-gray-500 bg-gray-100 p-7 h-40 rounded-xl  text-center flex flex-col justify-center items-center">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/?size=160&id=YTriM9OkPwft&format=png"
                alt="sell"
              />
              <br />
              <p className="font-mono ">EMI option</p>
            </div>

            <div className=" shadow-xs shadow-gray-500 bg-gray-100 p-7 h-40 rounded-xl  text-center flex flex-col justify-center items-center">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/?size=60&id=61094&format=png"
                alt="sell"
              />
              <br />
              <p className="font-mono ">
                No hidden <br />
                fees
              </p>
            </div>
          </div>
        </div>
      </div>

      <SliderReview/>
    </>
  );
}

export default Hero;
