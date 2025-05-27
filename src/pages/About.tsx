import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">About Zenthy</h1>
        <p className="text-lg max-w-3xl mx-auto">
          We're on a mission to make investing accessible, educational, and profitable for everyone.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2020, Zenthy was born from a simple observation: investing was too complicated, 
            too exclusive, and too intimidating for the average person.
          </p>
          <p className="mb-4">
            Our founders, a team of finance professionals and technology experts, came together with a shared 
            vision of democratizing investment opportunities and making financial growth accessible to everyone, 
            regardless of their background or starting capital.
          </p>
          <p>
            Today, Zenthy serves thousands of investors across the globe, offering a diverse range of investment 
            options with transparent information, educational resources, and user-friendly tools to help our 
            users make informed investment decisions.
          </p>
        </div>
        <div className="flex justify-center">
          <img 
            src="/img/about/our-story.jpg" 
            alt="Zenthy founding team" 
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="max-w-3xl mx-auto">
            At Zenthy, we're guided by a set of core principles that inform everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa fa-lock text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Security & Trust</h3>
            <p>
              We prioritize the security of your investments and personal information above all else, 
              implementing bank-level security measures and transparent practices.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa fa-graduation-cap text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Education First</h3>
            <p>
              We believe in empowering our users through knowledge, providing comprehensive educational 
              resources to help you make informed investment decisions.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa fa-handshake text-primary text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
            <p>
              We're committed to making investing accessible to everyone, with low minimum investments 
              and user-friendly tools designed for investors at all levels.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="max-w-3xl mx-auto">
            Meet the experienced professionals guiding Zenthy's mission and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/img/about/team-1.jpg" 
              alt="Sarah Johnson" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Sarah Johnson</h3>
            <p className="text-primary mb-2">Chief Executive Officer</p>
            <p className="text-sm text-gray-600 mb-3">
              Former investment banker with 15+ years of experience in financial markets.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/img/about/team-2.jpg" 
              alt="Michael Chen" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Michael Chen</h3>
            <p className="text-primary mb-2">Chief Technology Officer</p>
            <p className="text-sm text-gray-600 mb-3">
              Tech innovator with background in fintech and blockchain development.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/img/about/team-3.jpg" 
              alt="Olivia Rodriguez" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Olivia Rodriguez</h3>
            <p className="text-primary mb-2">Chief Investment Officer</p>
            <p className="text-sm text-gray-600 mb-3">
              Seasoned portfolio manager with expertise in diverse asset classes.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/img/about/team-4.jpg" 
              alt="David Okafor" 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">David Okafor</h3>
            <p className="text-primary mb-2">Head of Customer Success</p>
            <p className="text-sm text-gray-600 mb-3">
              Customer experience expert dedicated to investor satisfaction and education.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-white p-10 rounded-lg shadow-md mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">25,000+</div>
            <p>Active Investors</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$120M+</div>
            <p>Assets Under Management</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <p>Investment Options</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Investment Community</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Ready to start your investment journey with Zenthy? Create an account today or contact our team to learn more.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/register" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
            Create Account
          </a>
          <a href="/contact" className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
