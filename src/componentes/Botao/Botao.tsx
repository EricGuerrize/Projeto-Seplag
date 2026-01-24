import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variante?: 'primario' | 'secundario' | 'perigo'
  tamanho?: 'pequeno' | 'medio' | 'grande'
}

export const Botao = ({
  children,
  variante = 'primario',
  tamanho = 'medio',
  className = '',
  ...props
}: BotaoProps) => {
  const classesVariante = {
    primario: 'bg-blue-600 hover:bg-blue-700 text-white',
    secundario: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    perigo: 'bg-red-600 hover:bg-red-700 text-white',
  }

  const classesTamanho = {
    pequeno: 'px-3 py-1.5 text-sm',
    medio: 'px-4 py-2 text-base',
    grande: 'px-6 py-3 text-lg',
  }

  const classesBase = 'rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <button
      className={`${classesBase} ${classesVariante[variante]} ${classesTamanho[tamanho]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
