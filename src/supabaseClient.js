import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://dokvzfetsgxcdntdqrks.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva3Z6ZmV0c2d4Y2RudGRxcmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NTE4OTgsImV4cCI6MjA5NTEyNzg5OH0.wBuLYz71k2BLa4cS7kU4X5EQrrCnLUHyzIp6i4vHzoA"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
