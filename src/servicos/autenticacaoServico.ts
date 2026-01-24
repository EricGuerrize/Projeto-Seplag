import api from './api'
import type { AuthRequest, AuthResponse, TokenRefreshResponse } from '../tipos'

export const autenticacaoServico = {
  async login(credenciais: AuthRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/autenticacao/login', credenciais)
    return response.data
  },

  async renovarToken(token: string): Promise<TokenRefreshResponse> {
    const response = await api.put<TokenRefreshResponse>('/autenticacao/refresh', { token })
    return response.data
  },

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  },

  salvarToken(token: string): void {
    localStorage.setItem('token', token)
  },

  obterToken(): string | null {
    return localStorage.getItem('token')
  },
}
