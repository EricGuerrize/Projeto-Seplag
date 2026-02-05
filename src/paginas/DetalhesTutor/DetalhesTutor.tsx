import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { petServico } from '../../servicos/petServico'
import { Cartao, Carregando, Botao, Rodape } from '../../componentes'
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

  const fotoUrl = (() => {
    try {
      // Verificar foto singular primeiro (como a API retorna)
      if (tutorSelecionado?.foto?.url) {
        return tutorSelecionado.foto.url
      }
      // Fallback para fotos plural
      if (!tutorSelecionado?.fotos || tutorSelecionado.fotos.length === 0) return ''
      const fotosOrdenadas = [...tutorSelecionado.fotos].sort((a, b) => b.id - a.id)
      const foto = fotosOrdenadas[0]
      return foto?.url || ''
    } catch {
      return ''
    }
  })()

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
    if (window.confirm('Deseja remover o vínculo com este pet?')) {
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{erro}</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  if (!tutorSelecionado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Tutor não encontrado</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Detalhes do Tutor
          </h1>
          <Botao variante="secundario" onClick={handleVoltar}>
            Voltar
          </Botao>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1">
        <Cartao className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-48 w-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mx-auto">
              {fotoUrl && falhaImagemUrl !== fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={tutorSelecionado.nome}
                  className="w-full h-full object-cover"
                  onError={handleImagemErro}
                />
              ) : (
                <span className="text-gray-400 text-6xl">👤</span>
              )}
            </div>

            {/* Informações do tutor */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {tutorSelecionado.nome}
              </h2>

              <div className="space-y-3">
                {tutorSelecionado.telefone && (
                  <div>
                    <span className="text-gray-500 text-sm">Telefone:</span>
                    <p className="text-gray-800 font-medium">{tutorSelecionado.telefone}</p>
                  </div>
                )}

                {tutorSelecionado.endereco && (
                  <div>
                    <span className="text-gray-500 text-sm">Endereço:</span>
                    <p className="text-gray-800">{tutorSelecionado.endereco}</p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="mt-6 flex gap-3">
                <Botao onClick={handleEditar}>
                  Editar
                </Botao>
                <Botao variante="secundario" onClick={handleExcluir}>
                  Excluir
                </Botao>
              </div>
            </div>
          </div>
        </Cartao>

        {/* Pets vinculados */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Pets Vinculados
            </h3>
            <Botao tamanho="pequeno" onClick={abrirModalVincular}>
              Vincular Pet
            </Botao>
          </div>

          {tutorSelecionado.pets && tutorSelecionado.pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorSelecionado.pets.map((pet) => (
                <Cartao key={pet.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleVerPet(pet.id)}
                    >
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🐾</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{pet.nome}</h4>
                        <p className="text-sm text-gray-500">{pet.especie}</p>
                      </div>
                    </div>
                    <Botao
                      tamanho="pequeno"
                      variante="secundario"
                      onClick={() => handleDesvincularPet(pet.id)}
                    >
                      Desvincular
                    </Botao>
                  </div>
                </Cartao>
              ))}
            </div>
          ) : (
            <Cartao className="p-6 text-center">
              <p className="text-gray-500">Nenhum pet vinculado a este tutor</p>
            </Cartao>
          )}
        </div>

        {/* Modal Vincular Pet */}
        {modalVincularAberto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={fecharModalVincular}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Vincular pet ao tutor
                </h3>
                <button
                  type="button"
                  onClick={fecharModalVincular}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                {carregandoPets ? (
                  <div className="flex justify-center py-8">
                    <Carregando />
                  </div>
                ) : petsDisponiveis.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum pet disponível para vincular (todos já estão vinculados ou não há pets cadastrados).
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {petsDisponiveis.map((pet) => (
                      <li
                        key={pet.id}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {pet.fotos && pet.fotos.length > 0 ? (
                              <img
                                src={(() => {
                                  const foto = pet.fotos![pet.fotos!.length - 1]
                                  return foto.url
                                })()}
                                alt={pet.nome}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-xl">🐾</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate">
                              {pet.nome}
                            </p>
                            <p className="text-sm text-gray-500">
                              {pet.especie} • {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
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
