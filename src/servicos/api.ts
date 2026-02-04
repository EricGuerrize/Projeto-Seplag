import axios from 'axios'

const API_BASE_URL = 'https://pet-manager-api.geia.vip'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // #region agent log
    if (config.data instanceof FormData) {
      const ct = config.headers['Content-Type']
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:request:FormData',message:'FormData request',data:{url:config.url,contentType:ct},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1',runId:'post-fix'})}).catch(()=>{});
    }
    // #endregion
    // Backend @Consumes multipart: remove Content-Type para axios definir multipart/form-data com boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para renovar token quando expirar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.put(
            `${API_BASE_URL}/autenticacao/refresh`,
            { token: refreshToken }
          )

          const { token } = response.data
          localStorage.setItem('token', token)

          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
