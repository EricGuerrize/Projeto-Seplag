import { useAutenticacao } from '../contextos/AutenticacaoContexto'

// Hook simplificado para facilitar o uso do contexto de autenticação
export const useAuth = () => {
  return useAutenticacao()
}
