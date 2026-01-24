import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { autenticacaoServico } from '../servicos/autenticacaoServico'
import type { AuthRequest, AuthResponse } from '../tipos'

interface AutenticacaoContextoType {
  autenticado: boolean
  carregando: boolean
  login: (credenciais: AuthRequest) => Promise<void>
  logout: () => void
}

const AutenticacaoContexto = createContext<AutenticacaoContextoType | undefined>(undefined)

export const useAutenticacao = () => {
  const contexto = useContext(AutenticacaoContexto)
  if (!contexto) {
    throw new Error('useAutenticacao deve ser usado dentro de AutenticacaoProvider')
  }
  return contexto
}

interface AutenticacaoProviderProps {
  children: ReactNode
}

export const AutenticacaoProvider = ({ children }: AutenticacaoProviderProps) => {
  const [autenticado, setAutenticado] = useState(false)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Verifica se já existe token salvo ao carregar a aplicação
    const token = autenticacaoServico.obterToken()
    if (token) {
      setAutenticado(true)
    }
    setCarregando(false)
  }, [])

  const login = async (credenciais: AuthRequest) => {
    try {
      const resposta: AuthResponse = await autenticacaoServico.login(credenciais)
      autenticacaoServico.salvarToken(resposta.access_token)
      localStorage.setItem('refreshToken', resposta.refresh_token)
      setAutenticado(true)
    } catch (erro) {
      throw erro
    }
  }

  const logout = () => {
    autenticacaoServico.logout()
    setAutenticado(false)
  }

  const valor = {
    autenticado,
    carregando,
    login,
    logout,
  }

  return (
    <AutenticacaoContexto.Provider value={valor}>
      {children}
    </AutenticacaoContexto.Provider>
  )
}
