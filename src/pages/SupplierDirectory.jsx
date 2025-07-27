import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FeaturedSuppliers from './FeaturedSuppliers'

function SupplierDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedRating, setSelectedRating] = useState('Any Rating')
  const [sortBy, setSortBy] = useState('Rating: High to Low')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

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
    }
    // ...rest of the suppliers
  ]

  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = suppliers

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(supplier => supplier.category === selectedCategory)
    }

    if (selectedRating !== 'Any Rating') {
      const minRating = parseInt(selectedRating.split('+')[0])
      filtered = filtered.filter(supplier => supplier.rating >= minRating)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.category.toLowerCase().includes(query) ||
        supplier.description.toLowerCase().includes(query)
      )
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Rating: High to Low': return b.rating - a.rating
        case 'Rating: Low to High': return a.rating - b.rating
        case 'Name: A to Z': return a.name.localeCompare(b.name)
        case 'Name: Z to A': return b.name.localeCompare(a.name)
        default: return 0
      }
    })
  }, [selectedCategory, selectedRating, searchQuery, sortBy])

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg transition-colors ${i < rating ? 'text-red-600' : 'text-gray-300'}`}>★</span>
    ))

  const handleViewDetails = (supplier) => navigate(`/supplier/${supplier.id}`)
  const handleContact = (supplier) => navigate(`/contact/${supplier.id}`)

  return (
    <div>
      <FeaturedSuppliers />
      <div className="flex flex-col md:flex-row bg-gray-50">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 w-80 h-screen bg-white p-6 shadow-md overflow-y-auto z-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-yellow-400">Filters</h2>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pr-10 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex justify-between cursor-pointer">Categories ▼</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-2 border rounded-md text-sm transition-all ${selectedCategory === category
                    ? 'bg-yellow-400 border-yellow-400 text-gray-900 font-semibold'
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-yellow-100 hover:border-yellow-400 hover:text-gray-900'
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex justify-between cursor-pointer">Rating ▼</h3>
            <div className="flex flex-col gap-2">
              <button
                className={`px-3 py-2 border rounded-md text-sm transition-all ${selectedRating === 'Any Rating'
                  ? 'bg-yellow-400 border-yellow-400 text-gray-900 font-semibold'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-yellow-100 hover:border-yellow-400 hover:text-gray-900'
                  }`}
                onClick={() => setSelectedRating('Any Rating')}
              >
                Any Rating
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`px-3 py-2 border rounded-md text-sm transition-all ${selectedRating === `${rating}+ Stars`
                    ? 'bg-yellow-400 border-yellow-400 text-gray-900 font-semibold'
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-yellow-100 hover:border-yellow-400 hover:text-gray-900'
                    }`}
                  onClick={() => setSelectedRating(`${rating}+ Stars`)}
                >
                  {rating}+ Stars
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-80 p-6 bg-white rounded-xl shadow-md min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b-4 border-yellow-400 gap-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              All Suppliers ({filteredAndSortedSuppliers.length} Results)
            </h1>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-500 font-semibold uppercase">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-yellow-400 rounded-lg bg-white text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
              >
                <option>Rating: High to Low</option>
                <option>Rating: Low to High</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Supplier Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-7 px-1">
            {filteredAndSortedSuppliers.length > 0 ? (
              filteredAndSortedSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col min-h-[26rem] transition-all hover:-translate-y-1 hover:shadow-xl hover:border-yellow-400"
                >
                  <div className="w-full h-56 overflow-hidden flex-shrink-0">
                    <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{supplier.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">{supplier.category}</p>
                    <div className="flex items-center gap-1 mb-4">{renderStars(supplier.rating)}</div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3 min-h-[4rem]">{supplier.description}</p>
                    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 flex-wrap">
                      <button
                        className="flex-1 px-3 py-2 bg-white text-gray-900 border-2 border-yellow-400 rounded-md text-xs font-bold uppercase tracking-wide hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                        onClick={() => handleViewDetails(supplier)}
                      >
                        View Details
                      </button>
                      <button
                        className="flex-1 px-3 py-2 bg-yellow-400 text-gray-900 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                        onClick={() => handleContact(supplier)}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-20 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No suppliers found</h3>
                <p className="text-base text-gray-500 leading-relaxed">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierDirectory
