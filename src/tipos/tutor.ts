import { Anexo } from './pet'

export interface PetBasico {
  id: number
  nome: string
  especie: string
  idade: number
  raca?: string
}

export interface Tutor {
  id: number
  nome: string
  telefone: string
  endereco: string
  fotos?: Anexo[]
  pets?: PetBasico[]
}

export interface TutorRequest {
  nome: string
  telefone: string
  endereco: string
}

export interface TutorResponse {
  id: number
  nome: string
  telefone: string
  endereco: string
  fotos?: Anexo[]
}

export interface TutorResponseComPets {
  id: number
  nome: string
  telefone: string
  endereco: string
  fotos?: Anexo[]
  pets?: PetBasico[]
}

export interface PagedTutorResponse {
  content: TutorResponse[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
