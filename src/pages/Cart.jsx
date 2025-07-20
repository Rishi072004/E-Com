export default function Cart({ cart, changeQty, removeFromCart, clearCart, total }) {
  return (
    <div className="cart-summary">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>
                  <button onClick={() => changeQty(item.id, -1)} disabled={item.qty === 1}>-</button>
                  <span style={{ margin: '0 8px' }}>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                  <span style={{ marginLeft: 12 }}>${(item.price * item.qty).toFixed(2)}</span>
                  <button style={{ marginLeft: 12 }} onClick={() => removeFromCart(item.id)}>Remove</button>
                </span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16, fontWeight: 600, fontSize: 18 }}>
            Total: ${total.toFixed(2)}
          </div>
          <button style={{ marginTop: 16, background: '#ff4d4f' }} onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
} 