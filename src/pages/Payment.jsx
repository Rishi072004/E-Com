import { useState } from 'react';

export default function Payment({ order, total, onPay }) {
  const [card, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!card || !cvv) {
      setError('Please enter card details.');
      return;
    }
    setError('');
    setSuccess(true);
    onPay();
  };

  if (success) {
    return (
      <div className="cart-summary">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase, {order.name}!</p>
        <p>Your order will be shipped to: {order.address}</p>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <h2>Payment</h2>
      <div style={{ marginBottom: 16 }}>
        <b>Order for:</b> {order.name}<br />
        <b>Shipping:</b> {order.address}<br />
        <b>Phone:</b> {order.phone}<br />
        <b>Total:</b> ${total.toFixed(2)}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="Card Number" value={card} onChange={e => setCard(e.target.value)} maxLength={16} />
        <input type="password" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} maxLength={4} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" style={{ background: '#0070f3', color: '#fff' }}>Pay Now</button>
      </form>
    </div>
  );
} 