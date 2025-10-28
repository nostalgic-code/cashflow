import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget footer-widget__about">
                <a href="/index.html" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
                  <img src="/assets/images/logo.jpeg" width="100" alt="Cashflow Loans Logo" style={{ borderRadius: '50%' }} />
                  <h6 style={{ margin: '10px 0', color: 'white' }}>cashflowloans</h6>
                </a>
                <p>Welcome to cashflowloans company we provide loans <br/>at a very reasonable interest get started today.</p>
                <div className="footer-widget__about-phone">
                  <i className="pylon-icon-tech-support"></i>
                  <div className="footer-widget__about-phone-content">
                    <span>Call Anytime</span>
                    <h3><a href="tel:+27614011426">+27614011426</a></h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-2 col-sm-6">
              <div className="footer-widget footer-widget__link">
                <h3 className="footer-widget__title">Explore</h3>
                <ul className="list-unstyled footer-widget__link-list">
                  <li><a href="/about.html"><i className="fa fa-arrow-right"></i>About</a></li>
                  <li><a href="/services.html"><i className="fa fa-arrow-right"></i>Our Services</a></li>
                  <li><a href="/news.html"><i className="fa fa-arrow-right"></i>Latest News</a></li>
                  <li><a href="/contact.html"><i className="fa fa-arrow-right"></i>Contact</a></li>
                  <li><a href="https://cashflow-crm.onrender.com/apply-for-loan.html"><i className="fa fa-arrow-right"></i>Apply for Loan</a></li>
                </ul>
              </div>
            </div>
            
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget footer-widget__post">
                <h3 className="footer-widget__title">Latest News</h3>
                <ul className="list-unstyled footer-widget__post-list">
                  <li>
                    <img src="/assets/images/img5.jpeg" alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div className="footer-widget__post-list-content">
                      <span>7 Aug, 2025</span>
                      <h3><a href="/blog/avoid-debt-spiral.html">How to avoid the debt spiral</a></h3>
                    </div>
                  </li>
                  <li>
                    <img src="/assets/images/img6.jpeg" alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div className="footer-widget__post-list-content">
                      <span>7 Aug, 2025</span>
                      <h3><a href="/blog/needs-vs-wants.html">Needs vs wants</a></h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-lg-4 col-sm-6">
              <div className="footer-widget footer-widget__contact">
                <h3>Contact</h3>
                <ul className="list-unstyled footer-widget__contact-list">
                  <li>
                    <a href="mailto:info@cashflowloans.co.za">
                      <i className="fas fa-envelope"></i>info@cashflowloans.co.za
                    </a>
                  </li>
                  <li>
                    <a href="#"><i className="fas fa-clock"></i>Mon - Sat 8:00 AM - 17:00 PM</a>
                  </li>
                  <li>
                    <a href="#"><i className="fas fa-map-marker-alt"></i>South Africa</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <div className="bottom-footer">
        <div className="container">
          <p>© Copyright 2025 by cashflowloans</p>
          <div className="bottom-footer__social">
            <a href="https://www.facebook.com/share/1Jcb8SKRQd/" aria-label="facebook">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="https://wa.me/27614011426" aria-label="whatsapp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com/cashflowloans27?igsh=aGdieno5Mmd1NGNn" aria-label="instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;