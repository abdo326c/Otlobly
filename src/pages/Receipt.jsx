import React from 'react';

export default function Receipt({ session, user, coworkers }) {
  const myOrder = coworkers.find(c => c.id === user.id);
  const items = myOrder?.items || [];
  
  const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const numPeople = Math.max(1, coworkers.length);
  const deliveryShare = session.delivery_fee / numPeople;
  const totalDue = subtotal + deliveryShare;

  return (
    <section className="card active-screen fade-in">
      <div className="card-header text-center">
        <i className="fa-solid fa-lock" style={{fontSize: '2rem', color: 'var(--accent)'}}></i>
        <h2>قُفِل الأوردر! 🔒</h2>
        <p>إليك ملخص طلبك وقيمة حسابك شاملة مصاريف التوصيل:</p>
      </div>
      <div className="card-body">
        <h3 className="section-subtitle">طلبك الشخصي:</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {items.map(i => (
            <div key={i.id} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)'}}>
              <span>{i.quantity}x {i.name_ar}</span>
              <span>{i.price * i.quantity} EGP</span>
            </div>
          ))}
        </div>
        
        <div style={{marginTop: '15px', padding: '15px', backgroundColor: 'rgba(255,107,107,0.1)', borderRadius: '8px', border: '1px dashed var(--accent)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
            <span>إجمالي الأصناف:</span>
            <span>{subtotal.toFixed(2)} EGP</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <span>نصيبك من التوصيل:</span>
            <span>{deliveryShare.toFixed(2)} EGP</span>
          </div>
          <hr style={{borderColor: 'var(--accent)', opacity: 0.3}} />
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)'}}>
            <span>المطلوب دفعه للمنسق ({session.host_name}):</span>
            <span>{totalDue.toFixed(2)} EGP</span>
          </div>
        </div>

        <button className="btn btn-outline btn-block mt-4" onClick={() => window.location.href = '/'}>
          الرجوع للرئيسية
        </button>
      </div>
    </section>
  );
}
