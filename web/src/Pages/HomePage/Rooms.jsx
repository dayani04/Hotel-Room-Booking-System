import React from "react";
import CommonHeading from "./CommonHeading";

export default function Rooms() {
  const roomItems = [
    {
      img: "../assets/img/room1.jpg",
      price: "$100/day",
      name: "Junior Suit",
      star: [
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
      ],
      description:
        "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      darkbtn: "Book Now",
    },
    {
      img: "../assets/img/room2.jpg",
      price: "$150/day",
      name: "Executive Suite",
      star: [
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      darkbtn: "Book Now",
    },
    {
      img: "../assets/img/room3.jpg",
      price: "$200/day",
      name: "Super Deluxe",
      star: [
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
        <small className="fa fa-star" style={{ color: "#df8c22" }}></small>,
      ],
      description:
        "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
      darkbtn: "Book Now",
    },
  ];

  const facility = [
    {
      icon: <i className="fa fa-bed text-primary me-2" style={{ color: "#0d0a0b" }}></i>,
      quantity: 3,
      facility: "Bed",
    },
    {
      icon: <i className="fa fa-bath text-primary me-2" style={{ color: "#0d0a0b" }}></i>,
      quantity: 2,
      facility: "Bath",
    },
    {
      icon: <i className="fa fa-wifi text-primary me-2"style={{ color: "#0d0a0b" }}></i>,
      facility: "WiFi",
    },
  ];

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Our Rooms"
            title="Rooms"
            subtitle="Explore Our"
          />
          <div className="row g-4">
            {roomItems.map((item, key) => (
              <div
                key={key}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.img} alt={item.name} />
                    <small
                      className="position-absolute start-0 top-100 translate-middle-y text-white rounded py-1 px-3 ms-4"
                      style={{
                        backgroundColor: "#e511ae", // Updated price button color
                      }}
                    >
                      {item.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item.name}</h5>
                      <div className="ps-2">{item.star}</div>
                    </div>
                    <div className="d-flex mb-3">
                      {facility.map((facilityItem, index) => (
                        <small key={index} className="border-end me-3 pe-3">
                          {facilityItem.icon}
                          {facilityItem.quantity
                            ? `${facilityItem.quantity} ${facilityItem.facility}`
                            : facilityItem.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.description}</p>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#e511ae",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                        href="#"
                      >
                        {item.darkbtn}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
