export interface AuthRequest {
  usuario: string
  senha: string
}

export interface AuthResponse {
  token: string
  tipo: string
  expiracao: number
}

export interface TokenRefreshRequest {
  token: string
}

export interface TokenRefreshResponse {
  token: string
  tipo: string
  expiracao: number
}
