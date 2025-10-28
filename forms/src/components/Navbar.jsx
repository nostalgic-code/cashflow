import React, { useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    // Mobile navigation functionality
    const mobileNavTogglers = document.querySelectorAll('.mobile-nav__toggler');
    const mobileNavWrapper = document.querySelector('.mobile-nav__wrapper');
    
    const handleToggle = (e) => {
      e.preventDefault();
      mobileNavWrapper?.classList.toggle('expanded');
      document.body.classList.toggle('active');
    };

    mobileNavTogglers.forEach(toggler => {
      toggler.addEventListener('click', handleToggle);
    });

    // Close menu when clicking overlay
    const mobileNavOverlay = document.querySelector('.mobile-nav__overlay');
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', () => {
        mobileNavWrapper?.classList.remove('expanded');
        document.body.classList.remove('active');
      });
    }

    // Close menu when clicking close button
    const mobileNavClose = document.querySelector('.mobile-nav__close');
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', () => {
        mobileNavWrapper?.classList.remove('expanded');
        document.body.classList.remove('active');
      });
    }

    // Cleanup event listeners
    return () => {
      mobileNavTogglers.forEach(toggler => {
        toggler.removeEventListener('click', handleToggle);
      });
    };
  }, []);
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
              <a href="https://www.cashflowloans.co.za/news.html">Company News</a>
            </div>
            <div className="topbar__right">
              <a href="mailto:info@cashflowloans.co.za"><i className="pylon-icon-email1"></i>info@cashflowloans.co.za</a>
              <a href="#"><i className="pylon-icon-clock2"></i>Mon - Sat 8:00 AM - 17:00 PM</a>
            </div>
          </div>
        </div>
        
        <nav className="main-menu">
          <div className="container">
            <div className="logo-box">
              <a href="https://www.cashflowloans.co.za/index.html" aria-label="logo image" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="/assets/images/logo.jpeg" width="100" alt="Cashflow Loans Logo" style={{ borderRadius: '50%' }} />
              </a>
              <span className="fa fa-bars mobile-nav__toggler"></span>
            </div>
            
            <ul className="main-menu__list">
              <li><a href="https://www.cashflowloans.co.za/index.html">Home</a></li>
              <li><a href="https://www.cashflowloans.co.za/about.html">About Us</a></li>
              <li className="dropdown">
                <a href="#" onClick={(e) => e.preventDefault()}>Apply Now</a>
                <ul>
                  <li><a href="https://loan-forms.vercel.app/?type=unsecured">Unsecured Loan</a></li>
                  <li><a href="https://loan-forms.vercel.app/?type=secured">Secured Loan</a></li>
                </ul>
              </li>
              <li><a href="https://www.cashflowloans.co.za/news.html">News</a></li>
              <li><a href="https://www.cashflowloans.co.za/contact.html">Contact Us</a></li>
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

      {/* Mobile Navigation */}
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler"></div>
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler"></span>
          
          <div className="logo-box">
            <a href="https://www.cashflowloans.co.za/index.html" aria-label="logo image" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/assets/images/logo.jpeg" width="100" alt="Cashflow Loans Logo" style={{ borderRadius: '50%' }} />
            </a>
          </div>
          
          <div className="mobile-nav__container">
            <ul className="main-menu__list">
              <li><a href="https://www.cashflowloans.co.za/index.html">Home</a></li>
              <li><a href="https://www.cashflowloans.co.za/about.html">About</a></li>
              <li><a href="https://loan-forms.vercel.app/" className="thm-btn">Apply For Loan</a></li>
              <li><a href="https://www.cashflowloans.co.za/news.html">News</a></li>
              <li><a href="https://www.cashflowloans.co.za/contact.html">Contact</a></li>
            </ul>
          </div>
          
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="pylon-icon-email1"></i>
              <a href="mailto:info@cashflowloans.co.za">info@cashflowloans.co.za</a>
            </li>
            <li>
              <i className="pylon-icon-telephone"></i>
              <a href="tel:+27614011426">+27614011426</a>
            </li>
          </ul>
          
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
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
      </div>
    </>
  );
};

export default Navbar;