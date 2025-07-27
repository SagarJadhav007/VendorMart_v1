import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedSuppliers from './FeaturedSuppliers';
import '../App.css';
import "../Supplier.css"

function SupplierDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedRating, setSelectedRating] = useState('Any Rating')
  const [sortBy, setSortBy] = useState('Rating: High to Low')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();

  const categories = [
    'All Categories', 'Bakery', 'Beverages', 'Dairy Products', 'Frozen Foods',
    'Grains & Pulses', 'Kitchenware', 'Meat & Poultry', 'Oils & Sauces',
    'Packaging', 'Seafood', 'Spices & Herbs', 'Vegetables'
  ]

  const suppliers = [
    {
      id: 1,
      name: 'Bakery Delights',
      category: 'Bakery',
      rating: 5,
      description: 'Premium artisanal breads, pastries, and baked goods made with the finest ingredients.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Fresh Greens Co.',
      category: 'Vegetables',
      rating: 5,
      description: 'Organic vegetables and fresh produce sourced directly from local farms.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Local Dairy Farm',
      category: 'Dairy Products',
      rating: 4,
      description: 'Fresh milk, cheese, and dairy products from our family-owned farm.',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Golden Oils Co.',
      category: 'Oils & Sauces',
      rating: 5,
      description: 'Premium olive oils, cooking oils, and gourmet sauces for professional kitchens.',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Prime Meats Supply',
      category: 'Meat & Poultry',
      rating: 4,
      description: 'High-quality meats and poultry sourced from certified suppliers.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Spice Masters',
      category: 'Spices & Herbs',
      rating: 5,
      description: 'Exotic spices and fresh herbs from around the world for authentic flavors.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Wholesome Grains',
      category: 'Grains & Pulses',
      rating: 3,
      description: 'Organic grains, pulses, and whole foods for healthy meal preparation.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Ocean Catch Seafood',
      category: 'Seafood',
      rating: 5,
      description: 'Fresh seafood and fish delivered daily from sustainable sources.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Beverage Express',
      category: 'Beverages',
      rating: 4,
      description: 'Premium beverages, juices, and soft drinks for all occasions.',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Frozen Foods Plus',
      category: 'Frozen Foods',
      rating: 3,
      description: 'Quality frozen foods and ready-to-cook meals for convenience.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'Kitchen Essentials',
      category: 'Kitchenware',
      rating: 4,
      description: 'Professional kitchen equipment and utensils for commercial use.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Packaging Solutions',
      category: 'Packaging',
      rating: 5,
      description: 'Eco-friendly packaging materials and solutions for food businesses.',
      image: 'https://images.unsplash.com/photo-1588347818503-98ecf3d15004?w=400&h=300&fit=crop'
    }
  ]

  // Filter and sort suppliers
  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = suppliers

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(supplier => supplier.category === selectedCategory)
    }

    // Filter by rating
    if (selectedRating !== 'Any Rating') {
      const minRating = parseInt(selectedRating.split('+')[0])
      filtered = filtered.filter(supplier => supplier.rating >= minRating)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(supplier => 
        supplier.name.toLowerCase().includes(query) ||
        supplier.category.toLowerCase().includes(query) ||
        supplier.description.toLowerCase().includes(query)
      )
    }

    // Sort suppliers
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Rating: High to Low':
          return b.rating - a.rating
        case 'Rating: Low to High':
          return a.rating - b.rating
        case 'Name: A to Z':
          return a.name.localeCompare(b.name)
        case 'Name: Z to A':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return sorted
  }, [selectedCategory, selectedRating, searchQuery, sortBy])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ))
  }

  const handleViewDetails = (supplier) => {
    navigate(`/supplier/${supplier.id}`);
  };

  const handleContact = (supplier) => {
    navigate(`/contact/${supplier.id}`);
  };

  return (
    <div>
      {/* Featured Suppliers Section */}
      <FeaturedSuppliers />
      
      <div className="app">
        {/* Sidebar */}
        <div className="sidebar">
          <h2 className="sidebar-header">Filters</h2>
          
          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h3 className="filter-title">Categories ▼</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-option ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <h3 className="filter-title">Rating ▼</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedRating === 'Any Rating' ? 'selected' : ''}`}
                onClick={() => setSelectedRating('Any Rating')}
              >
                Any Rating
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`filter-option ${selectedRating === `${rating}+ Stars` ? 'selected' : ''}`}
                  onClick={() => setSelectedRating(`${rating}+ Stars`)}
                >
                  {rating}+ Stars
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1 className="main-title">All Suppliers ({filteredAndSortedSuppliers.length} Results)</h1>
            <div className="sort-container">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option>Rating: High to Low</option>
                <option>Rating: Low to High</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Supplier Grid */}
          <div className="supplier-grid">
            {filteredAndSortedSuppliers.length > 0 ? (
              filteredAndSortedSuppliers.map((supplier) => (
                <div key={supplier.id} className="supplier-card">
                  <div className="supplier-image">
                    <img src={supplier.image} alt={supplier.name} />
                  </div>
                  <div className="supplier-info">
                    <h3 className="supplier-name">{supplier.name}</h3>
                    <p className="supplier-category">{supplier.category}</p>
                    <div className="supplier-rating">
                      {renderStars(supplier.rating)}
                    </div>
                    <p className="supplier-description">{supplier.description}</p>
                    <div className="supplier-actions">
                      <button 
                        className="btn-view"
                        onClick={() => handleViewDetails(supplier)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn-contact"
                        onClick={() => handleContact(supplier)}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No suppliers found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierDirectory 