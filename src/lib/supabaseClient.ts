import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://efgimhmsyftshivhwcqk.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZ2ltaG1zeWZ0c2hpdmh3Y3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzI5OTcsImV4cCI6MjA3OTE0ODk5N30.oyDfK-G8Q-HaGlghePbmWDhT2sux9edaTtDBSnXu7QU";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const USERS_TABLE = "eb_users";

