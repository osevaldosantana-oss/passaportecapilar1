import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseLogInput, parseListInput } from "./checkout-audit.schema";

export const logCheckoutEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseLogInput)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    let professionalName = data.professionalName ?? null;
    if (!professionalName) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .maybeSingle();
      professionalName = profile?.full_name ?? null;
    }

    const { data: row, error } = await supabase
      .from("checkout_events")
      .insert({
        user_id: userId,
        step: data.step,
        chapter: data.chapter ?? null,
        client_id: data.clientId ?? null,
        client_name: data.clientName ?? null,
        professional_name: professionalName,
        status: data.status ?? "concluido",
        details: data.details ?? {},
      })
      .select("id, step, chapter, details, created_at, client_id, client_name, professional_name, status")
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

export const listCheckoutEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseListInput)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let query = supabase
      .from("checkout_events")
      .select("id, step, chapter, details, created_at, client_id, client_name, professional_name, status")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 10);

    if (data.step) query = query.eq("step", data.step);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getClientProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, passport_id, role_title, avatar_url, created_at")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const getAtendimentoExecution = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("atendimento_executions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (error) return null;
    return data;
  });
