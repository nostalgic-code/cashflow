import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <header className="main-header">
        <div className="topbar">
          <div className="container">
            <div className="topbar__left">
              <div className="topbar__social">
                <a href="https://www.facebook.com/share/1Jcb8SKRQd/" className="fab fa-facebook-f"></a>
                <a href="https://wa.me/27614011426" aria-label="whatsapp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.instagram.com/cashflowloans27?igsh=aGdieno5Mmd1NGNn" aria-label="instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <a href="/news.html">Company News</a>
            </div>
            <div className="topbar__right">
              <a href="#"><i className="pylon-icon-email1"></i>info@cashflowloans.co.za</a>
              <a href="#"><i className="pylon-icon-clock2"></i>Mon - Sat 8:00 AM - 17:00 PM</a>
            </div>
          </div>
        </div>
        
        <nav className="main-menu">
          <div className="container">
            <div className="logo-box">
              <a href="/index.html" aria-label="logo image" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="/assets/images/logo.jpeg" width="100" alt="Cashflow Loans Logo" style={{ borderRadius: '50%' }} />
              </a>
              <span className="fa fa-bars mobile-nav__toggler"></span>
            </div>
            
            <ul className="main-menu__list">
              <li><a href="/index.html">Home</a></li>
              <li><a href="/about.html">About Us</a></li>
              <li className="dropdown">
                <a href="https://cashflow-crm.onrender.com/apply-for-loan.html">Apply Now</a>
                <ul>
                  <li><a href="https://cashflow-crm.onrender.com/apply-for-loan.html">Apply For Loan</a></li>
                </ul>
              </li>
              <li><a href="/news.html">News</a></li>
              <li><a href="/contact.html">Contact Us</a></li>
            </ul>
            
            <div className="main-header__info">
              <div className="main-header__info-phone">
                <i className="pylon-icon-tech-support"></i>
                <div className="main-header__info-phone-content">
                  <span>Call Anytime</span>
                  <h3><a href="tel:+27614011426">+27614011426</a></h3>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;