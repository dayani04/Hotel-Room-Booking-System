import React from "react";
import CommonHeading from "./CommonHeading";
import './Services.css'; // Import CSS for styling

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <i className="fa fa-hotel fa-2x custom-icon"></i>,
      name: "Rooms & Apartment",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
    {
      id: 2,
      icon: <i className="fa fa-utensils fa-2x custom-icon"></i>,
      name: "Food & Restaurant",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
    {
      id: 3,
      icon: <i className="fa fa-spa fa-2x custom-icon"></i>,
      name: "Spa & Fitness",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
    {
      id: 4,
      icon: <i className="fa fa-swimmer fa-2x custom-icon"></i>,
      name: "Sports & Gaming",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
    {
      id: 5,
      icon: <i className="fa fa-glass-cheers fa-2x custom-icon"></i>,
      name: "Event & Party",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
    {
      id: 6,
      icon: <i className="fa fa-dumbbell fa-2x custom-icon"></i>,
      name: "GYM & Yoga",
      discription: "Contrary to popular belief, ipsum is not simply random.",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <CommonHeading
            heading="Our Services"
            title="Services"
            subtitle="Explore Our"
          />
        </div>
        <div className="row g-4">
          {services.map((item) => (
            <div
              key={item.id}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a
                className="service-item card-hover-effect rounded"
                href="#"
                tabIndex="0" // Enable focus via arrow keys
              >
                <div className="service-icon d-flex justify-content-center align-items-center mb-3">
                  {item.icon}
                </div>
                <h5 className="service-name mb-3 text-center">{item.name}</h5> {/* Added a custom class here */}
                <p className="text-body mb-0 text-center">{item.discription}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
