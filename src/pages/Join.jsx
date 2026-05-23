import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Join({ sessionId, setSession, setUser }) {
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [coworkerName, setCoworkerName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sessions').select('*').eq('id', sessionId).single();
    if (error || !data) {
      console.error("[Join] Session fetch error:", error);
      setError('هذا الأوردر غير موجود أو تم حذفه.');
    } else {
      setSessionData(data);
      if (data.status === 'closed') {
        setSession(data);
      }
    }
    setLoading(false);
  };

  const joinSession = async (e) => {
    e.preventDefault();
    if (!coworkerName) return;

    try {
      const { data, error } = await supabase.from('orders').insert({
        session_id: sessionData.id,
        coworker_name: coworkerName,
        status: 'ordering',
        items: []
      }).select().single();

      if (error) throw error;

      setSession(sessionData);
      setUser({ id: data.id, role: 'coworker', name: coworkerName });
    } catch (err) {
      alert("Error joining session: " + err.message);
    }
  };

  if (loading) return <section className="card active-screen"><div className="card-header text-center"><h2>جاري التحميل...</h2></div></section>;
  if (error) return <section className="card active-screen"><div className="card-header text-center"><h2 style={{color: 'red'}}>{error}</h2><button className="btn btn-outline" onClick={() => navigate('/')}>العودة للرئيسية</button></div></section>;

  return (
    <section className="card active-screen fade-in">
      <div className="card-header text-center">
        <i className="fa-solid fa-bell-concierge welcome-icon"></i>
        <h2>طلب فطار مفتوح! 🎉</h2>
        <p>دعاك <strong>{sessionData.host_name}</strong> للمشاركة في أوردر فطار من مطعم <strong>{sessionData.restaurant_name}</strong>.</p>
      </div>
      <div className="card-body">
        <form onSubmit={joinSession}>
          <div className="form-group">
            <label>اكتب اسمك للمشاركة معهم:</label>
            <input type="text" className="form-control" required placeholder="مثال: عمر، نادين..." value={coworkerName} onChange={e => setCoworkerName(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            <i className="fa-solid fa-right-to-bracket"></i> معاكوا 🙋‍♂️
          </button>
        </form>
      </div>
    </section>
  );
}
