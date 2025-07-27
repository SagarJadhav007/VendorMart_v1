import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function VendorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.emailOrPhone.trim()) {
      alert(loginType === 'email' ? 'Please enter your email address' : 'Please enter your phone number');
      return false;
    }
    
    if (loginType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailOrPhone)) {
        alert('Please enter a valid email address');
        return false;
      }
    }
    
    if (!formData.password) {
      alert('Please enter your password');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const res = await fetch("https://vendor-mart-backend-jjjpgdrcj-sagarjadhav007s-projects.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Save token to localStorage if rememberMe checked
        if (formData.rememberMe) {
          localStorage.setItem("token", data.token);
        }
        alert(`Welcome back, ${data.user.fullName}!`);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
};

  const handleLoginTypeToggle = (type) => {
    setLoginType(type);
    setFormData(prev => ({ ...prev, emailOrPhone: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-700">
              Sign in to your VendorMart account
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => handleLoginTypeToggle('email')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md font-semibold text-sm transition-all ${
                  loginType === 'email'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => handleLoginTypeToggle('phone')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md font-semibold text-sm transition-all ${
                  loginType === 'phone'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            
            {/* Email/Phone Input */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-3">
                {loginType === 'email' ? 'Email Address' : 'Phone Number'} *
              </label>
              <div className="relative">
                {loginType === 'email' ? (
                  <Mail className="absolute left-4 top-4.5 h-5 w-5 text-gray-500" />
                ) : (
                  <Phone className="absolute left-4 top-4.5 h-5 w-5 text-gray-500" />
                )}
                <input
                  type={loginType === 'email' ? 'email' : 'tel'}
                  value={formData.emailOrPhone}
                  onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
                  placeholder={
                    loginType === 'email' 
                      ? 'Enter your email address' 
                      : 'Enter your phone number'
                  }
                  className="w-full pl-12 pr-5 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-3">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4.5 h-5 w-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4.5  mb-1 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="remember" className="ml-3 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-base transition-colors hover:bg-orange-600 shadow-md hover:shadow-lg border-2 border-orange-500"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

          </div>

          {/* Account Benefits */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
            <div className="text-center">
              <span className="text-base font-bold text-blue-900">Welcome Back Benefits</span>
              <div className="text-sm text-blue-800 mt-2 space-y-1">
                <div>• Access your saved suppliers</div>
                <div>• Track your orders in real-time</div>
                <div>• View your business analytics</div>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-orange-600 hover:text-orange-700">
                Register here
              </a>
            </p>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Secure login • Your data is protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}