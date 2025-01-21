import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="text-center text-lg-start" style={{ backgroundColor: "#aba2f0" }}>
   
      <div className="text-center p-3">
        © 2020 Copyright:
        <a className="text-body" href="https://mdbootstrap.com/" target="_blank" rel="noopener noreferrer">
          MDBootstrap.com
        </a>
      </div>

    </footer>
  );
};

export default Footer;
