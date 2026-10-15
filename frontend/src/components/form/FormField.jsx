export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder = '',
  disabled = false,
  hint = '',
  required = true,
  max,
}) {
  const hasError = Boolean(error && touched)

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between gap-2 min-h-[22px]">
        <label
          htmlFor={name}
          className="text-sm font-bold text-paper-text dark:text-dark-text truncate"
        >
          {label} {required && <span className="text-accent">*</span>}
        </label>
        {hint && (
          <span className="text-xs font-normal text-paper-muted dark:text-dark-muted truncate">
            {hint}
          </span>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        max={max}
        className={`w-full px-4 py-3 rounded-xl bg-paper-bg dark:bg-dark-bg border text-paper-text dark:text-dark-text placeholder:text-paper-muted/60 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 transition-all ${
          hasError
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-paper-borderStrong dark:border-dark-border focus:border-accent focus:ring-accent/20'
        }`}
      />

      {hasError && (
        <span className="text-xs text-rose-500 font-medium mt-0.5 leading-snug">{error}</span>
      )}
    </div>
  )
}
