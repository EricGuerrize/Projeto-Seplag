import api from './api'
import {
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
    formData.append('arquivo', arquivo)

    const response = await api.post<Anexo>(`/v1/tutores/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
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
