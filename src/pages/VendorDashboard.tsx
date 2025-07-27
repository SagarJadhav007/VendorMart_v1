import React, { useState } from 'react';
import { Plus, Package, Clock, CheckCircle, Eye, MoreHorizontal, Filter, Search, Calendar } from 'lucide-react';

export default function VendorDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'VO-2024001',
      supplier: 'Fresh Produce Hub',
      date: '2024-07-28',
      status: 'delivered',
      amount: 12560.75,
      items: ['Organic Tomatoes', 'Fresh Basil', 'Bell Peppers']
    },
    {
      id: 'VO-2024002',
      supplier: 'Spice Route Goods',
      date: '2024-07-27',
      status: 'processing',
      amount: 7080.0,
      items: ['Cumin Powder', 'Cardamom', 'Bay Leaves']
    },
    {
      id: 'VO-2024003',
      supplier: 'Dairy Delights Inc.',
      date: '2024-07-27',
      status: 'pending',
      amount: 17541.5,
      items: ['Organic Milk', 'Artisan Cheese', 'Fresh Cream']
    },
    {
      id: 'VO-2024004',
      supplier: 'Meat Master',
      date: '2024-07-26',
      status: 'delivered',
      amount: 26670.0,
      items: ['Premium Beef', 'Free-range Chicken', 'Lamb Chops']
    },
    {
      id: 'VO-2024005',
      supplier: 'Baking Basics Co.',
      date: '2024-07-25',
      status: 'cancelled',
      amount: 5020.25,
      items: ['Flour', 'Baking Powder', 'Vanilla Extract']
    },
    {
      id: 'VO-2024006',
      supplier: 'Beverage Boosters',
      date: '2024-07-25',
      status: 'delivered',
      amount: 9580.0,
      items: ['Coffee Beans', 'Tea Leaves', 'Natural Syrups']
    }
  ];

  const recentOrders = orders.slice(0, 2);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSupplierInitials = (supplierName) => {
    return supplierName.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getSupplierColor = (supplierName) => {
    const colors = [
      'bg-orange-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const index = supplierName.length % colors.length;
    return colors[index];
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(order => order.status === 'processing' || order.status === 'pending').length;
  const completedThisMonth = orders.filter(order => order.status === 'delivered').length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = orders
    .filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear &&
        order.status === 'delivered';
    })
    .reduce((total, order) => total + order.amount, 0);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      background: '#ffffff',
      minHeight: '100vh',
      padding: '24px'
    }}>
      <div className="max-w-7xl mx-auto" style={{ backgroundColor: '#ffffff' }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors shadow-md">
            <Plus className="w-5 h-5 mr-2" />
            New Purchase
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 bg-white">
          <div className="bg-white rounded-xl border-2 border-purple-200 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="bg-orange-100 p-2 lg:p-3 rounded-lg">
                <Package className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{totalOrders}</div>
            <div className="text-gray-600 text-xs lg:text-sm">Total Purchases</div>
            <div className="text-gray-500 text-xs mt-1">Across all suppliers</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{pendingDeliveries}</div>
            <div className="text-gray-600 text-xs lg:text-sm">Pending Deliveries</div>
            <div className="text-gray-500 text-xs mt-1">Awaiting arrival</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="bg-green-100 p-2 lg:p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{completedThisMonth}</div>
            <div className="text-gray-600 text-xs lg:text-sm">Received This Month</div>
            <div className="text-gray-500 text-xs mt-1">Successful deliveries</div>
          </div>

          <div className="bg-white rounded-xl border-2 border-blue-200 p-4 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="bg-blue-100 p-2 lg:p-3 rounded-lg">
                <span className="text-blue-600 font-bold text-base lg:text-lg">₹</span>
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              ₹{monthlyExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-gray-600 text-xs lg:text-sm">Monthly Expenses</div>
            <div className="text-gray-500 text-xs mt-1">Delivered orders only</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white">
          {/* Recent Orders */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Purchases</h2>
              <p className="text-gray-600 text-sm mb-6">Your latest activities at a glance.</p>

              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-sm text-gray-600">Purchase ID: {order.id}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 ${getSupplierColor(order.supplier)}`}>
                        {getSupplierInitials(order.supplier)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{order.supplier}</div>
                        <div className="text-sm text-gray-500">Ordered on {order.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-900">
                        ₹ {order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-semibold text-sm px-3 py-1 rounded transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">All Purchases</h2>
                  <p className="text-gray-600 text-sm">A comprehensive list of all your purchases.</p>
                </div>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by supplier or purchase ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-500"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                  style={{ backgroundColor: 'white' }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                        Purchase ID
                        <Filter className="inline w-3 h-3 ml-1 text-gray-400" />
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                        Supplier
                        <Filter className="inline w-3 h-3 ml-1 text-gray-400" />
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                        Date
                        <Calendar className="inline w-3 h-3 ml-1 text-gray-400" />
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                        Status
                        <Filter className="inline w-3 h-3 ml-1 text-gray-400" />
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">
                        Amount
                        <Filter className="inline w-3 h-3 ml-1 text-gray-400" />
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-2 font-medium text-gray-900">{order.id}</td>
                        <td className="py-4 px-2 text-gray-700">{order.supplier}</td>
                        <td className="py-4 px-2 text-gray-600">{order.date}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-2 font-semibold text-gray-900">
                          ₹ {order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-2">
                          <button className="bg-white text-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-sm flex items-center px-3 py-2 rounded-lg border border-blue-600 shadow-sm transition-all duration-200">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No purchases found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
