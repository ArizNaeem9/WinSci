"use client";

const inputCls =
  "min-h-12 w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-primary";

export function Field({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  value,
  onChange,
  inputMode,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

export function TextArea({
  id,
  label,
  placeholder,
  required = false,
  rows = 3,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-primary"
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold text-foreground">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} cursor-pointer`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface text-foreground">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
