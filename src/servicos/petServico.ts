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
    formData.append('arquivo', arquivo)

    const response = await api.post<Anexo>(`/v1/pets/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async removerFoto(id: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/pets/${id}/fotos/${fotoId}`)
  },
}
