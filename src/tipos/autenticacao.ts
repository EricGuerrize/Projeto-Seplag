export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}

export interface TokenRefreshRequest {
  refresh_token: string
}

export interface TokenRefreshResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}
