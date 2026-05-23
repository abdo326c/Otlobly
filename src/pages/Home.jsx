import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Home({ setSession, setUser }) {
  const [hostName, setHostName] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(30);
  const [loading, setLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLobby();
  }, []);

  const fetchLobby = async () => {
    const { data } = await supabase.from('sessions').select('*').eq('status', 'open').order('created_at', { ascending: false });
    if (data) setActiveSessions(data);
  };

  const createSession = async (e) => {
    e.preventDefault();
    if (!hostName) return;
    setLoading(true);

    try {
      const { data: sessionData, error: sessionErr } = await supabase
        .from('sessions')
        .insert({
          host_name: hostName,
          restaurant_name: "ويشا (Wisha)",
          delivery_fee: deliveryFee,
          status: 'open'
        })
        .select().single();

      if (sessionErr) throw sessionErr;

      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .insert({
          session_id: sessionData.id,
          coworker_name: hostName,
          status: 'ordering',
          items: []
        })
        .select().single();

      if (orderErr) throw orderErr;

      setSession(sessionData);
      setUser({ id: orderData.id, role: 'host', name: hostName });
      navigate(`/?session=${sessionData.id}`);
    } catch (err) {
      alert("Error creating session: " + err.message);
    }
    setLoading(false);
  };

  const joinSession = (id) => {
    navigate(`/?session=${id}`);
  };

  return (
    <section className="card active-screen">
      <div className="card-header">
        <h2><i className="fa-solid fa-mug-hot"></i> افتح أوردر فطار جديد</h2>
        <p>ابدأ جلسة فطار اليوم ودع زملائك يضيفون طلباتهم بأنفسهم!</p>
      </div>
      <div className="card-body">
        <form onSubmit={createSession}>
          <div className="form-group">
            <label>اسمك (المنسّق):</label>
            <input type="text" className="form-control" value={hostName} onChange={e => setHostName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>المطعم:</label>
            <div className="restaurant-badge-input">
              <i className="fa-solid fa-store"></i>
              <span className="restaurant-name-fixed">ويشا (Wisha)</span>
            </div>
          </div>
          <div className="form-group">
            <label>تكلفة التوصيل (ج.م):</label>
            <div className="input-wrapper">
              <input type="number" className="form-control" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)} required min="0" />
              <span className="input-suffix">EGP</span>
            </div>
          </div>
          <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
            {loading ? 'جاري الفتح...' : 'فتح الأوردر وبدء الاستقبال 🚀'}
          </button>
        </form>

        {activeSessions.length > 0 && (
          <div className="lobby-section mt-4">
            <hr style={{ margin: '15px 0', borderTop: '1px solid var(--border)' }} />
            <h4 style={{ marginBottom: '15px', color: 'var(--text)' }}>أو انضم لأوردر مفتوح حالياً:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeSessions.map(s => (
                <button key={s.id} type="button" className="btn btn-outline btn-block" style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => joinSession(s.id)}>
                  <span><i className="fa-solid fa-users"></i> أوردر {s.host_name} - {s.restaurant_name}</span>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
