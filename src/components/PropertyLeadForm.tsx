import clsx from 'clsx'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PhoneInputField } from '@/components/PhoneInputField'
import { getSupabase } from '@/integrations/supabase/client'
import type { PublicSalesperson } from '@/lib/cms/loadCmsSnapshot'
import { agentWhatsappUrl } from '@/lib/whatsapp'

type Props = {
  propertyId: string
  propertyTitle: string
  salesperson: PublicSalesperson | null
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export function PropertyLeadForm({
  propertyId,
  propertyTitle,
  salesperson,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const wa = agentWhatsappUrl(salesperson)
  const headline = salesperson
    ? `Speak with ${salesperson.name} about this property`
    : 'Capital Dream about this property'

  const thumb =
    salesperson?.profile_image_url?.trim() ||
    'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect fill="#6B3B34" width="64" height="64" rx="32"/><text x="32" y="38" text-anchor="middle" fill="#FAF7F2" font-size="20" font-family="system-ui">CD</text></svg>',
      )

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setAttempted(true)
    setErr(null)
    const n = name.trim()
    const em = email.trim()
    if (!n || !em || !isValidEmail(em)) return

    const sb = getSupabase()
    if (!sb) {
      setErr('Unable to send — site is not connected.')
      return
    }
    setBusy(true)
    const { error } = await sb.from('form_submissions').insert({
      source: 'property_enquiry',
      property_id: propertyId,
      property_title: propertyTitle,
      name: n,
      email: em,
      phone: phone?.trim() || null,
      message: message.trim() || null,
      meta: {
        salesperson_id: salesperson?.id ?? null,
        salesperson_name: salesperson?.name ?? null,
      },
    })
    setBusy(false)
    if (error) {
      setErr(error.message)
      return
    }
    setDone(true)
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setAttempted(false)
  }

  const field =
    'mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/40'

  return (
    <div
      className="rounded-2xl border border-terracotta/15 bg-white p-5 shadow-sm sm:p-6"
      style={{ color: '#4a2c28' }}
    >
      <div className="flex gap-3 border-b border-ink/10 pb-4">
        <img
          src={thumb}
          alt=""
          className="size-12 shrink-0 rounded-full object-cover"
          width={48}
          height={48}
        />
        <div className="min-w-0">
          <p className="font-display text-base font-semibold leading-snug text-terracotta">
            {headline}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wider text-ink/55">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline-offset-2 hover:underline"
              >
                Contact on WhatsApp
              </a>
            ) : null}
            {salesperson ? (
              <Link
                to="/about"
                className="text-terracotta underline-offset-2 hover:underline"
              >
                Agent details
              </Link>
            ) : (
              <Link
                to="/about"
                className="text-terracotta underline-offset-2 hover:underline"
              >
                About Capital Dream
              </Link>
            )}
          </div>
        </div>
      </div>

      {done ? (
        <p className="mt-6 text-sm leading-relaxed text-ink/75">
          Thank you — your enquiry was sent. A member of our team will be in touch
          shortly.
        </p>
      ) : (
        <form className="mt-5 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
          <div>
            <label className="text-[0.6875rem] font-semibold uppercase tracking-widest text-ink/55">
              Name
            </label>
            <input
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="name"
              aria-invalid={attempted && !name.trim()}
            />
            {attempted && !name.trim() ? (
              <p className="mt-1 text-xs text-red-600">Name is required.</p>
            ) : null}
          </div>
          <div>
            <label className="text-[0.6875rem] font-semibold uppercase tracking-widest text-ink/55">
              Email address
            </label>
            <input
              type="email"
              className={field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              aria-invalid={
                attempted && (!email.trim() || !isValidEmail(email.trim()))
              }
            />
            {attempted && !email.trim() ? (
              <p className="mt-1 text-xs text-red-600">Email is required.</p>
            ) : null}
            {attempted && email.trim() && !isValidEmail(email.trim()) ? (
              <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="property-lead-phone"
              className="text-[0.6875rem] font-semibold uppercase tracking-widest text-ink/55"
            >
              Phone number
            </label>
            <PhoneInputField
              id="property-lead-phone"
              value={phone}
              onChange={(v) => setPhone(v ?? '')}
              variant="public"
              defaultCountry="AE"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="text-[0.6875rem] font-semibold uppercase tracking-widest text-ink/55">
              Message
            </label>
            <textarea
              className={clsx(field, 'min-h-[120px] resize-y')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={4}
            />
          </div>
          {err ? <p className="text-xs text-red-600">{err}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="type-button font-display w-full rounded-xl bg-terracotta px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-terracotta/90 disabled:opacity-60"
          >
            {busy ? 'Sending…' : 'Send an enquiry'}
          </button>
        </form>
      )}
    </div>
  )
}
