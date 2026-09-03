import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseLogInput, parseListInput } from "./checkout-audit.schema";

export const logCheckoutEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(parseLogInput)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("checkout_events")
      .insert({
        user_id: userId,
        step: data.step,
        chapter: data.chapter ?? null,
        details: data.details ?? {},
      })
      .select("id, step, chapter, details, created_at")
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
      .select("id, step, chapter, details, created_at")
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
      .select("id, full_name, passport_id, avatar_url, created_at")
      .eq("id", userId)
      .single();
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
