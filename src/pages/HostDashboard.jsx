import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { APP_CONFIG } from '../data';

export default function HostDashboard({ session, coworkers, user }) {
  const [copying, setCopying] = useState(false);

  const closeSession = async () => {
    if (!window.confirm("متأكد من قفل الأوردر وحساب التوصيل؟")) return;
    await supabase.from('sessions').update({ status: 'closed' }).eq('id', session.id);
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/?session=${session.id}`;
    navigator.clipboard.writeText(url);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const aggregated = coworkers.reduce((acc, order) => {
    if (order.items) {
      order.items.forEach(item => {
        acc[item.id] = (acc[item.id] || 0) + item.quantity;
      });
    }
    return acc;
  }, {});

  const totalDelivery = session.delivery_fee;
  const numPeople = Math.max(1, coworkers.length);
  const deliveryPerPerson = (totalDelivery / numPeople).toFixed(2);

  if (session.status === 'closed') {
    // Show Closed Ledger
    const totalCollected = coworkers.reduce((sum, order) => {
      const orderTotal = (order.items || []).reduce((s, i) => s + (i.price * i.quantity), 0);
      return sum + orderTotal + parseFloat(deliveryPerPerson);
    }, 0);

    return (
      <section className="card active-screen fade-in">
        <div className="card-header text-center">
          <i className="fa-solid fa-lock" style={{fontSize: '2rem', color: 'var(--accent)'}}></i>
          <h2>تم إغلاق الأوردر بنجاح! 🍽️</h2>
          <p>ملخص المكالمة لتطلب من مطعم {session.restaurant_name} ومتابعة حسابات الزملاء:</p>
        </div>
        <div className="card-body">
          <div className="status-box status-ordering text-center">
            <h3><i className="fa-solid fa-phone"></i> اتصل بالمطعم لتسجيل الطلب</h3>
            <p>املهم الطلبات المجمعة التالية دفعة واحدة:</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '10px'}}>
              {Object.keys(aggregated).map(id => {
                const item = APP_CONFIG.restaurant.items.find(i => i.id === id);
                return (
                  <span key={id} className="badge badge-connected" style={{fontSize: '1rem'}}>
                    {aggregated[id]}x {item.name_ar}
                  </span>
                );
              })}
            </div>
          </div>

          <h3 className="section-subtitle mt-4">دفتر تحصيل الحسابات</h3>
          <p style={{textAlign: 'center', marginBottom: '15px'}}>إجمالي المبلغ المحصل: <strong>{totalCollected.toFixed(2)} EGP</strong></p>
          
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'right'}}>
              <thead>
                <tr style={{borderBottom: '2px solid var(--border)'}}>
                  <th style={{padding: '10px'}}>الزميل</th>
                  <th style={{padding: '10px'}}>الطلب</th>
                  <th style={{padding: '10px'}}>المطلوب</th>
                </tr>
              </thead>
              <tbody>
                {coworkers.map(cw => {
                  const itemsTotal = (cw.items || []).reduce((s, i) => s + (i.price * i.quantity), 0);
                  const due = (itemsTotal + parseFloat(deliveryPerPerson)).toFixed(2);
                  return (
                    <tr key={cw.id} style={{borderBottom: '1px solid var(--border)'}}>
                      <td style={{padding: '10px', fontWeight: 'bold'}}>{cw.coworker_name}</td>
                      <td style={{padding: '10px', fontSize: '0.85rem'}}>
                        {(cw.items || []).map(i => `${i.quantity}x ${i.name_ar}`).join(', ')}
                      </td>
                      <td style={{padding: '10px', color: 'var(--accent)', fontWeight: 'bold'}}>{due}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <button className="btn btn-outline btn-block mt-4" onClick={() => window.location.href = '/'}>بدء أوردر جديد</button>
        </div>
      </section>
    );
  }

  // Active Dashboard View
  return (
    <section className="card active-screen fade-in">
      <div className="card-header text-center">
        <h2>لوحة المنسق</h2>
        <div className="badge badge-connected"><i className="fa-solid fa-circle-dot"></i> جاري الاستقبال...</div>
      </div>
      <div className="card-body">
        <button className="btn btn-outline btn-block" onClick={copyShareLink}>
          <i className="fa-solid fa-link"></i> {copying ? 'تم النسخ!' : 'نسخ رابط المشاركة للزملاء'}
        </button>

        <h3 className="section-subtitle mt-4">حالة الزملاء المشتركين</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {coworkers.map(cw => (
            <div key={cw.id} className={`status-box ${cw.status === 'done' ? 'status-done' : 'status-ordering'}`}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <strong>{cw.coworker_name}</strong>
                <span className="badge" style={{backgroundColor: cw.status === 'done' ? 'var(--accent)' : 'var(--bg-card)'}}>
                  {cw.status === 'done' ? 'جاهز ✅' : 'بيطلب...'}
                </span>
              </div>
              <div style={{fontSize: '0.85rem', marginTop: '5px'}}>
                {(cw.items || []).map(i => `${i.quantity}x ${i.name_ar}`).join(', ')}
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-subtitle mt-4">تجميع الأوردر اللحظي</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          {Object.keys(aggregated).map(id => {
            const item = APP_CONFIG.restaurant.items.find(i => i.id === id);
            return (
              <span key={id} className="badge badge-connected">
                {aggregated[id]}x {item.name_ar}
              </span>
            );
          })}
        </div>

        <button className="btn btn-primary btn-block mt-4" onClick={closeSession}>
          <i className="fa-solid fa-lock"></i> قفل الأوردر وحساب التوصيل 🔒
        </button>
      </div>
    </section>
  );
}
