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
  let sessionId = searchParams.get('session');
  if (sessionId) {
    sessionId = sessionId.replace(/[^a-zA-Z0-9-]/g, "");
  }
  const navigate = useNavigate();

  // Global State with LocalStorage Initialization
  const [session, setSession] = useState(() => {
    try { const saved = localStorage.getItem('otlobly_session'); return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  
  const [user, setUser] = useState(() => {
    try { const saved = localStorage.getItem('otlobly_user'); return saved ? JSON.parse(saved) : { id: null, role: null, name: null, isOrdering: false }; } catch { return { id: null, role: null, name: null, isOrdering: false }; }
  });

  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem('otlobly_cart'); return saved ? JSON.parse(saved) : {}; } catch { return {}; }
  });

  const [coworkers, setCoworkers] = useState([]);

  // Persist State to LocalStorage
  useEffect(() => {
    if (session) localStorage.setItem('otlobly_session', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (user.id) localStorage.setItem('otlobly_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('otlobly_cart', JSON.stringify(cart));
  }, [cart]);

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

  // Fallback Polling & Visibility Change for Mobile Websocket Drops
  useEffect(() => {
    if (!session || session.status === 'closed') return;

    const fetchSessionState = async () => {
      const { data } = await supabase.from('sessions').select('*').eq('id', session.id).single();
      if (data && data.status !== session.status) {
        setSession(data);
      }
      fetchOrders();
    };

    // Poll every 10 seconds just in case
    const interval = setInterval(fetchSessionState, 10000);

    // Fetch immediately when the tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchSessionState();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session?.id, session?.status]);

  const renderRoute = () => {
    if (session?.status === 'closed') {
      if (user.role === 'host') return <HostDashboard session={session} coworkers={coworkers} user={user} setUser={setUser} />;
      return <Receipt session={session} user={user} coworkers={coworkers} />;
    }

    if (user.role === 'host') {
      // If host wants to place an order, show them the Menu
      if (user.isOrdering) {
        return <Menu session={session} user={user} cart={cart} setCart={setCart} setUser={setUser} />;
      }
      return <HostDashboard session={session} coworkers={coworkers} user={user} setUser={setUser} />;
    }

    if (user.role === 'coworker') {
      return <Menu session={session} user={user} cart={cart} setCart={setCart} setUser={setUser} />;
    }

    if (sessionId) {
      // If we already have a session locally matching the URL, skip Join and just rely on the roles above
      if (session?.id === sessionId && user.id) {
         // It will naturally fall through to the correct route based on role
      } else {
         return <Join sessionId={sessionId} setSession={setSession} setUser={setUser} />;
      }
    }

    // Default to Home if no session exists or URL doesn't have a session
    if (!session || !user.id) {
        return <Home setSession={setSession} setUser={setUser} />;
    }
    
    // If they have local state but no session in URL, redirect them to their session URL
    navigate(`/?session=${session.id}`);
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
