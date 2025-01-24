import React from "react";
import { Link } from "react-router-dom";

export default function SocialIcons() {
  const socialIcons = [
    {
      icon: <i className="fab fa-facebook-f"></i>,
    },
    {
      icon: <i className="fab fa-twitter"></i>,
    },
    {
      icon: <i className="fab fa-instagram"></i>,
    },
    {
      icon: <i className="fab fa-linkedin-in"></i>,
    },
    {
      icon: <i className="fab fa-youtube"></i>,
    },
  ];

  return (
    <>
      <div className="col-lg-3 px-5">
        <div className="d-inline-flex align-items-center py-2">
          {socialIcons.map((val, index) => (
            <div key={index}>
              <Link className="me-3" href="">
                {val.icon}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
