import { useState } from 'react'
import '../App.css'

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Artisanal Bread Collection',
      supplier: 'Bakery Delights',
      supplierRating: 4.8,
      supplierReviews: 1247,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      price: 499.00,
      originalPrice: 599.00,
      quantity: 1,
      inStock: true,
      stockCount: 15,
      deliveryDays: 2,
      expressDelivery: true,
      expressDeliveryDays: 1,
      expressDeliveryCost: 99,
      selected: true,
      category: 'Bakery',
      description: 'Fresh baked artisanal breads including sourdough, whole wheat, and rye varieties.',
      bulkDiscount: {
        minQuantity: 3,
        discountPercent: 10
      },
      orderNotes: ''
    },
    {
      id: 2,
      name: 'Organic Fresh Vegetables Bundle',
      supplier: 'Fresh Greens Co.',
      supplierRating: 4.9,
      supplierReviews: 892,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
      price: 664.00,
      originalPrice: 664.00,
      quantity: 1,
      inStock: true,
      stockCount: 2,
      deliveryDays: 1,
      expressDelivery: false,
      expressDeliveryDays: null,
      expressDeliveryCost: null,
      selected: true,
      category: 'Vegetables',
      description: 'Fresh organic vegetables including tomatoes, lettuce, carrots, and seasonal greens.',
      bulkDiscount: null,
      orderNotes: ''
    },
    {
      id: 3,
      name: 'Premium Olive Oil Collection',
      supplier: 'Golden Oils Co.',
      supplierRating: 4.7,
      supplierReviews: 567,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
      price: 899.00,
      originalPrice: 999.00,
      quantity: 2,
      inStock: true,
      stockCount: 8,
      deliveryDays: 3,
      expressDelivery: true,
      expressDeliveryDays: 2,
      expressDeliveryCost: 149,
      selected: true,
      category: 'Oils & Sauces',
      description: 'Extra virgin olive oils and gourmet sauces for professional kitchens.',
      bulkDiscount: {
        minQuantity: 2,
        discountPercent: 15
      },
      orderNotes: ''
    }
  ])

  const [recommendations] = useState([
    {
      id: 101,
      name: 'Local Dairy Farm Fresh Milk',
      supplier: 'Local Dairy Farm',
      supplierRating: 4.6,
      supplierReviews: 1247,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=150&fit=crop',
      price: 299.00,
      originalPrice: 349.00,
      rating: 5,
      reviews: 1247,
      deliveryDays: 1,
      expressDelivery: true,
      expressDeliveryDays: 1,
      expressDeliveryCost: 79
    },
    {
      id: 102,
      name: 'Spice Masters Premium Collection',
      supplier: 'Spice Masters',
      supplierRating: 4.8,
      supplierReviews: 892,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop',
      price: 449.00,
      originalPrice: 549.00,
      rating: 5,
      reviews: 892,
      deliveryDays: 2,
      expressDelivery: true,
      expressDeliveryDays: 1,
      expressDeliveryCost: 99
    }
  ])

  const [loyaltyPoints, setLoyaltyPoints] = useState(1250)
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false)
  const [expressDeliverySelected, setExpressDeliverySelected] = useState({})

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const updateOrderNotes = (id, notes) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, orderNotes: notes } : item
      )
    )
  }

  const toggleExpressDelivery = (id) => {
    setExpressDeliverySelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const selectedItems = cartItems.filter(item => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => {
    let itemTotal = item.price * item.quantity
    
    // Apply bulk discount if applicable
    if (item.bulkDiscount && item.quantity >= item.bulkDiscount.minQuantity) {
      const discount = (itemTotal * item.bulkDiscount.discountPercent) / 100
      itemTotal -= discount
    }
    
    return sum + itemTotal
  }, 0)

  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate express delivery cost
  const expressDeliveryCost = selectedItems.reduce((sum, item) => {
    if (expressDeliverySelected[item.id] && item.expressDelivery) {
      return sum + item.expressDeliveryCost
    }
    return sum
  }, 0)

  // Calculate loyalty points discount
  const loyaltyDiscount = useLoyaltyPoints ? Math.min(loyaltyPoints * 0.1, subtotal * 0.1) : 0
  const finalTotal = subtotal + expressDeliveryCost - loyaltyDiscount

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ))
  }

  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`
  }

  const getDeliveryDate = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }

  const getBulkDiscount = (item) => {
    if (!item.bulkDiscount || item.quantity < item.bulkDiscount.minQuantity) return null
    
    const discount = (item.price * item.quantity * item.bulkDiscount.discountPercent) / 100
    return {
      amount: discount,
      percent: item.bulkDiscount.discountPercent,
      saved: formatPrice(discount)
    }
  }

  return (
    <div className="cart-page">
      {/* Top Banner */}
      <div className="cart-banner">
        <div className="banner-content">
          <span className="banner-icon">⚠️</span>
          <span className="banner-text">Important messages for items in your Cart:</span>
        </div>
        <div className="banner-message">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your Shopping Cart
        </div>
      </div>

      <div className="cart-container">
        {/* Main Cart Content */}
        <div className="cart-main">
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <button className="deselect-all">Deselect all items</button>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => {
              const bulkDiscount = getBulkDiscount(item)
              const isExpressSelected = expressDeliverySelected[item.id]
              
              return (
                <div key={item.id} className="cart-item">
                  <div className="item-checkbox">
                    <input 
                      type="checkbox" 
                      checked={item.selected}
                      onChange={() => {}}
                      className="checkbox"
                    />
                  </div>
                  
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <div className="item-header">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="supplier-info">
                        <span className="item-supplier">Sold by {item.supplier}</span>
                        <div className="supplier-rating">
                          {renderStars(item.supplierRating)}
                          <span className="rating-text">({item.supplierReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="item-description">{item.description}</p>
                    
                    <div className="item-status">
                      <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {item.inStock ? 'In stock' : 'Out of stock'}
                      </span>
                      {item.stockCount <= 5 && (
                        <span className="low-stock">Only {item.stockCount} left in stock</span>
                      )}
                    </div>

                    <div className="delivery-info">
                      <span className="delivery-text">
                        FREE delivery {getDeliveryDate(item.deliveryDays)}
                      </span>
                      {item.expressDelivery && (
                        <div className="express-delivery-option">
                          <label className="express-checkbox">
                            <input 
                              type="checkbox" 
                              checked={isExpressSelected}
                              onChange={() => toggleExpressDelivery(item.id)}
                            />
                            Express delivery {getDeliveryDate(item.expressDeliveryDays)} (+{formatPrice(item.expressDeliveryCost)})
                          </label>
                        </div>
                      )}
                    </div>

                    {bulkDiscount && (
                      <div className="bulk-discount">
                        <span className="discount-badge">🎉 Bulk Discount Applied!</span>
                        <span className="discount-text">Save {bulkDiscount.saved} ({bulkDiscount.percent}% off)</span>
                      </div>
                    )}

                    <div className="order-notes">
                      <textarea
                        placeholder="Add special instructions for this item..."
                        value={item.orderNotes}
                        onChange={(e) => updateOrderNotes(item.id, e.target.value)}
                        className="notes-input"
                        rows="2"
                      />
                    </div>

                    <div className="item-price">
                      <span className="current-price">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                      )}
                      <span className="price-per-unit">₹{(item.price / item.quantity).toFixed(2)} / unit</span>
                      {bulkDiscount && (
                        <span className="discount-price">After discount: {formatPrice(item.price * item.quantity - bulkDiscount.amount)}</span>
                      )}
                    </div>

                    <div className="item-actions">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button className="delete-btn" onClick={() => removeItem(item.id)}>
                        Delete
                      </button>
                      <button className="save-btn">Save for later</button>
                      <button className="share-btn">Share</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="cart-sidebar">
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items):</span>
                <span className="subtotal">{formatPrice(subtotal)}</span>
              </div>
              
              {expressDeliveryCost > 0 && (
                <div className="summary-row">
                  <span>Express Delivery:</span>
                  <span className="express-cost">+{formatPrice(expressDeliveryCost)}</span>
                </div>
              )}

              {loyaltyDiscount > 0 && (
                <div className="summary-row discount-row">
                  <span>Loyalty Points Discount:</span>
                  <span className="loyalty-discount">-{formatPrice(loyaltyDiscount)}</span>
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span className="final-total">{formatPrice(finalTotal)}</span>
              </div>

              <div className="loyalty-section">
                <div className="loyalty-info">
                  <span>Loyalty Points: {loyaltyPoints}</span>
                  <span className="points-value">(Worth {formatPrice(loyaltyPoints * 0.1)})</span>
                </div>
                <label className="loyalty-checkbox">
                  <input 
                    type="checkbox" 
                    checked={useLoyaltyPoints}
                    onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                  />
                  Use loyalty points (10% off up to ₹{Math.min(loyaltyPoints * 0.1, subtotal * 0.1).toFixed(2)})
                </label>
              </div>

              <button className="proceed-btn">
                Proceed to Buy
              </button>

              <div className="emi-info">
                <span>EMI Available</span>
                <span className="dropdown">▼</span>
              </div>

              <div className="security-info">
                <span className="security-icon">🔒</span>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h3 className="rec-title">Recommended for You</h3>
            {recommendations.map((item) => (
              <div key={item.id} className="rec-item">
                <img src={item.image} alt={item.name} className="rec-image" />
                <div className="rec-details">
                  <h4 className="rec-name">{item.name}</h4>
                  <p className="rec-supplier">{item.supplier}</p>
                  <div className="rec-rating">
                    {renderStars(item.rating)}
                    <span className="rec-reviews">({item.reviews})</span>
                  </div>
                  <div className="rec-price">
                    <span className="rec-current">{formatPrice(item.price)}</span>
                    {item.originalPrice > item.price && (
                      <span className="rec-original">{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                  <div className="rec-delivery">
                    ✓ FREE delivery {getDeliveryDate(item.deliveryDays)}
                    {item.expressDelivery && (
                      <span className="express-option"> | Express: {getDeliveryDate(item.expressDeliveryDays)} (+{formatPrice(item.expressDeliveryCost)})</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart 