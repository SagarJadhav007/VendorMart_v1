import React, { useState } from 'react';
import { Phone, Mail, Globe, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function VendorMartContact() {
  const [formData, setFormData] = useState({
    helpType: '',
    email: '',
    subject: '',
    description: '',
    files: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: e.target.files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch with VendorMart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to support your vendor business. Reach out to us for any questions or assistance.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              We're here to help! Please fill out the form below with details about your request.
            </p>

            <div className="space-y-6">
              {/* Help Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What can we help you with?
                </label>
                <select
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-700 placeholder-gray-500"
                  style={{ color: formData.helpType ? '#374151' : '#6B7280' }}
                >
                  <option value="" className="text-gray-500">Select an option</option>
                  <option value="technical" className="text-gray-700">Technical Support</option>
                  <option value="billing" className="text-gray-700">Billing Questions</option>
                  <option value="partnership" className="text-gray-700">Partnership Opportunities</option>
                  <option value="general" className="text-gray-700">General Inquiry</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="vendor@example.com"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-700 placeholder-gray-600"
                  style={{ '::placeholder': { color: '#6B7280', opacity: 1 } }}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your request"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-700 placeholder-gray-600"
                  style={{ '::placeholder': { color: '#6B7280', opacity: 1 } }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Please provide more details. Include screenshots or relevant information if possible."
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all resize-none text-gray-700 placeholder-gray-600"
                  style={{ '::placeholder': { color: '#6B7280', opacity: 1 } }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Files (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-600 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium">Choose Files</span>
                    <span className="text-xs ml-2 text-gray-500">No file chosen</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Immediate Help?</h2>
              <p className="text-gray-600">
                You can also reach us through the following channels.
              </p>
            </div>

            {/* Call Us */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    For urgent matters, call our support line:
                  </p>
                  <p className="font-semibold text-orange-500">+1 (800) 555-0199</p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Send us an email and we'll get back to you within 24 hours:
                  </p>
                  <p className="font-semibold text-orange-500">support@vendormart.com</p>
                </div>
              </div>
            </div>

            {/* Quick Answers */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Globe className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Answers</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse our frequently asked questions for instant solutions:
                  </p>
                  <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Check our FAQ
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Connect on Social Media</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-pink-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-400 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        input::placeholder,
        textarea::placeholder {
          color: #6B7280 !important;
          opacity: 1 !important;
        }
        
        select {
          color: ${formData.helpType ? '#374151' : '#6B7280'};
        }
      `}</style>
    </div>
  );
}