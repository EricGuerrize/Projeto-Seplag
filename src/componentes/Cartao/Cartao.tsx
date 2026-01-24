import type { ReactNode } from 'react'

interface CartaoProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Cartao = ({ children, className = '', onClick }: CartaoProps) => {
  const classesBase = 'bg-white rounded-lg shadow-md p-4 border border-gray-200'
  const classesInterativo = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''

  return (
    <div
      className={`${classesBase} ${classesInterativo} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
