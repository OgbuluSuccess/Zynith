import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const SimplifiedHome: React.FC = () => {
  return (
    <div className="light-version" style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%', 
      maxWidth: '100%', 
      overflow: 'hidden' 
    }}>
      {/* Header Area */}
      <header className="header-area">
        <div className="container">
          <div className="classy-nav-container breakpoint-off">
            <nav className="classy-navbar justify-content-between" id="dreamNav">
              <Link className="nav-brand" to="/">
                <img src="/img/core-img/logo.png" alt="logo" style={{height: '40px', marginRight: '10px'}} /> Zynith
              </Link>
              <div className="classy-menu">
                <div className="classynav">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/investments">Investments</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Welcome Area */}
      <section style={{
        backgroundColor: '#4834d4',
        backgroundImage: "url('/img/bg-img/demo2-bg.png')",
        width: '100%',
        margin: 0,
        padding: '80px 0',
        position: 'relative',
        color: 'white'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="welcome-content">
                <h1 className="fadeInUp" style={{color: 'white'}}>Modern Investment Platform for Smart Investors</h1>
                <p className="fadeInUp">Join thousands of investors who trust Zynith for their financial growth. Our platform offers diverse investment options with competitive returns.</p>
                <div className="dream-btn-group fadeInUp">
                  <Link to="/register" className="btn btn-primary">Get Started</Link>
                  <Link to="/investments" className="btn btn-outline-light">Explore Plans</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="welcome-img text-center">
                <img src="/img/core-img/banner2.png" alt="Financial Growth Banner" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cool Facts Area */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f9f9ff',
        width: '100%'
      }}>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Why Choose Zynith</h2>
            <p>Our platform offers a range of benefits for investors of all levels</p>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-cool-fact" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px',
                backgroundColor: 'white',
                textAlign: 'center'
              }}>
                <FaUsers size={40} color="#4834d4" />
                <h5>5,000+ Investors</h5>
                <p>Join our growing community of successful investors from around the world.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-cool-fact" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px',
                backgroundColor: 'white',
                textAlign: 'center'
              }}>
                <FaChartLine size={40} color="#4834d4" />
                <h5>Competitive Returns</h5>
                <p>Our investment plans offer some of the most competitive returns in the market.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-cool-fact" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px',
                backgroundColor: 'white',
                textAlign: 'center'
              }}>
                <FaShieldAlt size={40} color="#4834d4" />
                <h5>Secure Platform</h5>
                <p>Your investments and personal data are protected by industry-leading security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white',
        width: '100%'
      }}>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Our Investment Plans</h2>
            <p>Choose the investment plan that suits your financial goals</p>
          </div>
          <div className="row">
            {/* Static investment plans */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single-price-plan" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px'
              }}>
                <div className="package-name">
                  <h3>Starter Plan</h3>
                </div>
                <div className="package-price">
                  <h4>5-8% Annual Returns</h4>
                </div>
                <ul className="description">
                  <li>Minimum Investment: $500</li>
                  <li>Duration: 90 days</li>
                  <li>Risk Level: Low</li>
                  <li>Quarterly dividends</li>
                  <li>Flexible withdrawal</li>
                </ul>
                <div className="plan-button">
                  <Link to="/investments" className="btn btn-primary">Invest Now</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single-price-plan" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px'
              }}>
                <div className="package-name">
                  <h3>Growth Plan</h3>
                </div>
                <div className="package-price">
                  <h4>8-12% Annual Returns</h4>
                </div>
                <ul className="description">
                  <li>Minimum Investment: $2,500</li>
                  <li>Duration: 180 days</li>
                  <li>Risk Level: Medium</li>
                  <li>Semi-annual dividends</li>
                  <li>Portfolio diversification</li>
                </ul>
                <div className="plan-button">
                  <Link to="/investments" className="btn btn-primary">Invest Now</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single-price-plan" style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                marginBottom: '30px'
              }}>
                <div className="package-name">
                  <h3>Premium Plan</h3>
                </div>
                <div className="package-price">
                  <h4>12-18% Annual Returns</h4>
                </div>
                <ul className="description">
                  <li>Minimum Investment: $10,000</li>
                  <li>Duration: 365 days</li>
                  <li>Risk Level: High</li>
                  <li>Annual dividends</li>
                  <li>Priority customer support</li>
                </ul>
                <div className="plan-button">
                  <Link to="/investments" className="btn btn-primary">Invest Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 0 20px',
        width: '100%'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; {new Date().getFullYear()} Zynith - All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimplifiedHome;
