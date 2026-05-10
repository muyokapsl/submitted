import { createClient } from "@supabase/supabase-js";

export type RequestRow = {
  id: string;
  tracking_id: string;
  request_text: string;
  email: string | null;
  status: string;
  checked_count: number;
  created_at: string;
  updated_at: string;
};

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
