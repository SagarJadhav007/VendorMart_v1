import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const suppliers = [
  {
    id: 'fresh-greens',
    name: 'Fresh Greens Co.',
    category: 'Vegetables',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh vegetables display',
    email: 'contact@freshgreens.com',
    phone: '+1 555-123-4567',
    address: '123 Green St, Farmville',
    role: 'wholesaler',
    memberSince: '2022-01-15'
  },
  {
    id: 'bakery-delights',
    name: 'Bakery Delights',
    category: 'Bakery',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh bread and pastries display',
    email: 'info@bakerydelights.com',
    phone: '+1 555-234-5678',
    address: '456 Baker Ave, Breadtown',
    role: 'vendor',
    memberSince: '2021-11-03'
  },
  {
    id: 'dairy-fresh',
    name: 'Dairy Fresh Farm',
    category: 'Dairy',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh dairy products display',
    email: 'hello@dairyfresh.com',
    phone: '+1 555-345-6789',
    address: '789 Milk Rd, Cowcity',
    role: 'wholesaler',
    memberSince: '2023-02-20'
  },
  {
    id: 'meat-masters',
    name: 'Meat Masters',
    category: 'Meat & Poultry',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh meat display',
    email: 'support@meatmasters.com',
    phone: '+1 555-456-7890',
    address: '321 Steak Blvd, Carnivore City',
    role: 'vendor',
    memberSince: '2020-08-10'
  },
  {
    id: 'seafood-harbor',
    name: 'Seafood Harbor',
    category: 'Seafood',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Fresh seafood display',
    email: 'contact@seafoodharbor.com',
    phone: '+1 555-567-8901',
    address: '654 Ocean Dr, Seaside',
    role: 'wholesaler',
    memberSince: '2022-05-28'
  }
];

const iconStyle = { marginRight: 8, verticalAlign: 'middle' };

function SupplierDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplier = suppliers.find(s => s.id === id);

  if (!supplier) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Supplier Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fa', padding: 40 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 24, background: 'none', border: 'none', color: '#007bff', fontSize: 16, cursor: 'pointer' }}>&larr; Back</button>
      <div style={{
        maxWidth: 500,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={supplier.image} alt={supplier.alt} style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '50%', marginBottom: 24, border: '4px solid #e0e7ef' }} />
        <h2 style={{ marginBottom: 8 }}>{supplier.name}</h2>
        <span style={{
          background: '#e6f4ea',
          color: '#1a7f37',
          borderRadius: 12,
          padding: '4px 16px',
          fontSize: 14,
          marginBottom: 16,
        }}>{supplier.category}</span>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 22, color: '#f7b500', marginRight: 6 }}>{'★'.repeat(supplier.rating)}</span>
          <span style={{ color: '#888', fontSize: 15 }}>({supplier.rating}/5)</span>
        </div>
        <div style={{ width: '100%', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle}>📧</span>
            <span style={{ fontWeight: 500 }}>Email:</span>&nbsp;
            <span>{supplier.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle}>📞</span>
            <span style={{ fontWeight: 500 }}>Phone:</span>&nbsp;
            <span>{supplier.phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle}>📍</span>
            <span style={{ fontWeight: 500 }}>Address:</span>&nbsp;
            <span>{supplier.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={iconStyle}>🗓️</span>
            <span style={{ fontWeight: 500 }}>Member Since:</span>&nbsp;
            <span>{supplier.memberSince}</span>
          </div>
        </div>
        <button
          style={{
            marginTop: 12,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 28px',
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'background 0.2s',
          }}
          onClick={() => navigate(`/contact/${supplier.id}`)}
        >
          Contact Supplier
        </button>
      </div>
    </div>
  );
}

export default SupplierDetails; 