"use client";
import { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-orange-500">Street Connect</h1>
          <nav className="flex gap-6 text-gray-700">
            <a href="#">Home</a>
            <a href="#">Suppliers</a>
            <a href="#">Orders</a>
            <a href="#" className="text-orange-500 font-semibold">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto flex-1 p-6">
        <h2 className="text-3xl font-bold text-center mb-2">
          Get in Touch with Street Connect
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We’re here to support your street food business. Reach out to us for any questions or assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Send Message */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold">Send Us a Message</h3>
            <p className="text-sm text-gray-500">
              We’re here to help! Please fill out the form below with details about your request.
            </p>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="">Select an option</option>
              <option value="support">Support</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
            </select>
            <input
              type="email"
              placeholder="vendor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              placeholder="Brief summary of your request"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Please provide more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input type="file" onChange={handleFileChange} />
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
              Submit Request
            </button>
          </div>

          {/* Immediate Help */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold">Need Immediate Help?</h3>
            <p className="text-sm text-gray-500">
              You can also reach us through the following channels.
            </p>
            <div>
              <h4 className="font-semibold text-lg">Call Us</h4>
              <p className="text-gray-600 text-sm">
                For urgent matters, call our support line: <br />
                <span className="text-orange-500 font-bold">+1 (800) 555-0199</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Email Us</h4>
              <p className="text-gray-600 text-sm">
                Send us an email: <br />
                <span className="text-orange-500">support@streetconnect.com</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Quick Answers</h4>
              <button className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded">
                Check our FAQ
              </button>
            </div>
            <div className="flex gap-4 text-gray-600 mt-4">
              <a href="#">🌐</a>
              <a href="#">🐦</a>
              <a href="#">📸</a>
              <a href="#">🔗</a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <img
            src="/banner.jpg"
            alt="Happy vendor"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </main>

      <footer className="bg-gray-100 text-center py-4 text-gray-600">
        © 2023 Street Connect
      </footer>
    </div>
  );
}
