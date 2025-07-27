import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [wholesalers, setWholesalers] = useState([]);
  const [newOrder, setNewOrder] = useState({
    wholesaler_id: "",
    items: [{ product_id: "", quantity: 1 }],
  });
  const [editIndex, setEditIndex] = useState(null); // null for add, index for edit

  useEffect(() => {
    // Fetch products for order form
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        // Extract unique wholesalers from products
        const wholesalerMap = {};
        res.data.forEach(p => {
          if (p.wholesaler_id && p.wholesaler_id._id) {
            wholesalerMap[p.wholesaler_id._id] = p.wholesaler_id;
          }
        });
        setWholesalers(Object.values(wholesalerMap));
      } catch (err) {
        setError("Failed to load products");
      }
    };
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Calculate summary values from dummy data
  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(o => o.status === "pending").length;
  const completedThisMonth = orders.filter(o => o.status === "completed").length;

  return (
    <div className="px-6 pb-6">
      <h2 className="text-2xl font-semibold mt-0 mb-4">Order Management</h2>

      {/* Modal for New Order */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border-2 border-[#FFD1B3] relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#FF6B4A] text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#FF6B4A]">Create New Order</h3>
            <form
              onSubmit={async e => {
                e.preventDefault();
                if (editIndex === null) {
                  try {
                    const token = localStorage.getItem("token");
                    await axios.post(
                      "http://localhost:5000/api/orders",
                      {
                        wholesaler_id: newOrder.wholesaler_id,
                        items: newOrder.items.map(item => ({
                          product_id: item.product_id,
                          quantity: Number(item.quantity)
                        })),
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    // Fetch latest orders after successful add
                    const res = await axios.get("http://localhost:5000/api/orders", {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setOrders(res.data || []);
                    alert("Order placed successfully!");
                  } catch (err) {
                    alert("Failed to add order to backend");
                  }
                } else {
                  // Local edit logic (not backend)
                  const updated = [...orders];
                  updated[editIndex] = {
                    ...updated[editIndex],
                    wholesaler_id: newOrder.wholesaler_id,
                    items: newOrder.items,
                  };
                  setOrders(updated);
                }
                setShowModal(false);
                setEditIndex(null);
                setNewOrder({ wholesaler_id: "", items: [{ product_id: "", quantity: 1 }] });
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-1 font-medium">Wholesaler</label>
                <select
                  className="w-full border border-[#FFD1B3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB380]"
                  value={newOrder.wholesaler_id}
                  onChange={e => setNewOrder({ ...newOrder, wholesaler_id: e.target.value })}
                  required
                >
                  <option value="">Select Wholesaler</option>
                  {wholesalers.map(w => (
                    <option key={w._id} value={w._id}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1 font-medium">Products</label>
                {newOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <select
                      className="flex-1 border border-[#FFD1B3] rounded-lg px-2 py-1"
                      value={item.product_id}
                      onChange={e => {
                        const items = [...newOrder.items];
                        items[idx].product_id = e.target.value;
                        setNewOrder({ ...newOrder, items });
                      }}
                      required
                    >
                      <option value="">Select Product</option>
                      {products
                        .filter(p => p.wholesaler_id && p.wholesaler_id._id === newOrder.wholesaler_id)
                        .map(p => (
                          <option key={p._id} value={p._id}>{p.name} (₹{p.price})</option>
                        ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      className="w-20 border border-[#FFD1B3] rounded-lg px-2 py-1"
                      value={item.quantity}
                      onChange={e => {
                        const items = [...newOrder.items];
                        items[idx].quantity = e.target.value;
                        setNewOrder({ ...newOrder, items });
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="text-red-500 font-bold px-2"
                      onClick={() => {
                        const items = newOrder.items.filter((_, i) => i !== idx);
                        setNewOrder({ ...newOrder, items: items.length ? items : [{ product_id: "", quantity: 1 }] });
                      }}
                      disabled={newOrder.items.length === 1}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-[#FFD1B3] hover:bg-[#FFB380] text-[#FF6B4A] font-semibold px-3 py-1 rounded shadow border border-[#FFB380] text-sm"
                  onClick={() => setNewOrder({ ...newOrder, items: [...newOrder.items, { product_id: "", quantity: 1 }] })}
                >
                  + Add Product
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FFD1B3] hover:bg-[#FFB380] text-[#FF6B4A] font-semibold px-5 py-2 rounded-lg shadow transition-colors border border-[#FFB380]"
              >
                Add Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6 mb-8 items-center">
        <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-500 text-sm font-medium mb-1">Total Orders</div>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="text-xs text-gray-400 mt-1">Across all suppliers</div>
          </div>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 7V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" stroke="#FF6B4A" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="7" width="18" height="14" rx="2" stroke="#FF6B4A" strokeWidth="1.5"/><path d="M8 11h8M8 15h5" stroke="#FF6B4A" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
        <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-500 text-sm font-medium mb-1">Pending Deliveries</div>
            <div className="text-2xl font-bold">{pendingDeliveries}</div>
            <div className="text-xs text-gray-400 mt-1">Awaiting arrival</div>
          </div>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 6v6l4 2" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="1.5"/></svg>
          </span>
        </div>
        <div className="flex-1 min-w-[220px] bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-500 text-sm font-medium mb-1">Completed This Month</div>
            <div className="text-2xl font-bold">{completedThisMonth}</div>
            <div className="text-xs text-gray-400 mt-1">Successful transactions</div>
          </div>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
        <button
          className="ml-auto bg-[#FFD1B3] hover:bg-[#FFB380] text-[#FF6B4A] font-semibold px-5 py-2 rounded-lg shadow transition-colors border border-[#FFB380]"
          type="button"
          onClick={() => setShowModal(true)}
        >
          + New Order
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Vendor</th>
            <th className="p-3 text-left">Wholesaler</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <tr key={order._id} className="border-t hover:bg-gray-100">
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.vendor_id?.name || "Vendor"}</td>
                <td className="p-3">{order.wholesaler_id?.name || "Wholesaler"}</td>
                <td className="p-3">₹{order.total_amount}</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-[#FFD1B3] hover:bg-[#FFB380] text-[#FF6B4A] font-semibold px-3 py-1 rounded shadow border border-[#FFB380] text-sm"
                    onClick={() => {
                      setEditIndex(idx);
                      setShowModal(true);
                      setNewOrder({
                        vendor: order.vendor_id?.name || "",
                        wholesaler: order.wholesaler_id?.name || "",
                        amount: order.total_amount,
                        status: order.status,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-100 hover:bg-red-300 text-red-600 font-semibold px-3 py-1 rounded shadow border border-red-200 text-sm"
                    onClick={() => {
                      const updated = [...orders];
                      updated.splice(idx, 1);
                      setOrders(updated);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
