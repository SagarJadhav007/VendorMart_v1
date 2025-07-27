import { useState } from "react";

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const newErrors = {};
    if (!formData.role) newErrors.role = 'Please select a role';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setProcessing(false);
      return;
    }
    setTimeout(() => {
      setProcessing(false);
      onLogin(formData.role);
      onClose();
      setFormData({ email: '', password: '', remember: false, role: '' });
      setErrors({});
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-sm w-11/12 max-h-[90vh] overflow-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-5 mb-3">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#0112B6" fillOpacity="0.05"></circle>
            </svg>
            <h2 className="text-2xl font-bold text-black">Log in to your account</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Login as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 text-base"
              required
            >
              <option value="">Select role...</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
            {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-full border border-gray-600 text-base"
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 pr-12 rounded-full border border-gray-600 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>

          <div className="text-center text-blue-600 cursor-pointer text-sm">Forgot Password?</div>

          <button
            type="submit"
            disabled={processing}
            className={`w-full p-3 rounded-full text-white font-bold text-base transition ${processing ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
          >
            {processing ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm my-5">— or login with —</p>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://www.google.com" aria-label="Login with Google" className="text-red-600">🔍</a>
          <a href="https://www.facebook.com" aria-label="Login with Facebook" className="text-blue-600">📘</a>
          <a href="https://www.indusguru.in/loginWith/linkedin" aria-label="Login with LinkedIn" className="text-blue-800">💼</a>
        </div>

        <div
          className="text-center text-blue-600 cursor-pointer text-sm pt-4 border-t mt-4"
          onClick={onSwitchToRegister}
        >
          Don't have an account? <span className="underline">Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
