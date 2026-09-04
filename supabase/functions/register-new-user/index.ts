// Edge function: cria automaticamente o papel de profissional para todo novo usuário.
// Chamada pelo frontend após signUp/signIn OAuth.
Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId é obrigatório' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Verifica se já existe
    const { data: existing } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ ok: true, already_existed: true }), {
        headers: corsHeaders,
      });
    }

    // Insere role profissional
    const { error } = await supabaseAdmin.from('user_roles').insert({
      user_id: userId,
      role: 'profissional',
    });

    if (error) {
      console.error('[register-new-user] erro ao criar role:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: corsHeaders,
    });
  } catch (e) {
    console.error('[register-new-user] erro:', e);
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
