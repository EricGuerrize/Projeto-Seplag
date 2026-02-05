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

      const semFotos = resposta.content.filter((pet) => !pet.fotos || pet.fotos.length === 0)
      if (semFotos.length > 0) {
        const detalhes = await Promise.all(
          semFotos.map(async (pet) => {
            try {
              return await petServico.buscarPorId(pet.id)
            } catch {
              return null
            }
          })
        )
        const fotosPorId = new Map(
          detalhes
            .filter((p): p is Pet => Boolean(p))
            .map((p) => [p.id, p.fotos])
        )
        if (fotosPorId.size > 0) {
          setPets((atual) =>
            atual.map((pet) =>
              fotosPorId.has(pet.id)
                ? { ...pet, fotos: fotosPorId.get(pet.id) }
                : pet
            )
          )
        }
      }
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

  const refrescarPetNaLista = useCallback(async (id: number) => {
    try {
      const resposta = await petServico.buscarPorId(id)
      setPets((atual) =>
        atual.map((pet) =>
          pet.id === id
            ? { ...pet, fotos: resposta.fotos ?? pet.fotos }
            : pet
        )
      )
      setPetSelecionado((atual) =>
        atual && atual.id === id
          ? { ...atual, fotos: resposta.fotos ?? atual.fotos }
          : atual
      )
      return resposta
    } catch {
      return null
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
    refrescarPetNaLista,
    criarPet,
    atualizarPet,
    excluirPet,
    adicionarFoto,
    limparErro,
    limparPetSelecionado,
  }
}
