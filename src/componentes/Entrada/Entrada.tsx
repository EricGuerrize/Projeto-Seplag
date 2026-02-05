import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  erro?: string
}

export const Entrada = forwardRef<HTMLInputElement, EntradaProps>(
  ({ label, erro, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--cor-texto-suave)] mb-1 font-['Source_Sans_3',sans-serif]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cor-primaria)] focus:border-[var(--cor-primaria)] transition-all duration-200 font-['Source_Sans_3',sans-serif] ${
            erro ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {erro && (
          <p className="mt-1 text-sm text-red-600">{erro}</p>
        )}
      </div>
    )
  }
)

Entrada.displayName = 'Entrada'
