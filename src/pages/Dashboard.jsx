import React, { useState } from 'react';

export default function Dashboard() {
  const [inventory, setInventory] = useState({
    materialType: '',
    quantity: '',
    price: '',
    leadTime: '',
    certifications: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inventory updated:', inventory);
    setInventory({
      materialType: '',
      quantity: '',
      price: '',
      leadTime: '',
      certifications: ''
    });
  };

  return (
    <div className="bg-orange-50 min-h-screen p-10 font-sans w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        {/* Inventory Management Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl mb-6 text-gray-800">Manage Inventory</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-800 font-bold text-lg">Material Type:</label>
              <select
                name="materialType"
                value={inventory.materialType}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
                required
              >
                <option value="">Select material...</option>
                <option value="Steel">Steel</option>
                <option value="Aluminum">Aluminum</option>
                <option value="Copper">Copper</option>
                <option value="Plastic">Plastic</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-800 font-bold text-lg">Available Quantity (tons):</label>
              <input
                type="number"
                name="quantity"
                value={inventory.quantity}
                onChange={handleInputChange}
                placeholder="Enter available quantity..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-800 font-bold text-lg">Price per Ton (USD):</label>
              <input
                type="number"
                name="price"
                value={inventory.price}
                onChange={handleInputChange}
                placeholder="Enter price per ton..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-800 font-bold text-lg">Lead Time (days):</label>
              <input
                type="number"
                name="leadTime"
                value={inventory.leadTime}
                onChange={handleInputChange}
                placeholder="Enter lead time..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-800 font-bold text-lg">Certifications:</label>
              <textarea
                name="certifications"
                value={inventory.certifications}
                onChange={handleInputChange}
                placeholder="ISO 9001, REACH compliant, etc."
                className="w-full p-3 border-2 border-gray-300 rounded-lg min-h-[120px] resize-y"
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-bold shadow hover:bg-yellow-500 flex items-center gap-2"
            >
              📦 Update Inventory
            </button>
          </form>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl mb-6 text-gray-800">Performance Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: '⏰', value: '24', label: 'Active Orders' },
              { icon: '💰', value: '$187K', label: 'Monthly Revenue' },
              { icon: '🛡️', value: '96%', label: 'Reliability Score' },
              { icon: '📊', value: '89%', label: 'Customer Satisfaction' }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                <div className="text-gray-600 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl mb-6 text-gray-800">Recent Orders</h2>
        <div className="space-y-4">
          {[
            { id: '#1234', material: 'Steel (50 tons)', status: 'Pending', color: 'bg-yellow-400' },
            { id: '#1235', material: 'Aluminum (25 tons)', status: 'Shipped', color: 'bg-green-300' }
          ].map((order, index) => (
            <div key={index} className="p-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg flex justify-between">
              <div className="text-lg">
                <strong>Order {order.id}</strong> - {order.material}
              </div>
              <span className={`${order.color} text-gray-800 px-4 py-1 rounded-full text-sm font-bold`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
