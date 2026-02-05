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
    primario: 'bg-[var(--cor-primaria)] hover:bg-[var(--cor-primaria-escura)] text-white shadow-md hover:shadow-lg',
    secundario: 'bg-white border border-[var(--cor-primaria)] text-[var(--cor-primaria)] hover:bg-[var(--cor-primaria)] hover:text-white',
    perigo: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg',
  }

  const classesTamanho = {
    pequeno: 'px-3 py-1.5 text-sm',
    medio: 'px-5 py-2.5 text-base',
    grande: 'px-6 py-3 text-lg',
  }

  const classesBase = "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-['Source_Sans_3',sans-serif] cursor-pointer"

  return (
    <button
      className={`${classesBase} ${classesVariante[variante]} ${classesTamanho[tamanho]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
