import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { Carregando, Botao, Rodape } from '../../componentes'
import { obterFotoEstatica } from '../../utils/fotoUtils'

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

  const irParaPagina = (pagina: number) => {
    buscarTutores(pagina, busca)
  }

  const gerarPaginas = () => {
    const paginas: number[] = []
    const total = paginacao.totalPaginas
    const atual = paginacao.paginaAtual
    const inicio = Math.max(0, atual - 2)
    const fim = Math.min(total - 1, atual + 2)
    for (let i = inicio; i <= fim; i++) paginas.push(i)
    return paginas
  }

  if (carregando && tutores.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] flex items-center justify-center">
        <Carregando />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Tutores
            </h1>
          </div>
          <div className="flex gap-2">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Barra de busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome..."
                onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--cor-primaria)] focus:border-[var(--cor-primaria)] transition-all duration-200 font-['Source_Sans_3',sans-serif]"
              />
            </div>
            <button
              onClick={handleBuscar}
              className="px-5 py-2.5 bg-[var(--cor-primaria)] hover:bg-[var(--cor-primaria-escura)] text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
            >
              Buscar
            </button>
          </div>
          <button
            onClick={handleNovoTutor}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--cor-dourado)] hover:bg-[var(--cor-dourado-claro)] text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Novo Tutor
          </button>
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {erro}
          </div>
        )}

        {/* Estado vazio */}
        {tutores.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <svg className="w-24 h-24 mx-auto text-[var(--cor-primaria-clara)] opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[var(--cor-texto-suave)] text-lg font-['Source_Sans_3',sans-serif]">
              Nenhum tutor encontrado
            </p>
            <p className="text-gray-400 text-sm mt-1 mb-4 font-['Source_Sans_3',sans-serif]">
              Cadastre um novo tutor para comecar!
            </p>
            <Botao onClick={handleNovoTutor}>
              Cadastrar Primeiro Tutor
            </Botao>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tutores.map((tutor, index) => {
                const fotoUrl = obterFotoEstatica(tutor)
                const falhou = fotoUrl && falhaImagemPorId[tutor.id] === fotoUrl
                return (
                  <div
                    key={tutor.id}
                    className="animate-fade-in-up bg-white rounded-xl shadow-md border border-gray-100 p-5 cursor-pointer hover:shadow-xl hover:border-[var(--cor-primaria-clara)] hover:scale-[1.02] transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                    onClick={() => handleVerDetalhes(tutor.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-3 border-[var(--cor-dourado)] shadow-md bg-gradient-to-br from-gray-100 to-gray-200">
                        {fotoUrl && !falhou ? (
                          <img
                            src={fotoUrl}
                            alt={tutor.nome}
                            className="w-full h-full object-cover"
                            onError={() => handleImagemErro(tutor.id, fotoUrl)}
                          />
                        ) : (
                          <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-[var(--cor-texto)] font-['Playfair_Display',serif] truncate">
                          {tutor.nome}
                        </h3>
                        {tutor.telefone && (
                          <div className="flex items-center gap-1.5 mt-1 text-[var(--cor-texto-suave)]">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span className="text-sm font-['Source_Sans_3',sans-serif]">{tutor.telefone}</span>
                          </div>
                        )}
                        {tutor.endereco && (
                          <div className="flex items-center gap-1.5 mt-0.5 text-gray-400">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span className="text-sm truncate font-['Source_Sans_3',sans-serif]">{tutor.endereco}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Paginacao */}
            {paginacao.totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={handlePaginaAnterior}
                  disabled={paginacao.paginaAtual === 0}
                  className="p-2 rounded-lg border border-gray-300 text-[var(--cor-texto-suave)] hover:bg-[var(--cor-primaria)] hover:text-white hover:border-[var(--cor-primaria)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {gerarPaginas().map((p) => (
                  <button
                    key={p}
                    onClick={() => irParaPagina(p)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer font-['Source_Sans_3',sans-serif] ${
                      p === paginacao.paginaAtual
                        ? 'bg-[var(--cor-primaria)] text-white shadow-md'
                        : 'border border-gray-300 text-[var(--cor-texto-suave)] hover:bg-[var(--cor-primaria)] hover:text-white hover:border-[var(--cor-primaria)]'
                    }`}
                  >
                    {p + 1}
                  </button>
                ))}
                <button
                  onClick={handleProximaPagina}
                  disabled={paginacao.paginaAtual >= paginacao.totalPaginas - 1}
                  className="p-2 rounded-lg border border-gray-300 text-[var(--cor-texto-suave)] hover:bg-[var(--cor-primaria)] hover:text-white hover:border-[var(--cor-primaria)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Rodape />
    </div>
  )
}
