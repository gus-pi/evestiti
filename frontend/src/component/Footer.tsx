import { Link } from 'react-router-dom';

import instaImg1 from '../assets/instagram-1.jpg';
import instaImg2 from '../assets/instagram-2.jpg';
import instaImg3 from '../assets/instagram-3.jpg';
import instaImg4 from '../assets/instagram-4.jpg';
import instaImg5 from '../assets/instagram-5.jpg';
import instaImg6 from '../assets/instagram-6.jpg';

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
            123, Bridge Street, London
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@vestiti.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            (+012) 3456 789
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/work">Work With Us</Link>
          <Link to="/blog">Our Blog</Link>
          <Link to="/terms">Terms And Conditions</Link>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <Link to="/help">Help</Link>
          <Link to="/track">Track Orders</Link>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
        </div>

        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="instagram image" />
            <img src={instaImg2} alt="instagram image" />
            <img src={instaImg3} alt="instagram image" />
            <img src={instaImg4} alt="instagram image" />
            <img src={instaImg5} alt="instagram image" />
            <img src={instaImg6} alt="instagram image" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright © 2025 <span className="text-red-600">Vestiti</span> by
        Gustavo Pinedo. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
