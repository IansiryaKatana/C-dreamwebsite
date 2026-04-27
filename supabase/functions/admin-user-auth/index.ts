import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type RequestBody =
  | {
      action: 'create_user'
      email: string
      password: string
      fullName?: string
    }
  | {
      action: 'set_password'
      userId: string
      password: string
    }

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405)

  try {
    const supabaseUrl = Deno.env.get('APP_SUPABASE_URL')?.trim() || Deno.env.get('SUPABASE_URL')?.trim()
    const serviceRoleKey =
      Deno.env.get('APP_SUPABASE_SERVICE_ROLE_KEY')?.trim() ||
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim()
    if (!supabaseUrl || !serviceRoleKey) {
      return json({ ok: false, error: 'Missing Supabase service env for function.' }, 500)
    }

    const authHeader = req.headers.get('Authorization') ?? req.headers.get('authorization')
    if (!authHeader?.toLowerCase().startsWith('bearer ')) {
      return json({ ok: false, error: 'Missing bearer token.' }, 401)
    }
    const jwt = authHeader.slice(7).trim()
    if (!jwt) return json({ ok: false, error: 'Missing bearer token.' }, 401)

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const {
      data: { user },
      error: userErr,
    } = await admin.auth.getUser(jwt)
    if (userErr || !user?.id || !user.email) return json({ ok: false, error: 'Invalid auth token.' }, 401)

    const callerEmail = normalizeEmail(user.email)
    const { data: callerRow, error: callerErr } = await admin
      .from('admin_users')
      .select('role, is_active')
      .or(`auth_user_id.eq.${user.id},email.eq.${callerEmail}`)
      .limit(1)
      .maybeSingle()
    if (callerErr) return json({ ok: false, error: callerErr.message }, 500)
    if (!callerRow || !callerRow.is_active || !['owner', 'admin'].includes(callerRow.role)) {
      return json({ ok: false, error: 'Not allowed.' }, 403)
    }

    const body = (await req.json()) as RequestBody
    if (!body || typeof body !== 'object' || !('action' in body)) {
      return json({ ok: false, error: 'Invalid request body.' }, 400)
    }

    if (body.action === 'create_user') {
      const email = normalizeEmail(body.email ?? '')
      const password = (body.password ?? '').trim()
      if (!email) return json({ ok: false, error: 'Email is required.' }, 400)
      if (password.length < 8) {
        return json({ ok: false, error: 'Password must be at least 8 characters.' }, 400)
      }
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: (body.fullName ?? '').trim(),
        },
      })
      if (error) return json({ ok: false, error: error.message }, 400)
      return json({
        ok: true,
        user: { id: data.user?.id ?? null, email: data.user?.email ?? email },
      })
    }

    if (body.action === 'set_password') {
      const userId = (body.userId ?? '').trim()
      const password = (body.password ?? '').trim()
      if (!userId) return json({ ok: false, error: 'User ID is required.' }, 400)
      if (password.length < 8) {
        return json({ ok: false, error: 'Password must be at least 8 characters.' }, 400)
      }
      const { error } = await admin.auth.admin.updateUserById(userId, { password })
      if (error) return json({ ok: false, error: error.message }, 400)
      return json({ ok: true })
    }

    return json({ ok: false, error: 'Unknown action.' }, 400)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return json({ ok: false, error: message }, 500)
  }
})
