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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
