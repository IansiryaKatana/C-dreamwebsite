import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { SectionShell } from '../components/SectionShell'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function FollowLightSection() {
  const [email, setEmail] = useState('')
  const [attempted, setAttempted] = useState(false)

  const trimmed = email.trim()
  const emptyError = Boolean(attempted && trimmed.length === 0)
  const formatError = Boolean(
    attempted && trimmed.length > 0 && !isValidEmail(trimmed),
  )
  const showError = emptyError || formatError

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAttempted(true)
    if (!trimmed || !isValidEmail(trimmed)) return

    const subj = encodeURIComponent('Subscribe — Capital Dream')
    const body = encodeURIComponent(
      `Please add this email to private notes and listings updates:\n\n${trimmed}`,
    )
    window.location.href = `mailto:hello@vip.estate?subject=${subj}&body=${body}`
  }

  return (
    <SectionShell variant="cream" id="book">
      <div className="flex w-full flex-col items-center gap-8 py-4 sm:gap-10 sm:py-8 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex-1 text-center md:text-left">
          <h2 className="type-heading-display type-heading-display--follow font-display font-semibold leading-tight text-ink">
            Follow the light.
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-light text-ink/70 md:mx-0">
            Tell us what you are looking for — we reply within one business day
            with a clear next step.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-start md:w-auto md:min-w-[min(100%,20rem)] md:max-w-xl md:shrink-0"
          noValidate
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={showError || undefined}
              aria-describedby={
                showError ? 'subscribe-email-error' : undefined
              }
              className={`type-button w-full rounded-xl border bg-white/90 px-5 py-2.5 font-sans font-normal normal-case tracking-normal text-ink placeholder:text-ink/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/35 ${
                showError
                  ? 'border-terracotta'
                  : 'border-terracotta/35 focus-visible:border-terracotta/60'
              }`}
            />
            {showError ? (
              <p
                id="subscribe-email-error"
                className="px-2 text-sm text-terracotta"
                role="alert"
              >
                {emptyError
                  ? 'Enter your email address.'
                  : 'Enter a valid email address.'}
              </p>
            ) : null}
          </div>
          <Button
            type="submit"
            variant="outlineTerracotta"
            className="w-full shrink-0 uppercase tracking-[0.18em] sm:mt-0 sm:w-auto"
          >
            Join
          </Button>
        </form>
      </div>
    </SectionShell>
  )
}
