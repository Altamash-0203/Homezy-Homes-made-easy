import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderReview() {
  const reviews = [
    {
      name: "Aarav Mehta",
      review:
        "Homzy made finding my first apartment super easy! The listings were verified, and the agents were very professional.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Sharma",
      review:
        "Loved the clean interface and the EMI calculator! Found my dream home within a week.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rohan Patel",
      review:
        "The best real estate experience I’ve had. Transparent pricing and no hidden charges — just as promised!",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Sneha Iyer",
      review:
        "Customer support was fantastic. They helped me shortlist homes within my budget quickly.",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      name: "Vikram Desai",
      review:
        "Smooth, simple, and stress-free process. Definitely recommend Homzy for anyone looking to buy or rent.",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  ];

  var settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <div className=" m-10 mt-20 ">
        <Slider {...settings} >
          {reviews.map((d) => (
            <div
              key={d.name}
              className=" bg-gray-100 p-5 rounded-xl flex justify-center items-center text-center"
            >
             <div className="flex justify-center items-center">
                 <img
                src={d.image}
                alt={d.name}
                className=" h-20 w-20 rounded-full border-4 border-gray-300 "
              />
             </div>
              <p className=" italic text-gray-700 mb-2 ">
                "{d.review}"
              </p>
              <p className="font-semibold text-gray-900">{d.name}</p>
            </div>
          ))}
          
        </Slider>
      </div>
    </>
  );
}

export default SliderReview;
