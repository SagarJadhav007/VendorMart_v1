import { useState } from 'react';
import './OrderManagement.css';

function OrderManagement() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState('customer');

  
  const [orders, setOrders] = useState([
    {
      id: "SC-2024001",
      supplier: { name: "Fresh Produce Hub", avatar: "FP", color: "orange" },
      date: "2024-07-28",
      amount: "₹150.75",
      status: "delivered",
      statusColor: "green"
    },
    {
      id: "SC-2024002", 
      supplier: { name: "Spice Route Goods", avatar: "SR", color: "black" },
      date: "2024-07-27",
      amount: "₹89.50",
      status: "processing",
      statusColor: "blue"
    },
    {
      id: "SC-2024003",
      supplier: { name: "Dairy Delights Inc", avatar: "DD", color: "gray" },
      date: "2024-07-26", 
      amount: "₹234.20",
      status: "pending",
      statusColor: "yellow"
    },
    {
      id: "SC-2024004",
      supplier: { name: "Fresh Produce Hub", avatar: "FP", color: "orange" },
      date: "2024-07-25",
      amount: "₹175.30", 
      status: "delivered",
      statusColor: "green"
    },
    {
      id: "SC-2024005",
      supplier: { name: "Spice Route Goods", avatar: "SR", color: "black" },
      date: "2024-07-24",
      amount: "₹95.00", 
      status: "cancelled",
      statusColor: "red"
    },
    {
      id: "SC-2024006",
      supplier: { name: "Dairy Delights Inc", avatar: "DD", color: "gray" },
      date: "2024-07-23",
      amount: "₹320.45", 
      status: "delivered",
      statusColor: "green"
    },
    {
      id: "SC-2024007",
      supplier: { name: "Fresh Produce Hub", avatar: "FP", color: "orange" },
      date: "2024-07-22",
      amount: "₹145.80", 
      status: "processing",
      statusColor: "blue"
    },
    {
      id: "SC-2024008",
      supplier: { name: "Spice Route Goods", avatar: "SR", color: "black" },
      date: "2024-07-21",
      amount: "₹67.90", 
      status: "pending",
      statusColor: "yellow"
    },
    {
      id: "SC-2024009",
      supplier: { name: "Dairy Delights Inc", avatar: "DD", color: "gray" },
      date: "2024-07-20",
      amount: "₹189.25", 
      status: "delivered",
      statusColor: "green"
    },
    {
      id: "SC-2024010",
      supplier: { name: "Fresh Produce Hub", avatar: "FP", color: "orange" },
      date: "2024-07-19",
      amount: "₹276.40", 
      status: "processing",
      statusColor: "blue"
    },
    {
      id: "SC-2024011",
      supplier: { name: "Spice Route Goods", avatar: "SR", color: "black" },
      date: "2024-07-18",
      amount: "₹134.60", 
      status: "delivered",
      statusColor: "green"
    },
    {
      id: "SC-2024012",
      supplier: { name: "Dairy Delights Inc", avatar: "DD", color: "gray" },
      date: "2024-07-17",
      amount: "₹89.75", 
      status: "cancelled",
      statusColor: "red"
    }
  ]);

  const summaryData = [
    {
      title: "Total Orders",
      value: "12",
      description: "Across all suppliers",
      icon: "📦",
      color: "red"
    },
    {
      title: "Pending Deliveries", 
      value: "3",
      description: "Awaiting arrival",
      icon: "🚚",
      color: "yellow"
    },
    {
      title: "Completed This Month",
      value: "5",
      description: "Successful transactions",
      icon: "✅",
      color: "green"
    }
  ];

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Pending",
      processing: "Processing", 
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled"
    }
    return statusMap[status] || status
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="order-management">
      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Order Management</h1>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          {summaryData.map((card, index) => (
            <div key={index} className="summary-card">
              <div className="card-content">
                <div className="card-info">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-value">{card.value}</p>
                  <p className="card-description">{card.description}</p>
                </div>
                <div className={`card-icon ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="content-sections">
          {/* Recent Orders */}
          <div className="recent-orders">
            <div className="section-header">
              <h2 className="section-title">Recent Orders</h2>
              <p className="section-subtitle">Your latest activities at a glance.</p>
            </div>
            
            <div className="orders-list">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3 className="order-id">Order ID: {order.id}</h3>
                    <div className="supplier-info">
                      <div className={`supplier-avatar ${order.supplier.color}`}>
                        {order.supplier.avatar}
                      </div>
                      <span className="supplier-name">{order.supplier.name}</span>
                    </div>
                  </div>
                  
                  <div className="order-details">
                    <p className="order-date">Ordered on {order.date}</p>
                    <p className="order-amount">{order.amount}</p>
                  </div>
                  
                  <div className="order-footer">
                    <span className={`status-badge ${order.statusColor}`}>
                      {getStatusText(order.status)}
                    </span>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Orders Table */}
          <div className="all-orders">
            <div className="section-header">
              <h2 className="section-title">All Orders</h2>
              <p className="section-subtitle">A comprehensive list of all your orders.</p>
            </div>
            
            <div className="orders-table">
              <div className="table-header">
                <div className="table-cell sortable">
                  Order ID
                  <div className="sort-icons">
                    <span>↑</span>
                    <span>↓</span>
                  </div>
                </div>
                <div className="table-cell sortable">
                  Supplier
                  <div className="sort-icons">
                    <span>↑</span>
                    <span>↓</span>
                  </div>
                </div>
                <div className="table-cell sortable">
                  Date
                  <div className="sort-icons">
                    <span>↑</span>
                    <span>↓</span>
                  </div>
                </div>
                <div className="table-cell sortable">
                  Status
                  <div className="sort-icons">
                    <span>↑</span>
                    <span>↓</span>
                  </div>
                </div>
                <div className="table-cell sortable">
                  Amount
                  <div className="sort-icons">
                    <span>↑</span>
                    <span>↓</span>
                  </div>
                </div>
                <div className="table-cell">Actions</div>
              </div>
              
              <div className="table-body">
                {orders.map((order) => (
                  <div key={order.id} className="table-row">
                    <div className="table-cell">{order.id}</div>
                    <div className="table-cell">
                      <div className="supplier-info">
                        <div className={`supplier-avatar ${order.supplier.color}`}>
                          {order.supplier.avatar}
                        </div>
                        <span className="supplier-name">{order.supplier.name}</span>
                      </div>
                    </div>
                    <div className="table-cell">{order.date}</div>
                    <div className="table-cell">
                      <span className={`status-badge ${order.statusColor}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="table-cell">{order.amount}</div>
                    <div className="table-cell">
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
