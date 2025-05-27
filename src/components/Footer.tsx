import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer-area bg-img">
      <div className="footer-content-area spec">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="footer-copywrite-info">
                <div className="copywrite_text wow fadeInUp" data-wow-delay="0.2s">
                  <div className="footer-logo">
                    <Link className="nav-brand" to="/"><img src="/img/core-img/logo.png" alt="logo" /> Zenthy</Link>
                  </div>
                  <p>A modern investment platform offering diverse investment options including stocks, bonds, real estate, and cryptocurrencies.</p>
                </div>
                <div className="footer-social-info wow fadeInUp" data-wow-delay="0.4s">
                  <a href="https://facebook.com" aria-label="Facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="https://twitter.com" aria-label="Twitter"> <i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="https://plus.google.com" aria-label="Google Plus"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="https://instagram.com" aria-label="Instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="https://linkedin.com" aria-label="LinkedIn"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="footer-contact-info">
                <div className="section-heading text-white">
                  <h4 className="text-white wow fadeInUp" data-wow-delay="0.3s">Contact Info</h4>
                  <div className="line wow fadeInUp" data-wow-delay="0.4s"></div>
                </div>
                <div className="footer-contact-content">
                  <p className="wow fadeInUp" data-wow-delay="0.4s">123 Investment Avenue, Financial District</p>
                  <p className="wow fadeInUp" data-wow-delay="0.5s">New York, NY 10004</p>
                  <p className="wow fadeInUp" data-wow-delay="0.6s">+1 (555) 123-4567</p>
                  <p className="wow fadeInUp" data-wow-delay="0.7s">support@zenthyinvestments.com</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-2">
              <div className="footer-useful-links">
                <div className="section-heading text-white">
                  <h4 className="text-white wow fadeInUp" data-wow-delay="0.3s">Quick Links</h4>
                  <div className="line wow fadeInUp" data-wow-delay="0.4s"></div>
                </div>
                <ul className="useful-links">
                  <li className="wow fadeInUp" data-wow-delay="0.4s"><Link to="/">Home</Link></li>
                  <li className="wow fadeInUp" data-wow-delay="0.5s"><Link to="/investments">Investments</Link></li>
                  <li className="wow fadeInUp" data-wow-delay="0.6s"><Link to="/crypto-investments">Cryptocurrency</Link></li>
                  <li className="wow fadeInUp" data-wow-delay="0.7s"><Link to="/market-overview">Market Overview</Link></li>
                  <li className="wow fadeInUp" data-wow-delay="0.8s"><Link to="/about">About Us</Link></li>
                  <li className="wow fadeInUp" data-wow-delay="0.9s"><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="footer-newsletter-area">
                <div className="section-heading text-white">
                  <h4 className="text-white wow fadeInUp" data-wow-delay="0.3s">Subscribe</h4>
                  <div className="line wow fadeInUp" data-wow-delay="0.4s"></div>
                </div>
                <div className="footer-newsletter-content">
                  <p className="wow fadeInUp" data-wow-delay="0.4s">Subscribe to our newsletter for the latest investment opportunities and market insights.</p>
                  <form action="#" method="post">
                    <input type="email" name="email" id="email" placeholder="Email address" className="wow fadeInUp" data-wow-delay="0.5s" />
                    <button type="submit" className="btn wow fadeInUp" data-wow-delay="0.6s">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-area">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 h-100">
              <div className="footer-bottom-content h-100 d-md-flex justify-content-between align-items-center">
                <div className="copyright-text">
                  <p>Copyright &copy; {new Date().getFullYear()} Zenthy Investments. All rights reserved.</p>
                </div>
                <div className="footer-bottom-links">
                  <a href="#">Terms</a>
                  <a href="#">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
