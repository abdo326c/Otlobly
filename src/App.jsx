import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Join from './pages/Join';
import Menu from './pages/Menu';
import HostDashboard from './pages/HostDashboard';
import Receipt from './pages/Receipt';

export default function App() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const navigate = useNavigate();

  // Global State
  const [session, setSession] = useState(null);
  const [user, setUser] = useState({ id: null, role: null, name: null });
  const [cart, setCart] = useState({});
  const [coworkers, setCoworkers] = useState([]);

  // Subscriptions
  useEffect(() => {
    if (!session) return;
    const channel = supabase
      .channel(`public:orders:${session.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `session_id=eq.${session.id}` }, () => {
        fetchOrders();
      })
      .subscribe();
      
    const sessionChannel = supabase
      .channel(`public:sessions:${session.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` }, (payload) => {
        setSession(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(sessionChannel);
    };
  }, [session]);

  const fetchOrders = async () => {
    if (!session) return;
    const { data } = await supabase.from('orders').select('*').eq('session_id', session.id).order('updated_at', { ascending: true });
    if (data) setCoworkers(data);
  };

  const renderRoute = () => {
    if (session?.status === 'closed') {
      if (user.role === 'host') return <HostDashboard session={session} coworkers={coworkers} user={user} />;
      return <Receipt session={session} user={user} coworkers={coworkers} />;
    }

    if (user.role === 'host') {
      return <HostDashboard session={session} coworkers={coworkers} user={user} />;
    }

    if (user.role === 'coworker') {
      return <Menu session={session} user={user} cart={cart} setCart={setCart} />;
    }

    if (sessionId) {
      return <Join sessionId={sessionId} setSession={setSession} setUser={setUser} />;
    }

    return <Home setSession={setSession} setUser={setUser} />;
  };

  return (
    <>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="app-container">
        <header className="app-header">
          <div className="logo-area" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <i className="fa-solid fa-utensils logo-icon"></i>
            <div className="logo-text">
              <span className="logo-title">اطلبلي</span>
              <span className="logo-tagline">منسق الفطار الذكي في العمل</span>
            </div>
          </div>
        </header>

        <main className="app-main">
          {renderRoute()}
        </main>
      </div>
    </>
  );
}
