
import { createClient } from '@supabase/supabase-js';

// Use empty strings as fallbacks to prevent immediate crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the client even with empty values - it will just fail gracefully on API calls
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
