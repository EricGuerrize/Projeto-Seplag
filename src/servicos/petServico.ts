import api from './api'
import type {
  PetRequest,
  PetResponse,
  PetResponseCompleto,
  PagedPetResponse,
  Anexo,
} from '../tipos'

export const petServico = {
  async listar(pagina: number = 0, tamanho: number = 10, busca?: string): Promise<PagedPetResponse> {
    const params: Record<string, string | number> = {
      page: pagina,
      size: tamanho,
    }

    if (busca) {
      params.nome = busca
    }

    const response = await api.get<PagedPetResponse>('/v1/pets', { params })
    return response.data
  },

  async buscarPorId(id: number): Promise<PetResponseCompleto> {
    const response = await api.get<PetResponseCompleto>(`/v1/pets/${id}`)
    return response.data
  },

  async criar(pet: PetRequest): Promise<PetResponse> {
    const response = await api.post<PetResponse>('/v1/pets', pet)
    return response.data
  },

  async atualizar(id: number, pet: PetRequest): Promise<PetResponse> {
    const response = await api.put<PetResponse>(`/v1/pets/${id}`, pet)
    return response.data
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/v1/pets/${id}`)
  },

  async adicionarFoto(id: number, arquivo: File): Promise<Anexo> {
    const formData = new FormData()
    formData.append('foto', arquivo)
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'petServico.ts:adicionarFoto:before',message:'Upload request',data:{petId:id,fileName:arquivo?.name,formKey:'foto'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    try {
      const response = await api.post<Anexo>(`/v1/pets/${id}/fotos`, formData)
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'petServico.ts:adicionarFoto:success',message:'Upload response',data:{fotoId:response.data?.id,url:response.data?.url},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      return response.data
    } catch (err: unknown) {
      const ax = err as { response?: { status?: number; data?: unknown } }
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'petServico.ts:adicionarFoto:error',message:'Upload API error',data:{status:ax.response?.status,data:ax.response?.data},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      throw err
    }
  },

  async removerFoto(id: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/pets/${id}/fotos/${fotoId}`)
  },
}
