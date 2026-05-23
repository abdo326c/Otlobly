import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { APP_CONFIG } from '../data';

export default function Menu({ session, user, cart, setCart, setUser }) {
  const [waiting, setWaiting] = useState(false);

  const addToCart = async (item) => {
    const newCart = { ...cart, [item.id]: (cart[item.id] || 0) + 1 };
    setCart(newCart);
    await syncCart(newCart);
  };

  const removeFromCart = async (item) => {
    if (!cart[item.id]) return;
    const newCart = { ...cart };
    newCart[item.id]--;
    if (newCart[item.id] === 0) delete newCart[item.id];
    setCart(newCart);
    await syncCart(newCart);
  };

  const syncCart = async (currentCart) => {
    const itemsDb = Object.keys(currentCart).map(itemId => {
      const itemDef = APP_CONFIG.restaurant.items.find(i => i.id === itemId);
      return {
        id: itemId,
        name_ar: itemDef.name_ar,
        name_en: itemDef.name_en,
        price: itemDef.price,
        quantity: currentCart[itemId]
      };
    });

    await supabase.from('orders').update({ items: itemsDb, updated_at: new Date() }).eq('id', user.id);
  };

  const finishOrder = async () => {
    await supabase.from('orders').update({ status: 'done' }).eq('id', user.id);
    if (user.role === 'host') {
      setUser(prev => ({ ...prev, isOrdering: false }));
    } else {
      setWaiting(true);
    }
  };

  const subtotal = Object.keys(cart).reduce((sum, id) => {
    const item = APP_CONFIG.restaurant.items.find(i => i.id === id);
    return sum + (item.price * cart[id]);
  }, 0);

  return (
    <section className="card active-screen fade-in">
      <div className="card-header text-center">
        <h2>{user.name}</h2>
        <div className="badge badge-connected"><i className="fa-solid fa-circle-dot"></i> جاري الطلب...</div>
      </div>
      <div className="card-body">
        {waiting ? (
          <div className="status-box status-ordering text-center">
            <i className="fa-solid fa-hourglass-half" style={{fontSize: '2rem', marginBottom: '10px', color: 'var(--accent)'}}></i>
            <h3>تم حفظ طلبك!</h3>
            <p>في انتظار المنسق ليقفل الأوردر ويحسب الحساب...</p>
          </div>
        ) : (
          <>
            <h3 className="section-subtitle">مطعم ويشا - قائمة الطعام</h3>
            <p className="text-center" style={{marginBottom: '15px'}}>اضغط على الأصناف لإضافتها لطلبك:</p>
            <div className="menu-grid">
              {APP_CONFIG.restaurant.items.map(item => (
                <button key={item.id} className="menu-item-btn" onClick={() => addToCart(item)}>
                  {cart[item.id] > 0 && <span className="item-counter-badge">{cart[item.id]}</span>}
                  <i className={`fa-solid ${item.icon} item-icon`}></i>
                  <span className="item-name">{item.name_ar}</span>
                  <span className="item-price">{item.price} EGP</span>
                </button>
              ))}
            </div>

            <div className="cart-container mt-4">
              <h3 className="section-subtitle"><i className="fa-solid fa-basket-shopping"></i> طلباتك الحالية</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {Object.keys(cart).map(id => {
                  const item = APP_CONFIG.restaurant.items.find(i => i.id === id);
                  return (
                    <div key={id} className="cart-item">
                      <div>
                        <strong>{item.name_ar}</strong>
                        <div style={{fontSize: '0.85rem', color: 'var(--text-light)'}}>
                          {cart[id]} x {item.price} = {cart[id] * item.price} EGP
                        </div>
                      </div>
                      <button className="btn-remove-qty" onClick={() => removeFromCart(item)}><i className="fa-solid fa-minus"></i></button>
                    </div>
                  );
                })}
              </div>
              <div className="cart-total-bar mt-4">
                <span>إجمالي الأصناف:</span>
                <span style={{fontWeight: 'bold', color: 'var(--accent)'}}>{subtotal} EGP</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block mt-4" onClick={finishOrder}>
              <i className="fa-solid fa-check"></i> خلصت الأوردر بتاعي ✅
            </button>
          </>
        )}
      </div>
    </section>
  );
}
