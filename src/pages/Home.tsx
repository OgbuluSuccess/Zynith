import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaTasks, FaHandshake, FaAward, FaLeaf, FaBuilding, FaBitcoin, 
  FaDollarSign, FaInfoCircle, FaChartLine, FaShieldAlt, FaAngleDown
  // Removed unused icons: FaFacebook, FaTwitter, FaGooglePlus, FaInstagram, FaLinkedin
} from 'react-icons/fa';
import { GiGoldBar } from 'react-icons/gi';
import CountUp from 'react-countup';
import { Link as ScrollLink } from 'react-scroll';

// Import styles
import '../styles/home.css';

// Define the InvestmentPlan interface
interface InvestmentPlan {
  _id: string;
  name: string;
  description: string;
  minInvestment: number;
  expectedReturns: string; // e.g., "10-15%"
  duration: string; // e.g., "12 months"
  risk: 'Low' | 'Medium' | 'High';
  assetType: 'Stocks' | 'Real Estate' | 'Cryptocurrency' | 'Bonds' | 'Commodities' | 'Forex' | 'Agriculture';
}

// Placeholder investment plans for when API is unavailable
const placeholderPlans: InvestmentPlan[] = [
  {
    _id: 'placeholder-1',
    name: 'Stock Growth Portfolio',
    description: 'A diversified portfolio of high-growth stocks from various sectors.',
    minInvestment: 5000,
    expectedReturns: '10-15%',
    duration: '12 months',
    risk: 'Medium',
    assetType: 'Stocks'
  },
  {
    _id: 'placeholder-2',
    name: 'Real Estate Fund',
    description: 'Invest in commercial and residential properties with stable returns.',
    minInvestment: 10000,
    expectedReturns: '8-12%',
    duration: '36 months',
    risk: 'Low',
    assetType: 'Real Estate'
  },
  {
    _id: 'placeholder-3',
    name: 'Crypto Index Fund',
    description: 'A balanced portfolio of established and emerging cryptocurrencies.',
    minInvestment: 2500,
    expectedReturns: '15-25%',
    duration: '6 months',
    risk: 'High',
    assetType: 'Cryptocurrency'
  }
];

const Home: React.FC = () => {
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [errorPlans, setErrorPlans] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false); // For mobile nav
  const [isHeaderSticky, setIsHeaderSticky] = useState(false); // For sticky header
  
  const headerRef = useRef<HTMLElement>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Effect for sticky header and animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize WOW.js for animations
    const initWow = async () => {
      if (typeof window !== 'undefined') {
        try {
          const WOW = (await import('wowjs')).default.WOW;
          new WOW({
            live: false,
            offset: 100
          }).init();
        } catch (error) {
          console.error('Error initializing WOW.js:', error);
        }
      }
    };
    
    initWow();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect for fetching investment plans
  useEffect(() => {
    const fetchInvestmentPlans = async () => {
      // Debug info
      console.log('Environment variables:', {
        VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        apiBaseUrl
      });
      
      // Always use placeholder data for now since we're focusing on the UI
      setInvestmentPlans(placeholderPlans);
      setLoadingPlans(false);
      
      // Attempt to fetch from API in the background, but don't block UI
      if (apiBaseUrl) {
        const apiUrl = `${apiBaseUrl}/api/investment-plans?limit=3`;
        console.log('Attempting to fetch from:', apiUrl);
        
        try {
          // Fetching 3 featured plans for the home page
          const response = await axios.get(apiUrl);
          console.log('API response received:', response);
          if (response.data && (response.data.data || Array.isArray(response.data))) {
            setInvestmentPlans(response.data.data || response.data);
            setErrorPlans(null);
          }
        } catch (err) {
          console.error("Error fetching investment plans:", err);
          // Don't show error to user since we're already displaying placeholder data
          // Just log it for debugging purposes
        }
      } else {
        console.log("Using placeholder data since API base URL is not configured.");
      }
    };

    fetchInvestmentPlans();
  }, [apiBaseUrl]);

  const getAssetIcon = (assetType: InvestmentPlan['assetType']) => {
    // Using a more generic style for icons in plan cards
    const iconClass = "text-3xl"; 
    switch (assetType) {
      case 'Stocks': return <FaChartLine className={`${iconClass} text-blue-500`} />;
      case 'Real Estate': return <FaBuilding className={`${iconClass} text-green-500`} />;
      case 'Cryptocurrency': return <FaBitcoin className={`${iconClass} text-yellow-500`} />;
      case 'Bonds': return <FaShieldAlt className={`${iconClass} text-gray-500`} />;
      case 'Commodities': return <GiGoldBar className={`${iconClass} text-orange-500`} />;
      case 'Forex': return <FaDollarSign className={`${iconClass} text-indigo-500`} />;
      case 'Agriculture': return <FaLeaf className={`${iconClass} text-teal-500`} />;
      default: return <FaInfoCircle className={`${iconClass} text-purple-500`} />;
    }
  };

  // Mobile nav toggle handler
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="light-version" style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%', 
      maxWidth: '100%', 
      overflow: 'hidden' 
    }}>
      {/* Preloader (visual only, no JS functionality from template) */}
      {/* <div id="preloader">
        <div className="preload-content">
          <div id="dream-load"></div>
        </div>
      </div> */}

      {/* ##### Header Area Start ##### */}
      <header 
        ref={headerRef}
        className={`header-area wow fadeInDown ${isHeaderSticky ? 'sticky' : ''}`} 
        data-wow-delay="0.2s"
      >
        <div className="classy-nav-container breakpoint-off">
          <div className="container">
            <nav className="classy-navbar justify-content-between" id="dreamNav">
              <Link className="nav-brand" to="/">
                <img src="/img/core-img/logo.png" alt="logo" style={{height: '40px', marginRight: '10px'}} /> Zynith
              </Link>
              <div className="classy-navbar-toggler" onClick={toggleNav}>
                <span className="navbarToggler"><span></span><span></span><span></span></span>
              </div>
              <div className={`classy-menu ${isNavOpen ? 'menu-on' : ''}`}>
                <div className="classycloseIcon" onClick={toggleNav}>
                  <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                </div>
                <div className="classynav">
                  <ul id="nav">
                    <li><Link to="/">HOME</Link></li>
                    <li>
                      <a href="#!">INVESTMENTS <FaAngleDown className="inline-block ml-1" /></a>
                      <ul className="dropdown">
                        <li><Link to="/investments/stocks">Stocks</Link></li>
                        <li><Link to="/investments/bonds">Bonds</Link></li>
                        <li><Link to="/investments/real-estate">Real Estate</Link></li>
                        <li><Link to="/investments/crypto">Cryptocurrency</Link></li>
                        <li><Link to="/dashboard">All Plans</Link></li>
                      </ul>
                    </li>
                    <li><Link to="/market-overview">MARKET OVERVIEW</Link></li>
                    <li>
                      <ScrollLink 
                        to="about" 
                        spy={true} 
                        smooth={true} 
                        offset={-70} 
                        duration={500}
                        className="cursor-pointer"
                      >
                        ABOUT US
                      </ScrollLink>
                    </li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
                  </ul>
                  <Link to="/login" className="btn login-btn mr-im">LOG IN</Link>
                  <Link to="/register" className="btn login-btn">SIGNUP</Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/* ##### Header Area End ##### */}

      {/* ##### Welcome Area Start ##### */}
      <section className="welcome_area demo2 flex align-items-center" style={{
        backgroundColor: '#4834d4',
        backgroundImage: "url('/img/bg-img/demo2-bg.png')",
        width: '100%',
        margin: 0,
        padding: '80px 0',
        position: 'relative',
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="welcome-content">
                <div className="promo-section">
                  <div className="integration-link hero-badge">
                    <span className="integration-icon">
                      <img src="/img/svg/img-dollar.svg" width="24" height="24" alt="" />
                    </span>
                    <span className="integration-text">Modern Investment Platform for Smart Investors</span>
                  </div>
                </div>
                <h1 className="wow fadeInUp hero-title" data-wow-delay="0.2s">Explore, Invest, and Grow Your Wealth</h1>
                <p className="wow fadeInUp hero-text" data-wow-delay="0.3s">Zynith offers a comprehensive investment platform with diverse options including stocks, bonds, real estate, and cryptocurrencies. Manage your portfolio, track performance, and make informed investment decisions.</p>
                <div className="dream-btn-group wow fadeInUp" data-wow-delay="0.4s">
                  <Link to="/dashboard" className="btn dream-btn hero-btn-primary">EXPLORE INVESTMENTS</Link>
                  <Link to="/register" className="btn dream-btn hero-btn-secondary">GET STARTED</Link>
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
      {/* ##### Welcome Area End ##### */}

      <div className="clearfix"></div>

      {/* ##### Cool Facts Area Start ##### */}
      <section className="cool-facts-area section-padding-70 full-width-section facts-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="single_cool_fact text-center wow fadeInUp fact-card" data-wow-delay="0.2s">
                <div className="cool_fact_icon fact-icon"><FaUsers size={40} /></div>
                <div className="cool_fact_detail">
                  <h3 className="fact-number">
                    <CountUp end={3215} duration={2.5} /><span>+</span>
                  </h3>
                  <h2 className="fact-title">Happy Investors</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="single_cool_fact text-center wow fadeInUp fact-card" data-wow-delay="0.3s">
                <div className="cool_fact_icon fact-icon"><FaTasks size={40} /></div>
                <div className="cool_fact_detail">
                  <h3 className="fact-number">
                    <CountUp end={784} duration={2.5} /><span>K+</span>
                  </h3>
                  <h2 className="fact-title">Active Portfolios</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="single_cool_fact text-center wow fadeInUp fact-card" data-wow-delay="0.4s">
                <div className="cool_fact_icon fact-icon"><FaHandshake size={40} /></div>
                <div className="cool_fact_detail">
                  <h3 className="fact-number">
                    <CountUp end={13658} duration={2.5} /><span>+</span>
                  </h3>
                  <h2 className="fact-title">Investments Made</h2>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="single_cool_fact text-center wow fadeInUp fact-card" data-wow-delay="0.5s">
                <div className="cool_fact_icon fact-icon"><FaAward size={40} /></div>
                <div className="cool_fact_detail">
                  <h3 className="fact-number">
                    <CountUp end={23} duration={2.5} /><span>+</span>
                  </h3>
                  <h2 className="fact-title">Years of Experience</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* ##### Cool Facts Area End ##### */}

        {/* ##### Featured Investment Plans Section ##### */}
        <section className="our_services_area section-padding-100-0 clearfix full-width-section services-section" id="services">
            <div className="container">
                <div className="section-heading text-center">
                    <h2 className="fadeInUp" data-wow-delay="0.3s">Featured Investment Plans</h2>
                    <div className="dream-dots justify-content-center fadeInUp" data-wow-delay="0.4s">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <p className="fadeInUp" data-wow-delay="0.5s">Discover our most popular investment opportunities</p>
                </div>
                <div className="row">
                  {loadingPlans ? (
                    <div className="col-12 text-center">
                      <p>Loading investment plans...</p>
                    </div>
                  ) : errorPlans ? (
                    <div className="col-12 text-center">
                      <p className="text-danger">{errorPlans}</p>
                    </div>
                  ) : investmentPlans.length > 0 ? (
                    investmentPlans.map((plan) => (
                      <div key={plan._id} className="col-12 col-md-6 col-lg-4">
                        <div className="service_single_content text-center mb-30 fadeInUp" data-wow-delay="0.2s">
                          <div className="service_icon">
                            {getAssetIcon(plan.assetType)}
                          </div>
                          <h6>{plan.name || 'Investment Plan'}</h6>
                          <p>{plan.description || 'No description available'}</p>
                          <div className="plan-features">
                            <p><strong>Min Investment:</strong> ${plan.minInvestment ? plan.minInvestment.toLocaleString() : '0'}</p>
                            <p><strong>Expected Returns:</strong> {plan.expectedReturns || 'N/A'}</p>
                            <p><strong>Duration:</strong> {plan.duration || 'N/A'}</p>
                            <p><strong>Risk Level:</strong> <span className={`risk-${plan.risk ? plan.risk.toLowerCase() : 'medium'}`}>{plan.risk || 'Medium'}</span></p>
                          </div>
                          <Link to={`/investment-details/${plan._id}`} className="btn dream-btn mt-15">Learn More</Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <p>No investment plans available at the moment.</p>
                    </div>
                  )}
                </div>
                {investmentPlans.length > 0 && (
                  <div className="text-center mt-4 mb-5">
                    <Link to="/dashboard" className="btn dream-btn green-btn">View All Plans</Link>
                  </div>
                )}
            </div>
        </section>
        {/* ##### Featured Investment Plans Section End ##### */}

        {/* ##### About Us Area Start ##### */}
        <section className="about-us-area section-padding-0-100 clearfix full-width-section about-section" id="about">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-6">
                <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
                  <img src="/img/core-img/about.png" className="img-responsive center-block" alt="About Zynith" />
                  <div className="growing-company text-center mt-30 fadeInUp" data-wow-delay="0.8s">
                    <p>* Already helping over <span className="font-bold">5,236</span> individuals & companies grow.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="who-we-contant mt-s">
                  <div className="dream-dots fadeInUp" data-wow-delay="0.2s">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <h4 className="fadeInUp" data-wow-delay="0.3s">Why Choose Zynith Investment Platform?</h4>
                  <p className="fadeInUp" data-wow-delay="0.4s">At Zynith, we're committed to providing a secure, transparent, and user-friendly investment experience. Our platform offers diverse investment options across multiple asset classes, including traditional investments and cryptocurrencies.</p>
                  <p className="fadeInUp" data-wow-delay="0.5s">With robust security features, real-time market data, and personalized portfolio management tools, we empower investors to make informed decisions and achieve their financial goals.</p>
                  <Link className="btn dream-btn mt-30 fadeInUp" data-wow-delay="0.6s" to="/about">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ##### About Us Area End ##### */}

      {/* ##### Footer Area Start ##### */}
      
      {/* ##### Footer Area End ##### */}
    </div>
  );
};

export default Home;
