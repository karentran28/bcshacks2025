import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qpbpixoyyhwxoyqvcihp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYnBpeG95eWh3eG95cXZjaWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODI4MDcsImV4cCI6MjA1ODg1ODgwN30.uT2VRWEFmsKQ6ULbhYrmk7gFsKt1ezvmwOBdSbv0k1I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

