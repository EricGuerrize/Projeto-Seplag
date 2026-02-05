import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { Cartao, Carregando, Entrada, Botao, Rodape } from '../../componentes'

export const Tutores = () => {
  const [busca, setBusca] = useState('')
  const [falhaImagemPorId, setFalhaImagemPorId] = useState<Record<number, string>>({})
  const tentativasImg = useRef<Set<number>>(new Set())
  const navigate = useNavigate()

  const { tutores, carregando, erro, paginacao, buscarTutores, refrescarTutorNaLista } = useTutoresFachada()

  useEffect(() => {
    buscarTutores(0)
  }, [])

  const handleBuscar = () => {
    buscarTutores(0, busca)
  }

  const handlePaginaAnterior = () => {
    if (paginacao.paginaAtual > 0) {
      buscarTutores(paginacao.paginaAtual - 1, busca)
    }
  }

  const handleProximaPagina = () => {
    if (paginacao.paginaAtual < paginacao.totalPaginas - 1) {
      buscarTutores(paginacao.paginaAtual + 1, busca)
    }
  }

  const handleVerDetalhes = (id: number) => {
    navigate(`/tutores/${id}`)
  }

  const handleNovoTutor = () => {
    navigate('/tutores/novo')
  }

  const handleVoltar = () => {
    navigate('/')
  }

  const handleImagemErro = async (tutorId: number, fotoUrl: string) => {
    if (!fotoUrl) return
    if (!tentativasImg.current.has(tutorId)) {
      tentativasImg.current.add(tutorId)
      await refrescarTutorNaLista(tutorId)
      return
    }
    setFalhaImagemPorId((prev) => ({ ...prev, [tutorId]: fotoUrl }))
  }

  if (carregando && tutores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Tutores
          </h1>
          <div className="flex gap-2">
            <Botao variante="secundario" onClick={handleVoltar}>
              Voltar
            </Botao>
            <Botao onClick={handleNovoTutor}>
              Novo Tutor
            </Botao>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Barra de busca */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1">
            <Entrada
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome..."
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
            />
          </div>
          <Botao onClick={handleBuscar}>
            Buscar
          </Botao>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {erro}
          </div>
        )}

        {/* Lista de tutores */}
        {tutores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum tutor encontrado</p>
            <Botao className="mt-4" onClick={handleNovoTutor}>
              Cadastrar Primeiro Tutor
            </Botao>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutores.map((tutor) => {
                const fotoUrl = (() => {
                  // Verificar foto singular primeiro (como a API retorna)
                  if (tutor.foto?.url) return tutor.foto.url
                  // Fallback para fotos plural
                  if (!tutor.fotos || tutor.fotos.length === 0) return ''
                  const fotosOrdenadas = [...tutor.fotos].sort((a, b) => b.id - a.id)
                  const foto = fotosOrdenadas[0]
                  return foto?.url || ''
                })()
                const falhou = fotoUrl && falhaImagemPorId[tutor.id] === fotoUrl
                return (
                  <Cartao
                    key={tutor.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleVerDetalhes(tutor.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          {fotoUrl && !falhou ? (
                            <img
                              src={fotoUrl}
                              alt={tutor.nome}
                              className="w-full h-full object-cover"
                              onError={() => handleImagemErro(tutor.id, fotoUrl)}
                            />
                          ) : (
                            <span className="text-gray-400 text-2xl">👤</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {tutor.nome}
                          </h3>
                          {tutor.telefone && (
                            <p className="text-sm text-gray-600">{tutor.telefone}</p>
                          )}
                          {tutor.endereco && (
                            <p className="text-sm text-gray-500 truncate">{tutor.endereco}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Cartao>
                )
              })}
            </div>

            {/* Paginação */}
            {paginacao.totalPaginas > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <Botao
                  variante="secundario"
                  onClick={handlePaginaAnterior}
                  disabled={paginacao.paginaAtual === 0}
                >
                  Anterior
                </Botao>
                <span className="text-gray-600">
                  Página {paginacao.paginaAtual + 1} de {paginacao.totalPaginas}
                </span>
                <Botao
                  variante="secundario"
                  onClick={handleProximaPagina}
                  disabled={paginacao.paginaAtual >= paginacao.totalPaginas - 1}
                >
                  Próxima
                </Botao>
              </div>
            )}
          </>
        )}
      </main>

      <Rodape />
    </div>
  )
}
