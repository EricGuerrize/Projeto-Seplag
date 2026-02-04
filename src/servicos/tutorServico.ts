import api from './api'
import type {
  TutorRequest,
  TutorResponse,
  TutorResponseComPets,
  PagedTutorResponse,
  Anexo,
} from '../tipos'

export const tutorServico = {
  async listar(pagina: number = 0, tamanho: number = 10): Promise<PagedTutorResponse> {
    const params = {
      page: pagina,
      size: tamanho,
    }

    const response = await api.get<PagedTutorResponse>('/v1/tutores', { params })
    return response.data
  },

  async buscarPorId(id: number): Promise<TutorResponseComPets> {
    const response = await api.get<TutorResponseComPets>(`/v1/tutores/${id}`)
    return response.data
  },

  async criar(tutor: TutorRequest): Promise<TutorResponse> {
    const response = await api.post<TutorResponse>('/v1/tutores', tutor)
    return response.data
  },

  async atualizar(id: number, tutor: TutorRequest): Promise<TutorResponse> {
    const response = await api.put<TutorResponse>(`/v1/tutores/${id}`, tutor)
    return response.data
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/v1/tutores/${id}`)
  },

  async adicionarFoto(id: number, arquivo: File): Promise<Anexo> {
    const formData = new FormData()
    formData.append('foto', arquivo)
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'tutorServico.ts:adicionarFoto:before',message:'Upload request',data:{tutorId:id,fileName:arquivo?.name,formKey:'foto'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2',runId:'post-fix'})}).catch(()=>{});
    // #endregion
    try {
      const response = await api.post<Anexo>(`/v1/tutores/${id}/fotos`, formData)
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'tutorServico.ts:adicionarFoto:success',message:'Upload response',data:{fotoId:response.data?.id,url:response.data?.url},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      return response.data
    } catch (err: unknown) {
      const ax = err as { response?: { status?: number; data?: unknown } }
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'tutorServico.ts:adicionarFoto:error',message:'Upload API error',data:{status:ax.response?.status,data:ax.response?.data},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      throw err
    }
  },

  async removerFoto(id: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/tutores/${id}/fotos/${fotoId}`)
  },

  async vincularPet(tutorId: number, petId: number): Promise<void> {
    await api.post(`/v1/tutores/${tutorId}/pets/${petId}`)
  },

  async desvincularPet(tutorId: number, petId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`)
  },
}
