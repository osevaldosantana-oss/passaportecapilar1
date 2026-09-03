import { supabase } from "@/integrations/supabase/client";

export type ClientSummary = {
  id: string;
  full_name: string;
  passport_id: string;
  phone: string | null;
};

export async function listClients(limit?: number) {
  let query = supabase
    .from("clients")
    .select("id, full_name, passport_id, phone")
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createClient(fullName: string, phone: string | null) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("AUTH_REQUIRED");

  const { data, error } = await supabase
    .from("clients")
    .insert({
      user_id: userData.user.id,
      full_name: fullName,
      phone,
      passport_id: `PC-${Date.now()}`,
    })
    .select("id, full_name, passport_id, phone")
    .single();

  if (error) throw error;
  return data;
}
