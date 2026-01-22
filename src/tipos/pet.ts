export interface Anexo {
  id: number
  url: string
  nomeArquivo: string
}

export interface Pet {
  id: number
  nome: string
  especie: string
  idade: number
  raca?: string
  fotos?: Anexo[]
  tutor?: {
    id: number
    nome: string
    telefone: string
    endereco: string
  }
}

export interface PetRequest {
  nome: string
  especie: string
  idade: number
  raca?: string
}

export interface PetResponse {
  id: number
  nome: string
  especie: string
  idade: number
  raca?: string
  fotos?: Anexo[]
}

export interface PetResponseCompleto {
  id: number
  nome: string
  especie: string
  idade: number
  raca?: string
  fotos?: Anexo[]
  tutor?: {
    id: number
    nome: string
    telefone: string
    endereco: string
  }
}

export interface PagedPetResponse {
  content: PetResponse[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
