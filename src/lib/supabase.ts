
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpxzidmeawtdbkjeybdp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweHppZG1lYXd0ZGJramV5YmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNTQ2ODAsImV4cCI6MjA1NTYzMDY4MH0.Q1XvGwe8k7rj8RiBHq7NQH9SrPOpsYqsUNB4l7-Buu8';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
