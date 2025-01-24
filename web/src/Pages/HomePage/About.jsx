import React from "react";
import Heading from "./Header";

export default function About() {
  const about = [
    {
      icon: <i className="fa fa-hotel fa-2x mb-2" style={{ color: "#0d0a0b" }}></i>,
      text: "Rooms",
      count: "5178",
    },
    {
      icon: <i className="fa fa-users fa-2x mb-2" style={{ color: "#0d0a0b" }}></i>,
      text: "Staffs",
      count: "1024",
    },
    {
      icon: <i className="fa fa-users-cog fa-2x mb-2" style={{ color: "#0d0a0b" }}></i>,
      text: "Clients",
      count: "3478",
    },
  ];

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start" style={{ color: "#e511ae" }}>
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to{" "}
                <span className="text-uppercase" style={{ color: "#e511ae" }}>
                  LuxeNest Hotel
                </span>
              </h1>
              <p className="mb-4">
                Welcome to LuxeNest Hotel, your haven of comfort and luxury. Located in the heart of the city, we offer modern amenities, exceptional service, and a relaxing stay. Experience true hospitality at LuxeNest!
              </p>
              <div className="row g-3 pb-4">
                {about.map((item, key) => (
                  <div key={key} className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                    <div className="border rounded p-1">
                      <div className="border rounded text-center p-4">
                        {item.icon}
                        <h2 className="mb-1" data-toggle="counter-up" style={{ color: "#f39cdd" }}>
                          {item.count}
                        </h2>
                        <p className="mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a className="btn" href="" style={{ backgroundColor: "#e511ae", color: "#fff", padding: "10px 20px", borderRadius: "5px" }}>
                Explore More
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="/assets/img/about1.jpg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="/assets/img/about2.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="/assets/img/about3.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="/assets/img/about4.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
