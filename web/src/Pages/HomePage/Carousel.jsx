import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const sliderRef = useRef(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const carouselData = [
    {
      img: "../assets/img/hotel1.jpg",
      title: "Welcome to LUXENEST HOTEL",
      subtitle: "LuxeNest Hotel",
      btn2: "Book Now",
    },
    {
      img: "../assets/img/hotel2.jpg",
      title: "Discover A Brand Luxurious Hotel",
      subtitle: "Luxury Living",
      btn2: "Book Now",
    },
  ];

  return (
    <div className="container-fluid p-0 mb-5">
      <div
        id="header-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <Slider ref={sliderRef} {...settings}>
            {carouselData.map((val, index) => (
              <div className="carousel-item" key={index}>
                <img className="w-100" src={val.img} alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3 text-center" style={{ maxWidth: "700px" }}>
                    <h6
                      className="section-title text-uppercase mb-3 animated slideInDown"
                      style={{ color: "#fff" }}
                    >
                      {val.subtitle}
                    </h6>
                    <h1
                      className="display-3 mb-4 animated slideInDown"
                      style={{ color: "#fff" }}
                    >
                      {val.title}
                    </h1>
                    <a
                      href="/Room"
                      className="btn py-md-3 px-md-5 animated slideInRight"
                      style={{
                        backgroundColor: "#e511ae",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      {val.btn2}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={previous}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={next}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
