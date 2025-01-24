import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  const footerContact = [
    {
      icon: <i className="fa fa-phone-alt me-3"></i>,
      name: "+012 345 67890",
    },
    {
      icon: <i className="fa fa-envelope me-3"></i>,
      name: "info@example.com",
    },
  ];

  const socialIcons = [
    { icon: <i className="fab fa-facebook-f"></i> },
    { icon: <i className="fab fa-twitter"></i> },
    { icon: <i className="fab fa-instagram"></i> },
    { icon: <i className="fab fa-linkedin-in"></i> },
    { icon: <i className="fab fa-youtube"></i> },
  ];

  const footerItem = [
    {
      id: 1,
      header: "Company",
      UnitItem: [
        { name: "About Us" },
        { name: "Terms & Condition" },
      ],
    },
    {
      id: 2,
      header: "Services",
      UnitItem: [
        { name: "Food & Restaurant" },
        { name: "Spa & Fitness" },
        { name: "Sports & Gaming" },
        { name: "Event & Party" },
      ],
    },
  ];

  return (
    <div className="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s">
    <div className="container pb-5">
      <div className="row g-5">
        <div className="col-md-6 col-lg-4">
          <div
            className="bg-light rounded p-4"
          >
             
                <h1 className="text-dark text-uppercase mb-3" >
                  LuxeNest Hotel
                </h1>
              
              <p className="text-dark mb-0">
                Create a stunning website for Luxenest Hotel and captivate new visitors from the moment they land on your site.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <h6 className="section-title text-start text-primary text-uppercase mb-4">
              Contact
            </h6>
            {footerContact.map((val, index) => (
              <p className="mb-2" key={index} style={{ color: '#fff' }}>
                {val.icon} {val.name}
              </p>
            ))}
            <div className="d-flex pt-2">
              {socialIcons.slice(0, 4).map((val, index) => (
                <a className="btn btn-outline-light btn-social" href="#" key={index}>
                  {val.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className="row gy-5 g-4">
              {footerItem.map((section, sectionIndex) => (
                <div className="col-md-6" key={sectionIndex}>
                  <h6 className="section-title text-start text-primary text-uppercase mb-4">
                    {section.header}
                  </h6>
                  {section.UnitItem.map((item, itemIndex) => (
                    <a className="btn btn-link" href="#" key={itemIndex}>
                      {item.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
