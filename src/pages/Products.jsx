import { useState } from 'react';

const mockProducts = [
  { id: 1, name: 'T-Shirt', price: 19.99, image: '', description: 'Comfortable cotton t-shirt.' },
  { id: 2, name: 'Sneakers', price: 49.99, image: '', description: 'Stylish running sneakers.' },
  { id: 3, name: 'Backpack', price: 29.99, image: '', description: 'Durable travel backpack.' },
  { id: 4, name: 'Watch', price: 99.99, image: '', description: 'Elegant wrist watch.' },
];

export default function Products({ products, addToCart, view }) {
  const [modalProduct, setModalProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className={view === 'grid' ? 'products-grid' : 'products-list'}>
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
              style={{ cursor: 'pointer' }}
              onClick={() => setModalProduct(product)}
            />
            <h3 style={{ cursor: 'pointer' }} onClick={() => setModalProduct(product)}>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <p style={{ fontSize: 14, color: '#666' }}>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button
              className="wishlist-btn"
              onClick={() => toggleWishlist(product.id)}
              style={{ background: wishlist.includes(product.id) ? '#ff4d4f' : '#fff', color: wishlist.includes(product.id) ? '#fff' : '#ff4d4f' }}
            >
              {wishlist.includes(product.id) ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        ))}
      </div>
      {modalProduct && (
        <div className="modal-bg" onClick={() => setModalProduct(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <img src={modalProduct.image} alt={modalProduct.name} />
            <h2>{modalProduct.name}</h2>
            <p>${modalProduct.price.toFixed(2)}</p>
            <p>{modalProduct.description}</p>
            <button className="close-btn" onClick={() => setModalProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
} 