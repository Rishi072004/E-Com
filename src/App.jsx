import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

const mockProducts = [
  { id: 1, name: 'T-Shirt', price: 19.99, image: 'https://source.unsplash.com/400x300/?tshirt,clothes', description: 'Comfortable cotton t-shirt.' },
  { id: 2, name: 'Sneakers', price: 49.99, image: 'https://source.unsplash.com/400x300/?sneakers,shoes', description: 'Stylish running sneakers.' },
  { id: 3, name: 'Backpack', price: 29.99, image: 'https://source.unsplash.com/400x300/?backpack,bag', description: 'Durable travel backpack.' },
  { id: 4, name: 'Watch', price: 99.99, image: 'https://source.unsplash.com/400x300/?watch,accessory', description: 'Elegant wrist watch.' },
  { id: 5, name: 'Sunglasses', price: 24.99, image: 'https://source.unsplash.com/400x300/?sunglasses,accessory', description: 'Trendy sunglasses for all seasons.' },
  { id: 6, name: 'Hat', price: 14.99, image: 'https://source.unsplash.com/400x300/?hat,cap', description: 'Cool and comfy hat.' },
];

function AppRoutes() {
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = (orderDetails) => {
    setOrder(orderDetails);
    navigate('/payment');
  };

  const handlePay = () => {
    clearCart();
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})</NavLink>
        <NavLink to="/checkout" className={({ isActive }) => isActive ? 'active' : ''}>Checkout</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={
          <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
            <h1>Simple E-Commerce Store</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: 8, fontSize: 16, width: 220 }}
              />
              <div>
                <button onClick={() => setView('grid')} style={{ marginRight: 8, fontWeight: view === 'grid' ? 'bold' : 'normal' }}>Grid</button>
                <button onClick={() => setView('list')} style={{ fontWeight: view === 'list' ? 'bold' : 'normal' }}>List</button>
              </div>
            </div>
            <Products products={filteredProducts} addToCart={addToCart} view={view} />
          </div>
        } />
        <Route path="/cart" element={
          <Cart cart={cart} changeQty={changeQty} removeFromCart={removeFromCart} clearCart={clearCart} total={total} />
        } />
        <Route path="/checkout" element={
          <Checkout cart={cart} total={total} onPlaceOrder={handlePlaceOrder} />
        } />
        <Route path="/payment" element={
          <Payment order={order || {}} total={total} onPay={handlePay} />
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
