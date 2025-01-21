import React from 'react';
import './HomePage.css';
import animation from './video.mp4';
import Navbar from '../../components/Navbar/Navbar';
import hotelImage from './hotel-image.jpg';
import offerImage from './offer-image.jpg';

function Homepage() {
  return (
    <section>
      <Navbar />
      <h1 className="h1title">Welcome to LuxeNest Hotel</h1>

      <div className="video-and-paragraph-row">
        <div className="video-box">
          <video width="100%" height="100%" autoPlay loop muted>
            <source src={animation} type="video/mp4" />
          </video>
        </div>
        <div className="paragraph-box">
          <p className="subtitle">
            Welcome to LuxeNest Hotel, where luxury and comfort come together.
            With elegant rooms, exceptional service, and top-notch amenities, we ensure your stay is relaxing and memorable.
            Whether for business or leisure, LuxeNest offers the perfect blend of sophistication and warmth for an unforgettable experience.
          </p>
          <br></br> <button className="btn-book">Book Now</button>
        </div>
      </div>

      <div className="new-row">
        <div className="text-column">
          <h2 className="section-title">Why Choose LuxeNest?</h2>
          <p className="new-paragraph">
            At LuxeNest, we prioritize your comfort and satisfaction. Our tailored services, exquisite dining experiences, 
            and attention to detail set us apart. From family-friendly accommodations to exclusive business lounges, 
            every aspect of LuxeNest is designed to cater to your needs.
          </p>
        </div>
        <div className="image-column">
          <img className="new-image" src={hotelImage} alt="Facilities" />
        </div>
      </div>

      <div className="new-row">
        <div className="image-column">
          <img className="offer-image" src={offerImage} alt="Special Offers" />
        </div>
        <div className="text-column">
          <h2 className="section-title">Exclusive Offers</h2>
          <p className="new-paragraph">
            Take advantage of our special offers designed to make your stay even more rewarding. Enjoy discounts on long stays, complimentary spa sessions, romantic dinner packages, and family fun deals. At LuxeNest, luxury meets affordability.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Homepage;
