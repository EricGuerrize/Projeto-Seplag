import api from './api'

const API_BASE_URL = 'https://pet-manager-api.geia.vip'

export const healthServico = {
  async verificarApi(): Promise<{ online: boolean; latencia: number }> {
    const inicio = Date.now()
    try {
      await api.get('/v1/pets', { params: { page: 0, size: 1 } })
      return { online: true, latencia: Date.now() - inicio }
    } catch {
      return { online: false, latencia: 0 }
    }
  },

  verificarApp() {
    return {
      versao: import.meta.env.VITE_APP_VERSION || '1.0.0',
      ambiente: import.meta.env.MODE,
      baseUrl: API_BASE_URL,
    }
  },
}
