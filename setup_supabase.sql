-- ==========================================
-- Otlobly (اطلبلي) - Supabase Setup Script
-- ==========================================
-- Instructions:
-- 1. Go to your Supabase Dashboard (https://supabase.com).
-- 2. Open your project, click on "SQL Editor" in the left sidebar.
-- 3. Click "New Query", paste this entire script, and click "Run".
-- 4. That's it! Your tables are ready and Real-time syncing is activated.

-- 1. Create SESSIONS table (tracks breakfast order sessions)
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    host_name TEXT NOT NULL,
    restaurant_name TEXT NOT NULL DEFAULT 'ويشا',
    delivery_fee NUMERIC NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
    phone_number TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed'))
);

-- 2. Create ORDERS table (tracks individual coworker choices)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
    coworker_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ordering' CHECK (status IN ('ordering', 'done')),
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    paid BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create index for performance
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON public.orders(session_id);

-- 4. Enable Realtime Replication
-- Check if publication exists first, then add tables
DO $$
BEGIN
    -- Check if supabase_realtime publication exists
    IF EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
        -- Add tables to the publication for real-time updates
        ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
    END IF;
END $$;

-- 5. Enable Row Level Security (RLS) - we bypass by using anon key for public use,
-- but let's add basic permissive policies so anyone with the anon key can read/write.
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read sessions" ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Allow public insert sessions" ON public.sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update sessions" ON public.sessions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete sessions" ON public.sessions FOR DELETE USING (true);

CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete orders" ON public.orders FOR DELETE USING (true);
