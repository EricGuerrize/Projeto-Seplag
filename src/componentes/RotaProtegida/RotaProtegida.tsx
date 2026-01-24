import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Carregando } from '../Carregando'

interface RotaProtegidaProps {
  children: ReactNode
}

export const RotaProtegida = ({ children }: RotaProtegidaProps) => {
  const { autenticado, carregando } = useAuth()

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
