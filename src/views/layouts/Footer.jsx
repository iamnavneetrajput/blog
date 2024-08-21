import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebook, FaTwitter, FaDribbble, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.back-to-top').classList.add('show');
      } else {
        document.querySelector('.back-to-top').classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollDuration = 1000; // in milliseconds
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <>
      <button className="back-to-top" onClick={scrollToTop}>
        <i className="fa-solid fa-angle-up"></i>
      </button>

      <footer>
        <div className="footer-about">
        </div>
        <div className="container">


          <div className="info-social">
            <div className="info">
              <p>
                {/* Copyright &copy; {new Date().getFullYear()} All Rights Reserved by
              <a href="#"> Intelli.code</a>. */}
               Copyright &copy; {new Date().getFullYear()}
                <a href="#"> Intelli.code</a>.
              </p>
            </div>
            <div className="social-icon-div">
              <ul className="social-icon">
                <li><a className="facebook" href="#"><FaFacebook /></a></li>
                <li><a className="twitter" href="#"><FaTwitter /></a></li>
                <li><a className="dribbble" href="#"><FaDribbble /></a></li>
                <li><a className="linkedin" href="#"><FaLinkedin /></a></li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
      </footer>
    </>
  );
};

export default Footer;
