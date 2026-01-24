import { useState, useCallback } from 'react'
import { petServico } from '../servicos/petServico'
import type { Pet, PetRequest, PetResponse, PagedPetResponse } from '../tipos'

export const usePetsFachada = () => {
  const [pets, setPets] = useState<PetResponse[]>([])
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [paginacao, setPaginacao] = useState({
    paginaAtual: 0,
    totalPaginas: 0,
    totalElementos: 0,
    tamanhoPagina: 10,
  })

  const buscarPets = useCallback(async (pagina: number = 0, busca?: string) => {
    setCarregando(true)
    setErro(null)

    try {
      const resposta: PagedPetResponse = await petServico.listar(pagina, paginacao.tamanhoPagina, busca)
      setPets(resposta.content)
      setPaginacao({
        paginaAtual: resposta.number,
        totalPaginas: resposta.totalPages,
        totalElementos: resposta.totalElements,
        tamanhoPagina: resposta.size,
      })
    } catch (error) {
      setErro('Erro ao buscar pets. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }, [paginacao.tamanhoPagina])

  const buscarPetPorId = useCallback(async (id: number) => {
    setCarregando(true)
    setErro(null)

    try {
      const resposta = await petServico.buscarPorId(id)
      setPetSelecionado(resposta)
      return resposta
    } catch (error) {
      setErro('Erro ao buscar detalhes do pet.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const criarPet = useCallback(async (dados: PetRequest) => {
    setCarregando(true)
    setErro(null)

    try {
      const novoPet = await petServico.criar(dados)
      return novoPet
    } catch (error) {
      setErro('Erro ao cadastrar pet.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const atualizarPet = useCallback(async (id: number, dados: PetRequest) => {
    setCarregando(true)
    setErro(null)

    try {
      const petAtualizado = await petServico.atualizar(id, dados)
      return petAtualizado
    } catch (error) {
      setErro('Erro ao atualizar pet.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const excluirPet = useCallback(async (id: number) => {
    setCarregando(true)
    setErro(null)

    try {
      await petServico.excluir(id)
      // Remove o pet da lista local
      setPets((atual) => atual.filter((pet) => pet.id !== id))
      return true
    } catch (error) {
      setErro('Erro ao excluir pet.')
      return false
    } finally {
      setCarregando(false)
    }
  }, [])

  const adicionarFoto = useCallback(async (petId: number, arquivo: File) => {
    setCarregando(true)
    setErro(null)

    try {
      const foto = await petServico.adicionarFoto(petId, arquivo)
      return foto
    } catch (error) {
      setErro('Erro ao adicionar foto.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const limparErro = useCallback(() => {
    setErro(null)
  }, [])

  const limparPetSelecionado = useCallback(() => {
    setPetSelecionado(null)
  }, [])

  return {
    // Estado
    pets,
    petSelecionado,
    carregando,
    erro,
    paginacao,
    // Ações
    buscarPets,
    buscarPetPorId,
    criarPet,
    atualizarPet,
    excluirPet,
    adicionarFoto,
    limparErro,
    limparPetSelecionado,
  }
}
