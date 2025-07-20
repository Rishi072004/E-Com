import { useState } from 'react';

export default function Checkout({ cart, total, onPlaceOrder }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !phone) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    onPlaceOrder({ name, address, phone });
  };

  return (
    <div className="cart-summary">
      <h2>Checkout</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x {item.qty} (${(item.price * item.qty).toFixed(2)})
          </li>
        ))}
      </ul>
      <div style={{ margin: '16px 0', fontWeight: 600, fontSize: 18 }}>
        Total: ${total.toFixed(2)}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Shipping Address" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" style={{ background: '#0070f3', color: '#fff' }}>Place Order</button>
      </form>
    </div>
  );
} 