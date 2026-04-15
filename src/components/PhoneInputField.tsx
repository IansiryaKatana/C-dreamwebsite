import clsx from 'clsx'
import PhoneInput, { type Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '@/styles/phone-input-overrides.css'

type Props = {
  id?: string
  value: string | null | undefined
  onChange: (value: string | undefined) => void
  /** Default country calling code UI (E.164 still stored). */
  defaultCountry?: Country
  variant?: 'public' | 'admin'
  disabled?: boolean
  'aria-invalid'?: boolean
  placeholder?: string
  className?: string
}

export function PhoneInputField({
  id,
  value,
  onChange,
  defaultCountry = 'AE',
  variant = 'public',
  disabled,
  'aria-invalid': ariaInvalid,
  placeholder = 'Phone number',
  className,
}: Props) {
  return (
    <PhoneInput
      id={id}
      international
      defaultCountry={defaultCountry}
      value={value?.trim() ? value : undefined}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      aria-invalid={ariaInvalid || undefined}
      className={clsx(
        variant === 'public' ? 'phone-input--public' : 'phone-input--admin',
        className,
      )}
    />
  )
}
