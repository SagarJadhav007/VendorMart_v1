import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, MapPin, Building, CreditCard, Eye, EyeOff, Users } from 'lucide-react';

export default function VendorRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: '',

    businessName: '',
    businessType: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',
    businessLicense: '',
    taxId: '',
    businessDescription: '',

    username: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    marketingEmails: false,
    termsAccepted: false
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Your Contact Details' },
    { number: 2, title: 'Business Details', description: 'Business Information' },
    { number: 3, title: 'Account Setup', description: 'Create Your Account' }
  ];

  const userTypes = [
    { value: 'vendor', label: 'Vendor', description: 'I want to purchase products from suppliers' },
    { value: 'supplier', label: 'Supplier', description: 'I want to sell products to vendors' }
  ];

  const businessTypes = ['Food Truck', 'Street Cart', 'Pop-up Stand', 'Catering Service', 'Restaurant', 'Other'];

  const accountTypes = ['Individual Vendor', 'Business Entity', 'Franchise'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) { alert('Please enter your full name'); return false; }
        if (!formData.email.trim()) { alert('Please enter your email address'); return false; }
        if (!formData.phone.trim()) { alert('Please enter your phone number'); return false; }
        if (!formData.userType) { alert('Please select whether you are a vendor or supplier'); return false; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) { alert('Please enter a valid email address'); return false; }
        break;
      case 2:
        if (!formData.businessName.trim()) { alert('Please enter your business name'); return false; }
        if (!formData.businessType) { alert('Please select your business type'); return false; }
        if (!formData.businessAddress.trim()) { alert('Please enter your business address'); return false; }
        if (!formData.city.trim()) { alert('Please enter your city'); return false; }
        if (!formData.state.trim()) { alert('Please enter your state'); return false; }
        if (!formData.zipCode.trim()) { alert('Please enter your ZIP code'); return false; }
        break;
      case 3:
        if (!formData.username.trim()) { alert('Please enter a username'); return false; }
        if (!formData.accountType) { alert('Please select an account type'); return false; }
        if (!formData.password) { alert('Please enter a password'); return false; }
        if (formData.password.length < 6) { alert('Password must be at least 6 characters long'); return false; }
        if (!formData.confirmPassword) { alert('Please confirm your password'); return false; }
        if (formData.password !== formData.confirmPassword) { alert('Passwords do not match'); return false; }
        if (!formData.termsAccepted) { alert('Please accept the Terms of Service and Privacy Policy'); return false; }
        break;
      default:
        return true;
    }
    return true;
  };

  const nextStep = () => { if (currentStep < 3 && validateCurrentStep()) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
const handleSubmit = async () => {
  const payload = {
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    role: formData.userType,
    businessName: formData.businessName.trim(),
    businessType: formData.businessType,
    businessAddress: formData.businessAddress.trim(),
    city: formData.city.trim(),
    state: formData.state.trim(),
    zipCode: formData.zipCode.trim(),
    username: formData.username.trim(),
    accountType: formData.accountType,
    password: formData.password,
    marketingEmails: formData.marketingEmails,
    termsAccepted: formData.termsAccepted
  };

  // Add optional fields only if not empty
  if (formData.businessLicense.trim()) payload.businessLicense = formData.businessLicense.trim();
  if (formData.taxId.trim()) payload.taxId = formData.taxId.trim();
  if (formData.businessDescription.trim()) payload.businessDescription = formData.businessDescription.trim();

  try {
    const res = await fetch("https://vendor-mart-backend-jjjpgdrcj-sagarjadhav007s-projects.vercel.app/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
};


  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${
              currentStep === step.number 
                ? 'bg-orange-500 text-white' 
                : currentStep > step.number 
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}>
              {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
            </div>
            <div className="mt-3 text-center">
              <div className={`text-base font-semibold ${
                currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-2 mx-6 rounded-full ${
              currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Your Contact Details
      </h2>
      
      <div>
        <label className="block text-base font-semibold text-gray-800 mb-3">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 mb-3">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="your@email.com"
          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 mb-3">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="e.g., +1 (555) 123-4567"
          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 mb-4">
          I am registering as a *
        </label>
        <div className="space-y-4">
          {userTypes.map((type) => (
            <div key={type.value} className="relative">
              <input
                type="radio"
                id={type.value}
                name="userType"
                value={type.value}
                checked={formData.userType === type.value}
                onChange={(e) => handleInputChange('userType', e.target.value)}
                className="absolute top-6 left-5 h-5 w-5 text-orange-500 border-2 border-gray-300 focus:ring-orange-500"
              />
              <label
                htmlFor={type.value}
                className={`block w-full pl-12 pr-5 py-5 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.userType === type.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      {type.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {type.description}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-8 w-full">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Business Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Your business name"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Business Type *
          </label>
          <select
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
          >
            <option value="" className="text-gray-500">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type} className="text-gray-900">{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 mb-3">
          Business Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-4.5 h-6 w-6 text-gray-500" />
          <input
            type="text"
            value={formData.businessAddress}
            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
            placeholder="Street address"
            className="w-full pl-12 pr-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="City"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="State"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="ZIP"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Business License Number
          </label>
          <div className="relative">
            <Building className="absolute left-4 top-4.5 h-6 w-6 text-gray-500" />
            <input
              type="text"
              value={formData.businessLicense}
              onChange={(e) => handleInputChange('businessLicense', e.target.value)}
              placeholder="License number (optional)"
              className="w-full pl-12 pr-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Tax ID / EIN
          </label>
          <input
            type="text"
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            placeholder="Tax ID (optional)"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 mb-3">
          Business Description
        </label>
        <textarea
          value={formData.businessDescription}
          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
          placeholder="Briefly describe your business and what you sell..."
          rows={5}
          className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 resize-vertical"
        />
      </div>
    </div>
  );

  const renderAccountSetup = () => (
    <div className="space-y-8 w-full">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Create Your Account
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Choose a username"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Account Type *
          </label>
          <select
            value={formData.accountType}
            onChange={(e) => handleInputChange('accountType', e.target.value)}
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
          >
            <option value="" className="text-gray-500">Select account type</option>
            {accountTypes.map(type => (
              <option key={type} value={type} className="text-gray-900">{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              className="w-full px-5 py-4 pr-12 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-3">
            Confirm Password *
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="marketing"
            checked={formData.marketingEmails}
            onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
            className="mt-1.5 mr-4 h-5 w-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="marketing" className="text-base text-gray-800 leading-relaxed">
            I would like to receive marketing emails about new suppliers, deals, and platform updates.
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
            className="mt-1.5 mr-4 h-5 w-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="terms" className="text-base text-gray-800 leading-relaxed">
            I agree to the <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">Privacy Policy</a> *
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
          <span className="text-lg font-bold text-blue-900">Account Benefits</span>
        </div>
        <ul className="text-base text-blue-800 space-y-2">
          <li>• Access to 1000+ verified suppliers</li>
          <li>• Real-time order tracking</li>
          <li>• 24/7 customer support</li>
          <li>• Monthly business analytics</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderBusinessDetails();
      case 3:
        return renderAccountSetup();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12 border border-gray-200 mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vendor Registration
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Join VendorMart and connect with quality suppliers
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Content */}
          <div className="mb-12">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              style={{
                backgroundColor: currentStep === 1 ? '#f3f4f6' : '#ffffff',
                color: currentStep === 1 ? '#9ca3af' : '#374151',
                border: currentStep === 1 ? '2px solid #e5e7eb' : '2px solid #d1d5db'
              }}
              className={`flex items-center px-8 py-4 rounded-lg font-semibold text-base transition-colors ${
                currentStep === 1
                  ? 'cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                style={{
                  backgroundColor: '#f97316',
                  color: '#ffffff',
                  border: '2px solid #f97316'
                }}
                className="flex items-center px-8 py-4 rounded-lg font-semibold text-base transition-colors hover:bg-orange-600 shadow-md hover:shadow-lg"
              >
                Next Step
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted}
                style={{
                  backgroundColor: formData.termsAccepted ? '#22c55e' : '#f3f4f6',
                  color: formData.termsAccepted ? '#ffffff' : '#9ca3af',
                  border: formData.termsAccepted ? '2px solid #22c55e' : '2px solid #e5e7eb'
                }}
                className={`px-10 py-4 rounded-lg font-semibold text-base transition-colors shadow-md ${
                  formData.termsAccepted
                    ? 'hover:bg-green-600'
                    : 'cursor-not-allowed'
                }`}
              >
                Complete Registration
              </button>
            )}
          </div>

          {/* Progress Info */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600 font-medium">
              Step {currentStep} of {steps.length} • {steps[currentStep - 1].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}