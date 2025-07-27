import React from 'react';
import { Users, Share2, ShoppingCart, Headphones, ArrowRight } from 'lucide-react';

export default function VendorMartHome() {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Easy Registration",
      description: "Quick and simple registration process for vendors"
    },
    {
      icon: <Share2 className="w-12 h-12 text-orange-500" />,
      title: "Wide Supplier Network",
      description: "Connect with thousands of verified suppliers"
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-orange-500" />,
      title: "Effortless Ordering",
      description: "Streamlined ordering system for your business"
    },
    {
      icon: <Headphones className="w-12 h-12 text-orange-500" />,
      title: "Dedicated Support",
      description: "24/7 customer support for all your needs"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your vendor account in minutes"
    },
    {
      number: "2",
      title: "Browse Suppliers",
      description: "Explore our network of quality suppliers"
    },
    {
      number: "3",
      title: "Place Orders",
      description: "Order products directly through our platform"
    },
    {
      number: "4",
      title: "Grow Business",
      description: "Scale your operations with reliable supply chains"
    }
  ];

  const categories = [
    {
      title: "Fresh Produce",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
      description: "Fresh fruits and vegetables"
    },
    {
      title: "Meats & Poultry",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop&crop=center",
      description: "Quality meat products"
    },
    {
      title: "Grains & Spices",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop&crop=center",
      description: "Essential cooking ingredients"
    },
    {
      title: "Packaging Supplies",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&crop=center",
      description: "Eco-friendly packaging solutions"
    }
  ];

  const testimonials = [
    {
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      quote: "VendorMart has transformed how I source ingredients for my food truck. The quality and reliability are unmatched!"
    },
    {
      name: "Roberto Gomez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      quote: "Finding suppliers was never this easy. VendorMart connected me with the best local suppliers in my area."
    },
    {
      name: "Sarah Lee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      quote: "The customer support is exceptional. They helped me set up my entire supply chain within a week!"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VM</span>
              </div>
              <span className="font-bold text-xl text-gray-900">VendorMart</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-orange-500 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Suppliers</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Orders</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=1080&fit=crop&crop=center")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect with the Best Street Food Suppliers Instantly
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              VendorMart bridges the gap between passionate street food vendors and reliable, 
              high-quality ingredient and equipment suppliers. Grow your business with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  backgroundColor: '#f97316',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
              >
                Become a Vendor
              </button>
              <button 
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Find Suppliers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VendorMart Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose VendorMart?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-8 h-8 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Top Supplier Categories
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-xl">{category.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl">
              View All Suppliers
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Vendors Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">Verified Vendor</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of successful vendors who trust VendorMart for their supply needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-semibold py-4 px-8 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-500 to-blue-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-xs">VM</span>
                </div>
                <span className="font-bold text-lg">VendorMart</span>
              </div>
              <p className="text-orange-100 text-sm">
                Connecting vendors with quality suppliers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-3">Quick Links</h3>
              <ul className="space-y-1 text-orange-100 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suppliers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-3">Support</h3>
              <ul className="space-y-1 text-orange-100 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-base mb-3">Contact</h3>
              <div className="space-y-1 text-orange-100 text-sm">
                <p>support@vendormart.com</p>
                <p>+1 (800) 555-0199</p>
                <p>24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-6 pt-4 text-center text-orange-100 text-sm">
            <p>&copy; 2024 VendorMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}