import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const FeaturedSuppliers = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const suppliers = [
    {
      id: 'fresh-greens',
      name: 'Fresh Greens Co.',
      category: 'Vegetables',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh vegetables display'
    },
    {
      id: 'bakery-delights',
      name: 'Bakery Delights',
      category: 'Bakery',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh bread and pastries display'
    },
    {
      id: 'dairy-fresh',
      name: 'Dairy Fresh Farm',
      category: 'Dairy',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh dairy products display'
    },
    {
      id: 'meat-masters',
      name: 'Meat Masters',
      category: 'Meat & Poultry',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh meat display'
    },
    {
      id: 'seafood-harbor',
      name: 'Seafood Harbor',
      category: 'Seafood',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Fresh seafood display'
    }
  ];

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 100);
    checkScrollButtons();
    
    // Add resize listener to recheck scroll buttons
    const handleResize = () => {
      setTimeout(checkScrollButtons, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      
      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      const scrollAmount = 400; // Increased scroll amount
      scrollRef.current.scrollBy({ 
        left: -scrollAmount, 
        behavior: 'smooth' 
      });
      setTimeout(checkScrollButtons, 500);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      const scrollAmount = 400; // Increased scroll amount
      scrollRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
      setTimeout(checkScrollButtons, 500);
    }
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(selectedSupplier?.id === supplier.id ? null : supplier);
  };

  const handleViewDetails = (supplierId, supplierName) => {
    navigate(`/supplier/${supplierId}`);
  };

  const handleContact = (supplierId, supplierName) => {
    navigate(`/contact/${supplierId}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star filled`}
        style={{ fontSize: '20px', marginRight: '2px' }}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="featured-suppliers">
      <div className="featured-container">
        <h1 className="featured-title">
          Featured Suppliers
        </h1>
        
        {selectedSupplier && (
          <div className="selected-supplier">
            Selected: <strong>{selectedSupplier.name}</strong> ({selectedSupplier.category})
          </div>
        )}
        
        <div className="featured-carousel">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className={`scroll-btn scroll-left ${canScrollLeft ? 'active' : 'disabled'}`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className={`scroll-btn scroll-right ${canScrollRight ? 'active' : 'disabled'}`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Suppliers grid */}
          <div 
            ref={scrollRef}
            className="suppliers-scroll"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: 'none'
            }}
          >
            {suppliers.map((supplier, index) => (
              <div 
                key={supplier.id}
                className={`featured-card ${selectedSupplier?.id === supplier.id ? 'selected' : ''} ${animateCards ? 'animate' : ''}`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
                onClick={() => handleSelectSupplier(supplier)}
              >
                <div className="featured-image">
                  <img 
                    src={supplier.image} 
                    alt={supplier.alt} 
                    className="featured-img"
                  />
                </div>
                
                <div className="featured-content">
                  <h3 className="featured-name">
                    {supplier.name}
                  </h3>
                  <p className="featured-category">
                    {supplier.category}
                  </p>
                  
                  <div className="featured-rating">
                    {renderStars(supplier.rating)}
                  </div>
                  
                  <div className="featured-actions">
                    <button 
                      className="featured-btn featured-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(supplier.id, supplier.name);
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="featured-btn featured-contact"
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
        <div className="scroll-indicators">
          {suppliers.map((_, index) => (
            <div
              key={index}
              className="scroll-dot"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSuppliers; 