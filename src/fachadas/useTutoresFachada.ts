import { useState, useCallback } from 'react'
import { tutorServico } from '../servicos/tutorServico'
import type { TutorRequest, TutorResponse, TutorResponseComPets, PagedTutorResponse } from '../tipos'

export const useTutoresFachada = () => {
  const [tutores, setTutores] = useState<TutorResponse[]>([])
  const [tutorSelecionado, setTutorSelecionado] = useState<TutorResponseComPets | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [paginacao, setPaginacao] = useState({
    paginaAtual: 0,
    totalPaginas: 0,
    totalElementos: 0,
    tamanhoPagina: 10,
  })

  const buscarTutores = useCallback(async (pagina: number = 0, _busca?: string) => {
    setCarregando(true)
    setErro(null)

    try {
      const resposta: PagedTutorResponse = await tutorServico.listar(pagina, paginacao.tamanhoPagina)
      setTutores(resposta.content)
      setPaginacao({
        paginaAtual: resposta.number,
        totalPaginas: resposta.totalPages,
        totalElementos: resposta.totalElements,
        tamanhoPagina: resposta.size,
      })
    } catch (error) {
      setErro('Erro ao buscar tutores. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }, [paginacao.tamanhoPagina])

  const buscarTutorPorId = useCallback(async (id: number) => {
    setCarregando(true)
    setErro(null)

    try {
      const resposta = await tutorServico.buscarPorId(id)
      setTutorSelecionado(resposta)
      return resposta
    } catch (error) {
      setErro('Erro ao buscar detalhes do tutor.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const criarTutor = useCallback(async (dados: TutorRequest) => {
    setCarregando(true)
    setErro(null)

    try {
      const novoTutor = await tutorServico.criar(dados)
      return novoTutor
    } catch (error) {
      setErro('Erro ao cadastrar tutor.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const atualizarTutor = useCallback(async (id: number, dados: TutorRequest) => {
    setCarregando(true)
    setErro(null)

    try {
      const tutorAtualizado = await tutorServico.atualizar(id, dados)
      return tutorAtualizado
    } catch (error) {
      setErro('Erro ao atualizar tutor.')
      return null
    } finally {
      setCarregando(false)
    }
  }, [])

  const excluirTutor = useCallback(async (id: number) => {
    setCarregando(true)
    setErro(null)

    try {
      await tutorServico.excluir(id)
      setTutores((atual) => atual.filter((tutor) => tutor.id !== id))
      return true
    } catch (error) {
      setErro('Erro ao excluir tutor.')
      return false
    } finally {
      setCarregando(false)
    }
  }, [])

  const vincularPet = useCallback(async (tutorId: number, petId: number) => {
    setCarregando(true)
    setErro(null)

    try {
      await tutorServico.vincularPet(tutorId, petId)
      return true
    } catch (error) {
      setErro('Erro ao vincular pet ao tutor.')
      return false
    } finally {
      setCarregando(false)
    }
  }, [])

  const desvincularPet = useCallback(async (tutorId: number, petId: number) => {
    setCarregando(true)
    setErro(null)

    try {
      await tutorServico.desvincularPet(tutorId, petId)
      return true
    } catch (error) {
      setErro('Erro ao desvincular pet do tutor.')
      return false
    } finally {
      setCarregando(false)
    }
  }, [])

  const adicionarFoto = useCallback(async (tutorId: number, arquivo: File) => {
    setCarregando(true)
    setErro(null)

    try {
      const foto = await tutorServico.adicionarFoto(tutorId, arquivo)
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

  const limparTutorSelecionado = useCallback(() => {
    setTutorSelecionado(null)
  }, [])

  return {
    // Estado
    tutores,
    tutorSelecionado,
    carregando,
    erro,
    paginacao,
    // Ações
    buscarTutores,
    buscarTutorPorId,
    criarTutor,
    atualizarTutor,
    excluirTutor,
    vincularPet,
    desvincularPet,
    adicionarFoto,
    limparErro,
    limparTutorSelecionado,
  }
}
