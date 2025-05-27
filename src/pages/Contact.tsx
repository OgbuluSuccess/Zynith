import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, you would send this data to your API
      // await api.post('/api/contact', formData);
      
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Your message has been sent successfully. We will get back to you soon!', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showToast('Failed to send your message. Please try again later.', 'error');
      console.error('Error sending contact form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have questions about our investment platform? Our team is here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-map-marker-alt text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Office</h3>
                <p className="text-gray-600">
                  123 Investment Avenue, Financial District<br />
                  New York, NY 10004
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-phone text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-envelope text-primary"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">support@zenthyinvestments.com</p>
                <p className="text-gray-600">info@zenthyinvestments.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Investment Question">Investment Question</option>
                <option value="Account Support">Account Support</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2">Sending...</span>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Visit Our Office</h2>
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          {/* In a real application, you would embed a Google Map or similar here */}
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <p className="text-gray-600">Map Placeholder - Google Maps would be embedded here</p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Find quick answers to common questions about our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">How do I start investing?</h3>
            <p className="text-gray-600">
              To start investing with Zenthy, simply create an account, complete your profile, 
              deposit funds, and choose from our range of investment options.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">What is the minimum investment amount?</h3>
            <p className="text-gray-600">
              Our minimum investment amount varies by investment type, but starts as low as $100 
              for certain options, making investing accessible to everyone.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">How can I withdraw my funds?</h3>
            <p className="text-gray-600">
              You can request a withdrawal through your dashboard. Processing times vary depending 
              on the investment type and your bank's policies.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Is my investment secure?</h3>
            <p className="text-gray-600">
              Yes, we implement bank-level security measures and are fully compliant with financial 
              regulations to ensure the security of your investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
