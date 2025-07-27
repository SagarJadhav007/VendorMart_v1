import React, { useState, useEffect, useRef } from 'react';

const FeaturedSuppliers = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  const suppliers = [
    {
      id: 'fresh-greens',
      name: 'Fresh Greens Co.',
      category: 'Vegetables',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh vegetables display',
    },
    {
      id: 'bakery-delights',
      name: 'Bakery Delights',
      category: 'Bakery',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh bread and pastries display',
    },
    {
      id: 'dairy-fresh',
      name: 'Dairy Fresh Farm',
      category: 'Dairy',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh dairy products display',
    },
    {
      id: 'meat-masters',
      name: 'Meat Masters',
      category: 'Meat & Poultry',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh meat display',
    },
    {
      id: 'seafood-harbor',
      name: 'Seafood Harbor',
      category: 'Seafood',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh seafood display',
    },
  ];

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(selectedSupplier?.id === supplier.id ? null : supplier);
  };

  const handleViewDetails = (supplierId, supplierName) => {
    console.log(`Viewing details for: ${supplierId}`);
    alert(`Viewing details for ${supplierName}`);
  };

  const handleContact = (supplierId, supplierName) => {
    console.log(`Contacting: ${supplierId}`);
    alert(`Contacting ${supplierName}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-red-500 text-xl mr-0.5 transition-transform duration-200 hover:scale-110 ${
          index < rating ? 'opacity-100' : 'opacity-30'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 font-sans">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Suppliers
        </h1>

        {selectedSupplier && (
          <div className="text-center mb-8 p-4 bg-yellow-100 rounded-lg text-yellow-800 max-w-md mx-auto">
            Selected: <strong>{selectedSupplier.name}</strong> ({selectedSupplier.category})
          </div>
        )}

        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-yellow-400 hover:scale-110'
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'opacity-100 hover:bg-yellow-400 hover:scale-110'
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Suppliers grid */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto py-4 px-14 scroll-smooth no-scrollbar"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: 'none',
            }}
          >
            {suppliers.map((supplier, index) => (
              <div
                key={supplier.id}
                className={`
                  bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 
                  min-w-[350px] flex-shrink-0 cursor-pointer border-4 border-transparent
                  ${
                    selectedSupplier?.id === supplier.id
                      ? 'border-yellow-400 shadow-yellow-200 -translate-y-1 shadow-2xl'
                      : 'hover:-translate-y-2 hover:shadow-xl'
                  }
                  ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
                onClick={() => handleSelectSupplier(supplier)}
              >
                <div className="overflow-hidden">
                  <img
                    src={supplier.image}
                    alt={supplier.alt}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{supplier.name}</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                    {supplier.category}
                  </p>

                  <div className="flex mb-6">{renderStars(supplier.rating)}</div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 px-4 py-2.5 text-white bg-yellow-400 border-2 border-gray-200 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(supplier.id, supplier.name);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="flex-1 px-4 py-2.5 bg-yellow-400 text-white border-2 border-red-500 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:-translate-y-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContact(supplier.id, supplier.name);
                      }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {suppliers.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSuppliers;
