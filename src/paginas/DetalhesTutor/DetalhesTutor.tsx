import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { petServico } from '../../servicos/petServico'
import { Carregando, Botao, Rodape } from '../../componentes'
import { obterFotoEstatica } from '../../utils/fotoUtils'
import type { PetResponse } from '../../tipos'

export const DetalhesTutor = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [modalVincularAberto, setModalVincularAberto] = useState(false)
  const [petsDisponiveis, setPetsDisponiveis] = useState<PetResponse[]>([])
  const [carregandoPets, setCarregandoPets] = useState(false)
  const [falhaImagemUrl, setFalhaImagemUrl] = useState<string | null>(null)
  const tentativaImagem = useRef(false)

  const {
    tutorSelecionado,
    carregando,
    erro,
    buscarTutorPorId,
    excluirTutor,
    vincularPet,
    desvincularPet,
    limparTutorSelecionado,
  } = useTutoresFachada()

  const fotoUrl = obterFotoEstatica(tutorSelecionado)

  useEffect(() => {
    if (id) {
      buscarTutorPorId(Number(id))
    }

    return () => {
      limparTutorSelecionado()
    }
  }, [id, buscarTutorPorId, limparTutorSelecionado])

  useEffect(() => {
    if (fotoUrl) {
      tentativaImagem.current = false
      setFalhaImagemUrl(null)
    }
  }, [fotoUrl])

  const handleImagemErro = async () => {
    if (!fotoUrl || !id) return
    if (!tentativaImagem.current) {
      tentativaImagem.current = true
      await buscarTutorPorId(Number(id))
      return
    }
    setFalhaImagemUrl(fotoUrl)
  }

  const handleVoltar = () => {
    navigate('/tutores')
  }

  const handleEditar = () => {
    navigate(`/tutores/${id}/editar`)
  }

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir este tutor?')) {
      const sucesso = await excluirTutor(Number(id))
      if (sucesso) {
        navigate('/tutores')
      }
    }
  }

  const handleDesvincularPet = async (petId: number) => {
    if (window.confirm('Deseja remover o vinculo com este pet?')) {
      await desvincularPet(Number(id), petId)
      buscarTutorPorId(Number(id))
    }
  }

  const handleVerPet = (petId: number) => {
    navigate(`/pets/${petId}`)
  }

  const abrirModalVincular = useCallback(async () => {
    setModalVincularAberto(true)
    setCarregandoPets(true)
    setPetsDisponiveis([])
    try {
      const resposta = await petServico.listar(0, 100)
      const idsVinculados = new Set((tutorSelecionado?.pets ?? []).map((p) => p.id))
      const disponiveis = resposta.content.filter((p) => !idsVinculados.has(p.id))
      setPetsDisponiveis(disponiveis)
    } catch {
      setPetsDisponiveis([])
    } finally {
      setCarregandoPets(false)
    }
  }, [tutorSelecionado?.pets])

  const fecharModalVincular = () => {
    setModalVincularAberto(false)
    setPetsDisponiveis([])
  }

  const handleVincularPet = async (petId: number) => {
    if (!id) return
    const sucesso = await vincularPet(Number(id), petId)
    if (sucesso) {
      buscarTutorPorId(Number(id))
      fecharModalVincular()
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {erro}
          </div>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  if (!tutorSelecionado) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto text-[var(--cor-primaria-clara)] opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-[var(--cor-texto-suave)] mb-4 font-['Source_Sans_3',sans-serif]">Tutor nao encontrado</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--cor-creme)] flex flex-col">
      {/* Header institucional */}
      <header className="bg-gradient-to-r from-[var(--cor-primaria)] to-[var(--cor-primaria-escura)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[var(--cor-dourado)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Detalhes do Tutor
            </h1>
          </div>
          <button
            onClick={handleVoltar}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 font-['Source_Sans_3',sans-serif] text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Card principal */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="h-48 w-48 rounded-full flex items-center justify-center overflow-hidden mx-auto flex-shrink-0 border-4 border-[var(--cor-dourado)] shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
              {fotoUrl && falhaImagemUrl !== fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={tutorSelecionado.nome}
                  className="w-full h-full object-cover"
                  onError={handleImagemErro}
                />
              ) : (
                <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[var(--cor-texto)] font-['Playfair_Display',serif] mb-6">
                {tutorSelecionado.nome}
              </h2>

              <div className="space-y-4">
                {tutorSelecionado.telefone && (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--cor-primaria)]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-['Source_Sans_3',sans-serif]">Telefone</span>
                      <p className="text-[var(--cor-texto)] font-medium font-['Source_Sans_3',sans-serif]">{tutorSelecionado.telefone}</p>
                    </div>
                  </div>
                )}

                {tutorSelecionado.endereco && (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--cor-primaria)]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-['Source_Sans_3',sans-serif]">Endereco</span>
                      <p className="text-[var(--cor-texto)] font-['Source_Sans_3',sans-serif]">{tutorSelecionado.endereco}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Acoes */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleEditar}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--cor-primaria)] hover:bg-[var(--cor-primaria-escura)] text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Editar
                </button>
                <button
                  onClick={handleExcluir}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pets vinculados */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[var(--cor-texto)] font-['Playfair_Display',serif]">
              Pets Vinculados
            </h3>
            <button
              onClick={abrirModalVincular}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--cor-dourado)] hover:bg-[var(--cor-dourado-claro)] text-white rounded-lg font-medium text-sm transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Vincular Pet
            </button>
          </div>

          {tutorSelecionado.pets && tutorSelecionado.pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorSelecionado.pets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg hover:border-[var(--cor-primaria-clara)] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => handleVerPet(pet.id)}
                    >
                      <div className="h-12 w-12 bg-gradient-to-br from-[var(--cor-primaria)]/10 to-[var(--cor-primaria)]/5 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--cor-texto)] font-['Source_Sans_3',sans-serif] group-hover:text-[var(--cor-primaria)] transition-colors">{pet.nome}</h4>
                        <p className="text-sm text-gray-400 font-['Source_Sans_3',sans-serif]">{pet.especie}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDesvincularPet(pet.id)}
                      className="px-3 py-1.5 text-sm border border-gray-300 text-[var(--cor-texto-suave)] rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 font-['Source_Sans_3',sans-serif] cursor-pointer"
                    >
                      Desvincular
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
              </svg>
              <p className="text-gray-400 font-['Source_Sans_3',sans-serif]">Nenhum pet vinculado a este tutor</p>
            </div>
          )}
        </div>

        {/* Modal Vincular Pet */}
        {modalVincularAberto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={fecharModalVincular}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col border border-gray-100 animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="text-lg font-bold text-[var(--cor-texto)] font-['Playfair_Display',serif]">
                    Vincular Pet
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={fecharModalVincular}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                {carregandoPets ? (
                  <div className="flex justify-center py-8">
                    <Carregando />
                  </div>
                ) : petsDisponiveis.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                    </svg>
                    <p className="text-gray-400 text-sm font-['Source_Sans_3',sans-serif]">
                      Nenhum pet disponivel para vincular.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {petsDisponiveis.map((pet) => (
                      <li
                        key={pet.id}
                        className="flex items-center justify-between gap-3 p-3 bg-[var(--cor-creme)] rounded-xl hover:bg-[var(--cor-primaria)]/5 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            {obterFotoEstatica(pet) ? (
                              <img
                                src={obterFotoEstatica(pet)}
                                alt={pet.nome}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--cor-texto)] truncate font-['Source_Sans_3',sans-serif]">
                              {pet.nome}
                            </p>
                            <p className="text-sm text-gray-400 font-['Source_Sans_3',sans-serif]">
                              {pet.especie} - {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                            </p>
                          </div>
                        </div>
                        <Botao
                          tamanho="pequeno"
                          onClick={() => handleVincularPet(pet.id)}
                          disabled={carregando}
                        >
                          Vincular
                        </Botao>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Rodape />
    </div>
  )
}
