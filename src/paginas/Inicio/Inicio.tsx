import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePetsFachada } from '../../fachadas'
import { Carregando, Rodape } from '../../componentes'
import { useAuth } from '../../hooks/useAuth'
import { obterFotoEstatica } from '../../utils/fotoUtils'

export const Inicio = () => {
  const [busca, setBusca] = useState('')
  const [falhaImagemPorId, setFalhaImagemPorId] = useState<Record<number, string>>({})
  const tentativasImg = useRef<Set<number>>(new Set())
  const navigate = useNavigate()
  const { logout } = useAuth()

  const {
    pets,
    carregando,
    erro,
    paginacao,
    buscarPets,
    refrescarPetNaLista,
  } = usePetsFachada()

  useEffect(() => {
    buscarPets(0)
  }, [])

  const handleBuscar = () => {
    buscarPets(0, busca)
  }

  const handlePaginaAnterior = () => {
    if (paginacao.paginaAtual > 0) {
      buscarPets(paginacao.paginaAtual - 1, busca)
    }
  }

  const handleProximaPagina = () => {
    if (paginacao.paginaAtual < paginacao.totalPaginas - 1) {
      buscarPets(paginacao.paginaAtual + 1, busca)
    }
  }

  const handleVerDetalhes = (id: number) => {
    navigate(`/pets/${id}`)
  }

  const handleNovoPet = () => {
    navigate('/pets/novo')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleVerTutores = () => {
    navigate('/tutores')
  }

  const handleImagemErro = async (petId: number, fotoUrl: string) => {
    if (!fotoUrl) return
    if (!tentativasImg.current.has(petId)) {
      tentativasImg.current.add(petId)
      await refrescarPetNaLista(petId)
      return
    }
    setFalhaImagemPorId((prev) => ({ ...prev, [petId]: fotoUrl }))
  }

  const irParaPagina = (pagina: number) => {
    buscarPets(pagina, busca)
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

  return (
    <div className="min-h-screen bg-[var(--cor-creme)] flex flex-col">
      {/* Header institucional */}
      <header className="bg-gradient-to-r from-[var(--cor-primaria)] to-[var(--cor-primaria-escura)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[var(--cor-dourado)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Gerenciador de Pets
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleVerTutores}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 font-['Source_Sans_3',sans-serif] text-sm font-medium cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Tutores
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-red-500/80 transition-all duration-200 font-['Source_Sans_3',sans-serif] text-sm font-medium cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Barra de busca e acoes */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
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
            onClick={handleNovoPet}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--cor-dourado)] hover:bg-[var(--cor-dourado-claro)] text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Novo Pet
          </button>
        </div>

        {/* Erro */}
        {erro && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {erro}
          </div>
        )}

        {/* Loading */}
        {carregando && <Carregando />}

        {/* Estado vazio */}
        {!carregando && pets.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <svg className="w-24 h-24 mx-auto text-[var(--cor-primaria-clara)] opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
            <p className="text-[var(--cor-texto-suave)] text-lg font-['Source_Sans_3',sans-serif]">
              Nenhum pet encontrado
            </p>
            <p className="text-gray-400 text-sm mt-1 font-['Source_Sans_3',sans-serif]">
              Cadastre um novo pet para comecar!
            </p>
          </div>
        )}

        {/* Lista de pets */}
        {!carregando && pets.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {pets.map((pet, index) => {
                const fotoUrl = obterFotoEstatica(pet)
                const falhou = fotoUrl && falhaImagemPorId[pet.id] === fotoUrl
                return (
                  <div
                    key={pet.id}
                    className="animate-fade-in-up bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:border-[var(--cor-primaria-clara)] hover:scale-[1.02] transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
                    onClick={() => handleVerDetalhes(pet.id)}
                  >
                    {/* Foto */}
                    <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                      {fotoUrl && !falhou ? (
                        <>
                          <img
                            src={fotoUrl}
                            alt={pet.nome}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => handleImagemErro(pet.id, fotoUrl)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                          <circle cx="9" cy="9" r="1" fill="currentColor" />
                          <circle cx="15" cy="9" r="1" fill="currentColor" />
                        </svg>
                      )}
                      {/* Badge especie */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--cor-primaria)]/90 text-white text-xs rounded-full font-['Source_Sans_3',sans-serif] font-medium backdrop-blur-sm">
                        {pet.especie}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[var(--cor-texto)] font-['Playfair_Display',serif]">
                        {pet.nome}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-[var(--cor-texto-suave)]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-['Source_Sans_3',sans-serif]">
                          {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                        </span>
                      </div>
                      {pet.raca && (
                        <p className="text-sm text-gray-400 mt-1 font-['Source_Sans_3',sans-serif]">{pet.raca}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Paginacao */}
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
          </>
        )}
      </main>

      <Rodape />
    </div>
  )
}
